var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

/* 
 * New attribute 'data' is supported and maps to api end-points.
 * Supports queries (Foo?bar=car) and record-specific path (Foo/123).
 */
const routes = (
    <Route component={require("./Body.jsx")}  >
      <Route path="/" component={require("./Todo.jsx")} data="todo?state=todo"/>
      <Route path="done" component={require("./Done.jsx")} data="todo?state=done"/>
      <Route path="about" component={require("./About.jsx")} data="about" />
      <Route path="login" component={require("./Login.jsx")} />
      <Route path="register" component={require("./Register.jsx")} />
    </Route>
)

module.exports = routes;
