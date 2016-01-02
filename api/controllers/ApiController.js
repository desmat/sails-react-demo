/**
 * ApiController: overwrite default api end-points
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function (req, res) {
    // console.log('api controller login');

    if (!req.hasOwnProperty('body') || !req.body.hasOwnProperty('username') || 
        !req.body.hasOwnProperty('password') || !req.body.username || !req.body.password) {
      return res.json({error: "Username or password missing"});
    }

    User.findOne({username: req.body.username, password: req.body.password}, function(err, result) {
      if (err) {        
        //console.log('Login error: ' + err);
        return res.json({error: "Error: " + err});
      }
      else if (!result) {
        return res.json({error: "Invalid credentials"});
      }

      //all good!
      req.session.authenticated = true;  
      req.session.userId = result.id;  

      return res.json({login: "ok"});
    });
  }, 

  register: function (req, res) {
    //console.log('api controller register');

    if (!req.hasOwnProperty('body') || !req.body.hasOwnProperty('username') || 
        !req.body.hasOwnProperty('password') || !req.body.username || !req.body.password) {
      return res.json({error: "Username or password missing"});
    }

    //look for existing username
    User.findOne({username: req.body.username}, function(err, result) {
      if (err) {
        //console.log('Register error: ' + err);
        return res.json({error: "Error: " + err});
      }
      else if (result) {
        return res.json({error: "Username exists"});
      }

      //username not found, create
      User.create({username: req.body.username, password: req.body.password}, function(err, result) {
        if (err) {
          //console.log('Register error: ' + err);
          return res.json({error: "Error: " + err});
        }
        else if (!result) {
          //console.log('Register error: (unknown)');
          return res.json({error: "Unknown error"});
        }

        //all good!
        req.session.authenticated = true;  
        req.session.userId = result.id;  

        return res.json({register: "ok"});
      });
    });
  },  

  logout: function (req, res) {
    //console.log('api controller logout');

    delete req.session.authenticated;    
    delete req.session.userId;

    return res.json({result: "ok"});
  },  
};

