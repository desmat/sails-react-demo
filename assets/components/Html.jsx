var React = require("react");
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Html = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Simple Todo App</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="description" content="TODO" />
          <meta name="robots" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0, width=device-width" />
          <link href="/styles/client.css" media="all" rel="stylesheet" />
        </head>
        <body>
            <div id="react-content" dangerouslySetInnerHTML={{__html: this.props.markup}} />
        </body>
        <script src="/js/dependencies/sails.io.js"></script>
        <script src="/js/dependencies/build.js"></script>
        <script src="/js/bundle.js"></script>

        
      </html>
    );
  }
});

module.exports = Html;
