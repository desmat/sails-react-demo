/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */
require("node-jsx").install({extension: ".jsx"}); //required for ServerSideRenderer
var _ = require('underscore');
var ServerSideRenderer = require('../components/utils/ServerSideRenderer.jsx');
var Utils = require('../assets/js/Utils');
var reactRoutes = Utils.readReactRoutes(require('../components/Routes.jsx'));

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      //'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'reactRenderer',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // },

  /****************************************************************************
  *                                                                           *
  * React back-end renderer for isomorphism.                                  *
  *                                                                           *
  ****************************************************************************/

  reactRenderer: function (req, res, next) {
    // console.log('http: reactRenderer: path=' + req.path);

    // first make sure path matches a path in the react routes
    if (Utils.matchReactRoute(req.path, reactRoutes)) {

      // if so see if we match any policies
      var matchedPolicies = Utils.matchPolicies(req.path, sails.config.policies);
      if (matchedPolicies.length > 0) {
        //default granted unless otherwise specified
        var granted = true;

        //if any policy is 'true' then we can ignore the rest
        if (matchedPolicies.indexOf(true) < 0) {
          for (var i = 0; i < matchedPolicies.length; i++) {
            var policy = matchedPolicies[i];
            //console.log('policy: ' + policy);

            if (typeof(policy) == 'boolean') {
              granted = policy;
            }
            else if (typeof(policy) == 'string') {
              //console.log('TODO: apply policy [' + policy + ']');
              var nextCalled = false;
              var ret = require('../api/policies/' + policy)(req, res, function() {
                nextCalled = true; //this seems flaky to me...
              });

              // policy's callback not called and so we assume it failed and already rendered a response
              if (!nextCalled) return ret;
            }
            else {
              sails.log.warn('Warning: unknown policy datatype: ' + policy + ' (' + typeof(policy) + ')');
            }
          }
        }

        // we hit a global 'false' policy and we we must render 403 response ourselves
        if (!granted) {
          //return res.send('DENIED!');
          //return res.forbidden('You are not permitted to perform this action.');
          return res.redirect('/login?error=forbidden');
          //forbiddenResponse(req, res, 'Access Denied');
          //res.status(403);
          //res.send("<html><body>Access Denied</br></br><a href='/login'>Go to Login</a></body></html>");
          // req.path = '/login';
          // ServerSideRenderer(req, res, next);
          // return;          
        }
      }

      // so far so good let's render the react component
      ServerSideRenderer(req, res, next);      
    }
    else {
      next();
    }
  },


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
