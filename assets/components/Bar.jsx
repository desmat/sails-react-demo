var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

const Bar = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Bar!</h2>
        {this.props.children}        
      </div>
    );
  }
});

module.exports = Bar;
