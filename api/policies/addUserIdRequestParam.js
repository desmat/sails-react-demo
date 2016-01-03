//Add userId to query params
module.exports = function(req, res, next) {
  //console.log('Applying addUserIdRequestParam policy');

  if (!req.session.authenticated) {
    res.status(403);
    res.send("<html><body>Access Denied</br></br><a href='/login'>Go to Login</a></body></html>");
    return;   
  }

  req.query['userId'] = req.session.userId;

  next();
};