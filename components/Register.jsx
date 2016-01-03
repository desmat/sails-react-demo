var _ = require('underscore');
var React = require("react");
var Link = require('react-router').Link;
var Api = require('../assets/js/Api');

const Register = React.createClass({

  register() {    
    //$("form")[0].submit();

    Api.register(this.state.data.username, this.state.data.password, function() {
      Api.navigate('/');
    }, function(error) {
      alert("Unable to register: " + error);
    });
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
    return {data: {username: '', password: ''}};
  },  

  componentDidMount() {
    return {data: {username: '', password: ''}};
  },

  render() {
    return (
      <form action="/login/register" method="post">
        <div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
            <input name="username" className="form-control" type="text" placeholder="Email address" onChange={this.usernameChanged}/>
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
      </form>
    )
  }
});

module.exports = Register;
