var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Nav = require('./Nav.jsx');

var Body = React.createClass({
  navigate(url) {
    window.X = this.props;
    this.props.history.push(url);
  },

  componentDidMount() {
    //super hack!
    if (typeof window !== 'undefined') {
      window.__ReactNavigate = this.navigate;
    }

    return {};
  },

  render: function() {
    return (
      <div>
      	<Nav/>
      	<div className='container-fluid'>
          <div className='body-component'>
        	 {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Body;
