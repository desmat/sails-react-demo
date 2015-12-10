var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Nav = require('./Nav.jsx');

var Body = React.createClass({
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

module.exports = Body;
