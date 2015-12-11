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
        <div className="row text-nowrap">
          <div className="col-xs-8">
            {this.props.text} <a onClick={this.setText} href="#"><i className="fa fa-pencil fixed-width" aria-hidden="true"/></a>
          </div>
          <div className="col-xs-4 text-right">
            <button className="btn btn-info" onClick={this.setDone}>Done</button>
          </div>
        </div>
      );     
    }
    else if (this.props.state == 'done') {
      return (
        <div className="row text-nowrap">
          <div className="col-xs-8">
            {this.props.text}
          </div>
          <div className="col-xs-4 text-right">
            <button className="btn btn-warning" onClick={this.setDeleted}>Delete</button>
          </div>
        </div>
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
