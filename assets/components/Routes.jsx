var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

const routes = (
    <Route component={require("./Body.jsx")} >
      <Route model="Todo" path="/" component={require("./Todo.jsx")} />
      <Route model="Todo" path="done" component={require("./Done.jsx")} />
      <Route path="about" component={require("./About.jsx")} />
    </Route>
)

module.exports = routes;
