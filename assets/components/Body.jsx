var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Body = React.createClass({
  render: function() {
    return (
      <div>
        <h1><Link to="/">Simple Todo App</Link></h1>
        <ul>
          <li><Link to="/" activeClassName="selected">todo</Link></li>
          <li><Link to="done" activeClassName="selected">done</Link></li>
          <li><Link to="about" activeClassName="selected">about</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Body;
