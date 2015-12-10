var React = require("react");
var TodoList = require('./TodoList.jsx');

const Todo = React.createClass({
  render() {
    return (
      <div>
        <TodoList state='todo'/>
      </div>
    )
  }
});

module.exports = Todo;
