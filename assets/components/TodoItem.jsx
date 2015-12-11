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
          <div className="col-md-8">{this.props.text}</div>
          <div className="col-md-4"><button onClick={this.setText} className="btn btn-info">Edit</button> <button onClick={this.setDone} className="btn btn-warning">Done</button></div>
      );     
    }
    else if (this.props.state == 'done') {
      return (
        <tr><td>{this.props.text}</td><td className="text-nowrap"><a href="#" onClick={this.setDeleted}>delete</a></td></tr>
      );     
    }
    else {
      return (
        <tr><td>{this.props.text}</td><td className="text-nowrap">(state:{this.props.state}) <a href="#">edit</a> <a href="#">move up</a> <a href="#">move down</a></td></tr>
      );     
    }
  }
});

module.exports = TodoItem;
