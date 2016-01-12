var React = require("react");
var TodoList = require('./TodoList.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <TodoList state='done'/>
      </div>
    )
  }
});
