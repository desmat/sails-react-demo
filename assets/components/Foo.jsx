var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

const Foo = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Foo!</h2>
        {this.props.children}        
      </div>
    );
  }
});

module.exports = Foo;
