var React = require("react");

const TodoItem = React.createClass({
  setDone() {
    this.props.setState(this.props.id, 'done');
  },

  setDeleted() {
    this.props.setState(this.props.id, 'deleted');
  },

  setText() {
    this.props.setText(this.props.id);
  },

  render() {
    if (this.props.state == 'todo') {
      return (
        <div>{this.props.text} <a href="#" onClick={this.setText}>edit</a> <a href="#" onClick={this.setDone}>done</a></div>
      );     
    }
    else if (this.props.state == 'done') {
      return (
        <div>{this.props.text} <a href="#" onClick={this.setDeleted}>delete</a></div>
      );     
    }
    else {
      return (
        <div>{this.props.text} (state:{this.props.state}) <a href="#">edit</a> <a href="#">move up</a> <a href="#">move down</a></div>
      );     
    }
  }
});

module.exports = TodoItem;
