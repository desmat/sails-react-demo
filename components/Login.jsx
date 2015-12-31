var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');

const Login = React.createClass({
  render() {
    return (
      <div>
      <p>TODO Login Form Here <a href="/login/login">(Apply debug login)</a></p>
      <p>Don't have an account? <Link to="register">Register</Link></p>
      </div>
    )
  }
});

module.exports = Login;
