var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var App = require('../assets/js/App');
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
  navigate(url) {
    window.X = this.props;
    this.props.history.push(url);
  },

  componentDidMount() {
    //super hack!
    App.registerNavigate(this.navigate);

    return {};
  },

  render: function() {
    return (
      <div>
      	<Nav/>
      	<div className='container-fluid'>
          <div className='body-component'>
        	 {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
