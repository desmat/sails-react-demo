var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Body = React.createClass({
  render: function() {
    return (
        <div>
          <h1>Sails React Test</h1>
          <h2>Navigation:</h2>
          <ul>
            <li><a href="/">Home controller</a></li>
            <li><a href="/api/user">User API</a></li>
            <li><a href="/foobar.html">Foobar static</a></li>
            <li>Isomorphic react components:
              <ul>
                <li><Link to="/foo" activeClassName="selected">Foo</Link></li>
                <li><Link to="/bar" activeClassName="selected">Bar</Link>
                  <ul>
                    <li><Link to="/bar/car" activeClassName="selected">Car</Link></li>
                    <li><Link to="/bar/dar" activeClassName="selected">Dar</Link></li>
                  </ul>
                </li>
              </ul>
             </li>
          </ul>          
          {this.props.children}
        </div>
    );
  }
});

module.exports = Body;
