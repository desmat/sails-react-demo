var React = require("react");
var TodoList = require('./TodoList.jsx');

const Done = React.createClass({
  render() {
    return (
      <div>
        <TodoList state='done'/>
      </div>
    )
  }
});

module.exports = Done;
