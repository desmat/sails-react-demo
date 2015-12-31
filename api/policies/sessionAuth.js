/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

//var forbiddenResponse = require('../responses/forbidden');

module.exports = function(req, res, next) {
  console.log('Applying sessionAuth policy');

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
  //return res.redirect('login?error=forbidden');

  //why the f*ck don't we have an express response here??!!

  // res.writeHead(302, {
  //   'Location': 'login?error=forbidden'
  // //add other headers here...
  // });
  // res.end();

  //forbiddenResponse(req, res, 'Access Denied');

  res.status(403);
  res.send("<html><body>Access Denied</br></br><a href='/login'>Go to Login</a></body></html>");
};
