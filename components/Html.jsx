var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Html = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Simple To-Do App (Isomorphic React Demo)</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="description" content="TODO" />
          <meta name="robots" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0, width=device-width" />
          <link href="/styles/client.css" media="all" rel="stylesheet" />
          <link href="/styles/bootstrap.css" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
        </head>
        <body>
          <div id="react-content" dangerouslySetInnerHTML={{__html: this.props.markup}} />
          <script dangerouslySetInnerHTML={{__html: this.props.locals.state}} />
          <script src="/js/dependencies/sails.io.js"></script>
          <script src="/js/dependencies/build.js"></script>
          <script src="/js/dependencies/jquery.min.js"></script>
          <script src="/js/dependencies/bootstrap.min.js"></script>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = Html;
