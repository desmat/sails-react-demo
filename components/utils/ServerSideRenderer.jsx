var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server') ;
var renderToString = ReactDOMServer.renderToString;
var Router = require("react-router");
var match = Router.match;
var RoutingContext = Router.RoutingContext;
// var nodePackage = require('./../../package');
var createLocation = require('history/lib/createLocation');
var httpMocks = require('node-mocks-http');

var Api = require('../../assets/js/Api');
var htmlComponent = React.createFactory(require("../Html.jsx"));
var routes = require("../Routes.jsx");

var renderHtml = function(req, res, renderProps, modelsAndData, title, description) {
  modelsAndData = modelsAndData || [];

  var state = 
    'window.__ReactInitState__ = {' + 
    '"_authenticated": ' + (req.hasOwnProperty('session') && req.session.hasOwnProperty('authenticated') && req.session.authenticated) + ', ' + 
    _.map(modelsAndData, function(modelAndData) {
      return '"' + modelAndData.model + '": ' + JSON.stringify(modelAndData.data)
    }) + 
    '};'
  
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
 *
 */
module.exports = function(req, res, next) {
  // console.log("Rendering " + req.originalUrl);

  var location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    if (renderProps.components.length > 0 && renderProps.components[0] && (typeof renderProps.components[0] !== 'undefined')) {
      //console.log('rendering component on path: ' + req.path);

      //find the models defined in the routes so that we can load up 
      var datae = 
        _.uniq(
          _.flatten(
            _.map(
              _.filter(
                renderProps.routes, 
                function(i) { return i.hasOwnProperty('data'); }), 
              function(i) { if (i.data.indexOf(' ')) { return _.map(i.data.split(' '), function(i) { return i.trim() }); } else { return i.model; } })));
      //console.log('datae');
      //console.dir(datae);


      global.__ReactInitState__ = [];        
      global.__ReactInitState__['_authenticated'] = (req.hasOwnProperty('session') && req.session.hasOwnProperty('authenticated') && req.session.authenticated);

      if (datae.length == 0) { 
        //other than lists don't load up in the back-end
        return renderHtml(req, res, renderProps);
      }
      else {
        var modelsAndData = [];

        //TODO: fetch data in parallel

        _.each(datae, function(data, i) {

          //FIRST LOOK FOR ROUTES OVERWRITING STRAIGHT MODEL ACCESS
          var mockRequest = httpMocks.createRequest({method: 'GET', url: '/api/' + data});          
          var mockResponse = httpMocks.createResponse();                    
          sails.router.route(mockRequest, mockResponse);
          var mockResponseData = mockResponse.statusCode == 200 ? mockResponse._getData() : '';

          if (mockResponseData.length > 0) {
            sails.log.debug('fetched data from sails router for [' + data + ']');

            var results = JSON.parse(mockResponseData);

            // make data available for components to render on the back-end
            global.__ReactInitState__[data.trim().toLowerCase()] = results;

            // make data available on the front-end
            modelsAndData.push({model: data.trim().toLowerCase(), data: results});

            if (i == datae.length - 1) {
              //console.log('done fetching data from models; rendering the whole thing');
              return renderHtml(req, res, renderProps, modelsAndData);
            }
          }
          //NO MATCH FROM ROUTER: LOOK FOR MODEL OR CONTROLLER DIRECTLY
          else {
            // parse out the query portion and convert into json
            var modelAndQuery = data.split('?');
            var query = {};
            if (modelAndQuery.length > 1) {
              _.each(modelAndQuery[1].split('&'), function(q) {
                var r = q.split('=');
                var n = r[0];
                var v = true;
                if (r.length > 1) v = r[1];

                //apply virtual variables such as :userId
                if (v == ':userId' && req.hasOwnProperty('session') && req.session.hasOwnProperty('userId')) {
                  v = req.session.userId;
                  //also this is a 'virtual query param', meaning that the front-end doesn't know it was applied. Let's remove it from the data key
                  data = data.replace(n + '=:userId&', '').replace(n + '=:userId', '');
                  //and remove trailing '?' or '&'
                  if (data.indexOf('&', data.length - 1) !== -1) data = data.substring(0, data.length - 1);
                  if (data.indexOf('?', data.length - 1) !== -1) data = data.substring(0, data.length - 1);
                }
                
                query[n] = v;
              });
            }

            // parse out specific record url (Foobar/123)
            var modelAndId = modelAndQuery[0].trim().split('/');
            if (modelAndId.length > 1) query['id'] = modelAndId[1];

            // parse out model name
            var sailsModelName = modelAndId[0].trim().toLowerCase();

            //Look for controller
            var sailsController = sails.controllers['api'];
            if (typeof sailsController !== 'undefined' && sailsController.hasOwnProperty(sailsModelName)) {
              var mockRequest = httpMocks.createRequest({method: 'GET', url: '/api/' + data});          
              var mockResponse = httpMocks.createResponse();                    
              sailsController[sailsModelName](mockRequest, mockResponse);
              var mockResponseData = mockResponse.statusCode == 200 ? mockResponse._getData() : '';

              if (mockResponseData.length > 0) {
                sails.log.debug('fetched data from sails controller for [' + data + ']');

                var results = JSON.parse(mockResponseData);

                // make data available for components to render on the back-end
                global.__ReactInitState__[data.trim().toLowerCase()] = results;

                // make data available on the front-end
                modelsAndData.push({model: data.trim().toLowerCase(), data: results});

                if (i == datae.length - 1) {
                  //console.log('done fetching data from models; rendering the whole thing');
                  return renderHtml(req, res, renderProps, modelsAndData);
                }
              }
            }
            else {
              //ok fine look for model directly
              var sailsModel = sails.models[sailsModelName];

              // console.log('model: ' + sailsModelName);
              // console.log('query: ' + JSON.stringify(query));

              if (typeof sailsModel !== 'undefined') {
                sails.log.debug('fetching data from model [' + sailsModelName + '] with query [' + JSON.stringify(query) + ']');

                sailsModel.find(query, function(err, results) {
                  if (err) {
                    //return res.serverError(err);
                    console.log("Error fetching data: " + err);
                    //return renderHtml(req, res, renderProps, []);
                  } 

                  // make data available for components to render on the back-end
                  global.__ReactInitState__[data.trim().toLowerCase()] = results;

                  // make data available on the front-end
                  modelsAndData.push({model: data.trim().toLowerCase(), data: results});

                  if (i == datae.length - 1) {
                    //console.log('done fetching data from models; rendering the whole thing');
                    return renderHtml(req, res, renderProps, modelsAndData);
                  }
                });
              }
              //edge case: there were some models in the router but last one didn't match
              else if (i == datae.length - 1) {
                //console.log('done fetching data from models; rendering the whole thing');
                return renderHtml(req, res, renderProps, modelsAndData);
              } 
            }           
          }
        });
      }
    } 
    else {
      return next();
    }
  });
};
