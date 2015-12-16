var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Nav = require('./Nav.jsx');

var styles = {
  bodyComponent: {
    paddingLeft: 15,
    paddingRight: 15,
  }    
};

var Body = React.createClass({
  render: function() {
    return (
      <div>
      	<Nav/>
      	<div className='container-fluid'>
          <div style={styles.bodyComponent}>
        	 {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Body;
