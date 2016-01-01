/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // index: function (req, res) {
  //   console.log('login controller default');
  //   return res.send("<html><body>login controller response</br></br><a href='/login/login'>Login</a></br><a href='/login/logout'>Logout</a></body></html>");
  // },  

  login: function (req, res) {
    //console.log('login controller login');

    //TODO: Do post instead of get

    User.findOne({username: req.query.username, password: req.query.password}, function(err, result) {
      if (err) {
        console.log('Login error: ' + err);
        //TODO send back login error to front-end
        res.writeHead(302, {'Location': '/login?error=generalError'});
        return res.end();
      }
      else if (result) {
        //console.dir(result);
        req.session.authenticated = true;  
        req.session.userId = result.id;  
        return res.redirect('/');
      }
      else {
        res.writeHead(302, {'Location': '/login?error=loginFailure'});
        return res.end();
      }
    });
  },  

  register: function (req, res) {
    //console.log('login controller register');

    //TODO: Do post instead of get

    //look for existing username
    User.findOne({username: req.query.username}, function(err, result) {
      if (err) {
        console.log('Register error: ' + err);
        //TODO send back login error to front-end
        res.writeHead(302, {'Location': '/login?error=generalError'});
        return res.end();
      }
      else if (result) {
        res.writeHead(302, {'Location': '/login?error=usernameExists'});
        return res.end();

      }

      //username not found, create
      User.create({username: req.query.username, password: req.query.password}, function(err, result) {
        if (err) {
          console.log('Register error: ' + err);
          //TODO send back login error to front-end
          res.writeHead(302, {'Location': '/login?error=generalError'});
          return res.end();
        }
        else if (!result) {
          console.log('Register error: (unknown)');
          //TODO send back login error to front-end
          res.writeHead(302, {'Location': '/login?error=unknownError'});
          return res.end();
        }

        //all good!
        req.session.authenticated = true;  
        req.session.userId = result.id;  

        res.writeHead(302, {'Location': '/'});
        return res.end();
      });
    });
  },  

  logout: function (req, res) {
    //console.log('login controller logout');

    //TODO perform real authentication here
    delete req.session.authenticated;    
    delete req.session.userId;

    //return res.send("<html><body>login controller response</br></br><a href='foo'>go foo</a></body></html>");
    //return res.redirect('/login');
    //return res.json('{result: "ok"}');
    res.writeHead(302, {'Location': '/login'});
    return res.end();
  },  
};
