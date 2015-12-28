var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server') ;
var renderToString = ReactDOMServer.renderToString;
var Router = require("react-router");
var match = Router.match;
var RoutingContext = Router.RoutingContext;
// var nodePackage = require('./../../package');
var createLocation = require('history/lib/createLocation');
var Api = require('../../assets/js/Api');

var htmlComponent = React.createFactory(require("../Html.jsx"));
var routes = require("../Routes.jsx");

/* 
 * Render the requested path on the back-end whenever we've got a path hit on the router.
 * 
 * Here's how the React isomorphic magic works:
 * 1. Associate a route with data from one or more models (model='TheModelNameInCorrectCase' or model='ModelOne, ModelTwo'). 
 * 2. In the corresponding route's React component define the following methods:
 * 2.1. getInitialState: return {data: Api.getInitial('TheModel')}
 * 2.2. componentDidMount: Api.get('TheModel', function(data) { /* update front-end and save state * / })
 * 3. Given the above the code here will pull the required models from the given matched route and generate three things:
 * 3.1. global.__ReactInitState__['TheModel'] = <TheModel in json>. This will make data available to generate static html on the back-end via React's renderToString (via the component's getInitialState and Api.getInitial(...))
 * 3.2. window.__ReactInitState__['TheModel'] = <TheModel in json> rendered in a script element on the html output. This will make the data available on the front-end's getInitialState 
 * 3.3. Api.get('TheModel', ...) will update window.__ReactInitState__['TheModel'] with fresh data
 * 4. Finally component tree (via matched routes) will be rendered with static html as well as dynamic data
 * 
 * Limitations:
 * 1. User-specific data not supported (this is my next TODO)
 * 2. Similar to ^^^ only the equivalent of api call  "GET /api/TheModel" is supported.
 *
 * Next steps:
 * 1. Support user-specific data
 * 2. Stronger and case-insensitive model resolution
 *
 */
var serve = function(req, res, next) {
  //console.log("Rendering " + req.path);

  var location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    if (renderProps.components.length > 0 && renderProps.components[0] && (typeof renderProps.components[0] !== 'undefined')) {
      //console.log('rendering component on path: ' + req.path);

      //find the models defined in the routes so that we can load up 
      var models = 
        _.uniq(
          _.flatten(
            _.map(
              _.filter(
                renderProps.routes, 
                function(i) { return i.hasOwnProperty('model'); }), 
              function(i) { if (i.model.indexOf(',')) { return _.map(i.model.split(','), function(i) { return i.trim() }); } else { return i.model; } })));
      //console.log('models');
      //console.dir(models);

      var renderHtml = function(modelsAndData, title, description) {
        modelsAndData = modelsAndData || [];

        var state = 
          'window.__ReactInitState__ = {' + 
          _.map(modelsAndData, function(modelAndData) {
            return '"' + modelAndData.model + '": ' + JSON.stringify(modelAndData.data)
          })
          + '};'
        
        var html = renderToString(htmlComponent({
          locals: {
            title:'',
            description:'', 
            // make data available for components' initial state (borrowed from https://github.com/wi2/isomorphic-sails-react-example)
            state: state
          },
          markup: renderToString(<RoutingContext {...renderProps}/>)        
        }));
        
        // console.log(html);
        return res.send(html);
      };

      if (models.length == 0) { 
        //other than lists don't load up in the back-end
        return renderHtml([]);
      }
      else {

        global.__ReactInitState__ = [];
        var modelsAndData = [];

        //TODO: fetch data in parallel

        _.each(models, function(model, i) {
          var modelAndQuery = model.split('?');
          model = model.trim().toLowerCase();

          // parse out model name
          var sailsModelName = modelAndQuery[0].trim().toLowerCase();
          var sailsModel = this.sails.models[sailsModelName];

          // parse out the query portion and convert into json
          var query = {};
          if (modelAndQuery.length > 1) {
            _.each(modelAndQuery[1].split('&'), function(q) {
              var r = q.split('=');
              var n = r[0];
              var v = true;
              if (r.length > 1) v = r[1];
              query[n] = v;
            });
          }

          // console.log('model: ' + sailsModelName);
          // console.log('query: ' + JSON.stringify(query));

          if (typeof sailsModel !== 'undefined') {

            console.log('fetching data for model [' + sailsModelName + '] with query [' + JSON.stringify(query) + ']');

            sailsModel.find(query, function(err, results) {
             // make data available for components to render on the back-end
              global.__ReactInitState__[model] = results;

              // make data available on the front-end
              modelsAndData.push({model: model, data: results});

              if (err) {
                //return res.serverError(err);
                console.log("Error fetching Todo data: " + err);
                //return renderHtml([]);
              }

              if (i == models.length - 1) {
                //console.log('done fetching data from models; rendering the whole thing');
                return renderHtml(modelsAndData);
              }
            });
          }
          //edge case: there mere some models in the router but last one didn't match
          else if (i == models.length - 1) {
            //console.log('done fetching data from models; rendering the whole thing');
            return renderHtml(modelsAndData);
          }
        });
      }
    } 
    else {
      return next();
    }
  });
};

module.exports = serve;
