var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');
var $ = require('jquery');

const Login = React.createClass({

  login() {
    window.location.href = '/login/login?username=' + $('#username').val() + '&password=' + $('#password').val();
  },

  getInitialState() {
    return {authenticated: Api.isAuthenticated()};
  },  

  componentDidMount() {
    return {authenticated: this.state.authenticated};
  },

  render() {
    return (
      <div>
        <form action="/login/login" method="get">
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input id='username' className="form-control" type="text" placeholder="Email address" defaultValue="user1"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input id='password' className="form-control" type="password" placeholder="Password" defaultValue="Password1"/>
          </div>
        </div>

        <p/>

        <p className="text-center">
          <input type="submit" className="btn btn-primary" >
            <i className="fa fa-user fa-fw"></i> Login
          </input>
        </p>

        <p className="text-center">Don't have an account? <Link to="register">Register</Link></p>
      </div>
    )
  }
});

module.exports = Login;
