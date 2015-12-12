var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

const routes = (
    <Route component={require("./Body.jsx")} model="Todo" >
      <Route path="/" component={require("./Todo.jsx")} />
      <Route path="done" component={require("./Done.jsx")} />
      <Route path="about" component={require("./About.jsx")} model="About" />
    </Route>
)

module.exports = routes;
