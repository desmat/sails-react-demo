var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');
var $ = require('jquery');

const Login = React.createClass({

  login() {
    $("form")[0].submit();
  },

  getInitialState() {
    return {authenticated: Api.isAuthenticated()};
  },  

  componentDidMount() {
    return {authenticated: this.state.authenticated};
  },

  render() {
    return (
      <form action="/login/login" method="post">
        <div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input name="username" className="form-control" type="text" placeholder="Email address" defaultValue="user1"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input name="password" className="form-control" type="password" placeholder="Password" defaultValue="Password1"/>
          </div>
        </div>

        <p/>

        <p className="text-center">
          <a href="#" className="btn btn-primary" onClick={this.login} >
            <i className="fa fa-user fa-fw"></i> Login
          </a>
        </p>

        <p className="text-center">Don't have an account? <Link to="register">Register</Link></p>
      </form>
    )
  }
});

module.exports = Login;
