/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // login: function (req, res) {
  //   //console.log('login controller login');

  //   if (!req.hasOwnProperty('body') || !req.body.hasOwnProperty('username') || 
  //       !req.body.hasOwnProperty('password') || !req.body.username || !req.body.password) {
  //     res.writeHead(302, {'Location': '/login?error=loginMissing'});
  //     return res.end();
  //   }

  //   User.findOne({username: req.body.username, password: req.body.password}, function(err, result) {
  //     if (err) {
  //       console.log('Login error: ' + err);
  //       res.writeHead(302, {'Location': '/login?error=generalError'});
  //       return res.end();
  //     }
  //     else if (result) {
  //       //console.dir(result);
  //       req.session.authenticated = true;  
  //       req.session.userId = result.id;  
  //       return res.redirect('/');
  //     }
  //     else {
  //       res.writeHead(302, {'Location': '/login?error=loginFailure'});
  //       return res.end();
  //     }
  //   });
  // },  

  // register: function (req, res) {
  //   //console.log('login controller register');

  //   if (!req.hasOwnProperty('body') || !req.body.hasOwnProperty('username') || 
  //       !req.body.hasOwnProperty('password') || !req.body.username || !req.body.password) {
  //     res.writeHead(302, {'Location': '/register?error=loginMissing'});
  //     return res.end();
  //   }

  //   //look for existing username
  //   User.findOne({username: req.body.username}, function(err, result) {
  //     if (err) {
  //       console.log('Register error: ' + err);
  //       //TODO send back login error to front-end
  //       res.writeHead(302, {'Location': '/register?error=generalError'});
  //       return res.end();
  //     }
  //     else if (result) {
  //       res.writeHead(302, {'Location': '/register?error=usernameExists'});
  //       return res.end();

  //     }

  //     //username not found, create
  //     User.create({username: req.body.username, password: req.body.password}, function(err, result) {
  //       if (err) {
  //         console.log('Register error: ' + err);
  //         //TODO send back login error to front-end
  //         res.writeHead(302, {'Location': '/register?error=generalError'});
  //         return res.end();
  //       }
  //       else if (!result) {
  //         console.log('Register error: (unknown)');
  //         //TODO send back login error to front-end
  //         res.writeHead(302, {'Location': '/register?error=unknownError'});
  //         return res.end();
  //       }

  //       //all good!
  //       req.session.authenticated = true;  
  //       req.session.userId = result.id;  

  //       res.writeHead(302, {'Location': '/'});
  //       return res.end();
  //     });
  //   });
  // },  

  // logout: function (req, res) {
  //   //console.log('login controller logout');

  //   delete req.session.authenticated;    
  //   delete req.session.userId;

  //   //return res.send("<html><body>login controller response</br></br><a href='foo'>go foo</a></body></html>");
  //   //return res.redirect('/login');
  //   //return res.json('{result: "ok"}');
  //   res.writeHead(302, {'Location': '/login'});
  //   return res.end();
  // },  
};
