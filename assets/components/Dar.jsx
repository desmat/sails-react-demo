var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

const Dar = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Dar!</h3>
        {this.props.children}        
      </div>
    );
  }
});

module.exports = Dar;
