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
var Api = require('../../js/api');

var htmlComponent = React.createFactory(require("../Html.jsx"));
var routes = require("../Routes.jsx");

var serve = function(req, res, next) {
  //console.log("Rendering " + req.path);

  var location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    if (renderProps.components.length > 0 && renderProps.components[0] && (typeof renderProps.components[0] !== 'undefined')) {
        console.log('rendering component on path: ' + req.path);

        //find a model defined in the routes so that we can load up 
        var model;
        _.each(_.filter(renderProps.routes, function(i) {/*console.dir(i); console.log('-' + i.hasOwnProperty('model'));*/ return i.hasOwnProperty('model');}), function(i) {model = i.model});
        //console.log('model=' + model);

        var renderHtml = function(data, title, description) {
          var html = renderToString(htmlComponent({
            locals: {
              title:'',
              description:'', 
              // make data available for components' initial state (borrowed from https://github.com/wi2/isomorphic-sails-react-example)
              state: 'window.__ReactInitState__=' + JSON.stringify(data) + ';'
            },
            markup: renderToString(<RoutingContext {...renderProps}/>)        
          }));
          
          // console.log(html);
          return res.send(html);
        };

        if (model == undefined) { 
          //other than lists don't load up in the back-end
          return renderHtml([]);
        }
        else {
          //for now just render lists
          //console.log('Fetching data for model ' + model);
          this[model].find({}, function(err, results) {
            // make data available for components to render on the back-end
            global.__ReactInitState__ = results;

            if (err) {
              //return res.serverError(err);
              console.log("Error fetching Todo data: " + err);
              return renderHtml([]);
            }

            return renderHtml(results);
          });
        }



        //mostly ripped off from https://github.com/percolatestudio/percolatestudio.com/blob/master/app/server.js
        // var headParams = {
        // //  title: (nodePackage.title || 'TODO') + (renderProps.routes[1].name ? ": " + renderProps.routes[1].name : ""), 
        // //  description: nodePackage.description || 'TODO'
        // };

        // var locals = {title:'',description:''};
        //     locals.state = 'window.__ReactInitState__=' + JSON.stringify(state) + ';';

        // var html = renderToString(htmlComponent({
        //   locals: locals,
        //   markup: renderToString(<RoutingContext {...renderProps}/>)        
        // }));
        
        // //console.log(html);
        // return res.send(html);

      }
      else {
        return next();
      }
  });
};

module.exports = serve;
