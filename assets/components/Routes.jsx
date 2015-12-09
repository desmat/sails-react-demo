var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

const routes = (
    <Route component={require("./Body.jsx")} >
      <Route path="foo" component={require("./Foo.jsx")} />
      <Route path="bar" component={require("./Bar.jsx")} >
      	<Route path="car" component={require("./Car.jsx")} />
      	<Route path="dar" component={require("./Dar.jsx")} />
  	  </Route>
    </Route>
)

module.exports = routes;
