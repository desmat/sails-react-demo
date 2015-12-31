var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');

const Register = React.createClass({
  render() {
    return (
      <div>
      <p>TODO Register Form Here</p>
      <p>Already have an account? <Link to="login">Login</Link></p>
      </div>
    )
  }
});

module.exports = Register;
