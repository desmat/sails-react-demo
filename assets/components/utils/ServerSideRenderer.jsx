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

var htmlComponent = React.createFactory(require("../Html.jsx"));
var routes = require("../Routes.jsx");

var serve = function(req, res, next) {
  // console.log("Rendering " + req.path);

  var location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    // console.log('matched!');
    // console.dir(renderProps);

    if (renderProps.components.length > 0 && renderProps.components[0] && (typeof renderProps.components[0] !== 'undefined')) {
        console.log('rendering component: ' + req.path);

        //mostly ripped off from https://github.com/percolatestudio/percolatestudio.com/blob/master/app/server.js
        var headParams = {
        //  title: (nodePackage.title || 'TODO') + (renderProps.routes[1].name ? ": " + renderProps.routes[1].name : ""), 
        //  description: nodePackage.description || 'TODO'
        };

        var html = renderToString(htmlComponent({
          headParams: headParams,
          markup: renderToString(<RoutingContext {...renderProps}/>)
        }));

        return res.send(html);
      }
      else {
        return next();
      }
  });
};

module.exports = serve;
