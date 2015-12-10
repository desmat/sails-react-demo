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
  // console.log("Rendering " + req.path);

  var location = createLocation(req.originalUrl);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) return res.redirect(redirectLocation.pathname);
    if (error) return next(error.message);
    if (renderProps == null) return next(error);

    if (renderProps.components.length > 0 && renderProps.components[0] && (typeof renderProps.components[0] !== 'undefined')) {
        console.log('rendering component: ' + req.path);


        //TODO: figure out what data we need to get from back-end and get that specifically (maybe just do a call directly into the api end-points...) 
        Todo.find({}, function(err, results) {
          if (err) {
            //return res.serverError(err);
            console.log("Error fetching Todo data: " + err);
            return renderHtml(res, renderProps, []);
          }

          return renderHtml(res, renderProps, results);
        });



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

renderHtml = function(res, renderProps, data, title, description) {
  var html = renderToString(htmlComponent({
    locals: {
      title:'',
      description:'', 
      state: 'window.__ReactInitState__=' + JSON.stringify({data: data}) + ';'
    },
    markup: renderToString(<RoutingContext {...renderProps}/>)        
  }));
  
  // console.log(html);
  return res.send(html);
};


module.exports = serve;
