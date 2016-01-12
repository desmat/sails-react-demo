var React = require("react");

module.exports = React.createClass({
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
        <div className="row text-nowrap" key={this.props.id}>
          <div className="col-xs-8">
            {this.props.text}
            &nbsp;<a onClick={this.setText} href="#"><i className="fa fa-pencil" aria-hidden="true"/></a>
          </div>
          <div className="col-xs-4 text-right">
            <a onClick={this.setDone} href="#"><i className="fa fa-check-square-o" aria-hidden="true"/></a>
          </div>
        </div>
      );     
    }
    else if (this.props.state == 'done') {
      return (
        <div className="row text-nowrap" key={this.id}>
          <div className="col-xs-8">
            {this.props.text}
          </div>
          <div className="col-xs-4 text-right">
            <a onClick={this.setDeleted} href="#"><i className="fa fa-times" aria-hidden="true"/></a>
          </div>
        </div>
      );     
    }
    // else {
    //   return (
    //     //TODO        
    //   );     
    // }
  }
});
