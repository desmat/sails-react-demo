var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');

const Register = React.createClass({
  register() {
    // TODO move to Api.js
    $("form")[0].submit();
  },

  render() {
    return (
      <form action="/login/register" method="post">
        <div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input name="username" className="form-control" type="text" placeholder="Email address"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input name="password" className="form-control" type="password" placeholder="Password"/>
          </div>
        </div>

        <p/>

        <p className="text-center">
          <a className="btn btn-success" href="#" onClick={this.register}>
            <i className="fa fa-user-plus fa-fw"></i> Register
          </a>
        </p>

        <p className="text-center">Already have an account? <Link to="login">Login</Link></p>
      </form>
    )
  }
});

module.exports = Register;
