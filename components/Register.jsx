var _ = require('lodash');
var React = require("react");
var Link = require('react-router').Link;
var App = require('../assets/js/App');

module.exports = React.createClass({

  register() {    
    var self = this;

    App.register(this.state.data.username, this.state.data.password, function() {
      App.navigate('/');
    }, function(error) {
      //alert("Unable to register: " + error);
      self.state.data.errorMessage = "Unable to register: " + error;
      self.setState({data: self.state.data});
    });
  },

  keyDown(e) {
    if (e.keyCode == 13) this.register();
  },

  usernameChanged(e) {
    this.state.data.username=e.target.value;
    this.setState({data: this.state.data});
  },

  passwordChanged(e) {
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
            <input name="username" className="form-control" autoFocus="true" type="text" placeholder="Email address" onChange={this.usernameChanged}/>
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
            <input name="password" className="form-control" type="password" placeholder="Password" onChange={this.passwordChanged}/>
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
