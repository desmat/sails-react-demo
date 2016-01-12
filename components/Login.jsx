var _ = require('lodash');
var React = require("react");
var Link = require('react-router').Link;
var App = require('../assets/js/App');
var $ = require('jquery');

module.exports = React.createClass({

  login() {    
    var self = this;

    App.login(this.state.data.username, this.state.data.password, function() {
      App.navigate('/');
    }, function(error) {
      //alert("Unable to login: " + error);
      self.state.data.errorMessage = "Unable to login: " + error;
      self.setState({data: self.state.data});
    });
  },

  keyDown(e) {
    if (e.keyCode == 13) this.login();
  },

  setDemoUserCredentials1() {
    this.setDemoUserCredentials(1);
  },
  setDemoUserCredentials2() {
    this.setDemoUserCredentials(2);
  },
  setDemoUserCredentials(num) {
    this.state.data.username="Demo" + num;
    this.state.data.password="Password1";
    this.setState({data: this.state.data});
    this.login();
  },

  usernameChanged(e) {
    this.state.data.errorMessage = '';
    this.state.data.username=e.target.value;
    this.setState({data: this.state.data});
  },

  passwordChanged(e) {
    this.state.data.errorMessage = '';
    this.state.data.password=e.target.value;
    this.setState({data: this.state.data});
  },

  getInitialState() {
    return {data: {username: '', password: '', errorMessage: ''}};
  },  

  componentDidMount() {
    return {data: {username: '', password: '', errorMessage: ''}};
  },

  render() {
    return (
      <div onKeyDown={this.keyDown}>
        <p className="text-left text-danger">{this.state.data.errorMessage}</p>

        <div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input name="username" className="form-control" autoFocus="true" type="text" placeholder="Email address" value={this.state.data.username} onChange={this.usernameChanged}/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input name="password" className="form-control" type="password" placeholder="Password" value={this.state.data.password} onChange={this.passwordChanged}/>
          </div>
        </div>

        <p className="text-right">
          (Demo users: 
          &nbsp;<a href="#" onClick={this.setDemoUserCredentials1}>Demo1</a> 
          &nbsp;<a href="#" onClick={this.setDemoUserCredentials2}>Demo2</a>
          )
        </p>

        <p className="text-center">
          <a href="#" className="btn btn-primary" onClick={this.login} >
            <i className="fa fa-user fa-fw"></i> Login
          </a>
        </p>

        <p className="text-center">Don't have an account? <Link to="register">Register</Link></p>
      </div>
    )
  }
});
