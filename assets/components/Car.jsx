var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

const Car = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Car!</h3>
        {this.props.children}        
      </div>
    );
  }
});

module.exports = Car;
