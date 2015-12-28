var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

const routes = (
    <Route component={require("./Body.jsx")}>
      <Route path="/" component={require("./Todo.jsx")} model="todo?state=todo" />
      <Route path="done" component={require("./Done.jsx")} model='todo?state=done' />
      <Route path="about" component={require("./About.jsx")} model="about" />
    </Route>
)

module.exports = routes;
