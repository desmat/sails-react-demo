var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Nav = require('./Nav.jsx');

var Body = React.createClass({
  render: function() {
    return (
      <div>
      	<Nav/>
      	<div className='container container-fluid'>
        	{this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Body;
