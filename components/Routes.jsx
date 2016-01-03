var React = require("react");
var ReactDOM = require('react-dom');
var Router = require("react-router");
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;
var Link = Router.Link;
var createBrowserHistory = require('history/lib/createBrowserHistory');

/* 
 * New attribute 'data' is supported and maps to api end-points.
 * Supports queries (Foo?bar=car) and record-specific path (Foo/123).
 * Note: for user-specific data, use query param userId=:userId where userId is a field on said data
 */
const routes = (
    <Route path="/" component={require("./Body.jsx")}  >
      <IndexRoute component={require("./Todo.jsx")} data="todo?state=todo&userId=:userId"/>
      <Route path="done" component={require("./Done.jsx")} data="todo?state=done&userId=:userId"/>
      <Route path="about" component={require("./About.jsx")} data="about" />
      <Route path="login" component={require("./Login.jsx")} />
      <Route path="register" component={require("./Register.jsx")} />
    </Route>
)

module.exports = routes;
