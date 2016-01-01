var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');

const Register = React.createClass({
  register() {
    window.location.href = '/login/register?username=' + $('#username').val() + '&password=' + $('#password').val();
  },

  render() {
    return (
      <div>
        <div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input id="username" className="form-control" type="text" placeholder="Email address"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input id="password" className="form-control" type="text" placeholder="Password" defaultValue="Password1"/>
          </div>
        </div>

        <p/>

        <p className="text-center">
          <a className="btn btn-success" href="#" onClick={this.register}>
            <i className="fa fa-user-plus fa-fw"></i> Register
          </a>
        </p>

        <p className="text-center">Already have an account? <Link to="login">Login</Link></p>
      </div>
    )
  }
});

module.exports = Register;
