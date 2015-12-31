/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    console.log('login controller default');
    return res.send("<html><body>login controller response</br></br><a href='/login/login'>Login</a></br><a href='/login/logout'>Logout</a></body></html>");
  },  
  login: function (req, res) {
    console.log('login controller login');

    //TODO perform real authentication here
    req.session.authenticated = true;    

    //return res.send("<html><body>login controller response</br></br><a href='foo'>go foo</a></body></html>");
    return res.redirect('/');
  },  
  logout: function (req, res) {
    console.log('login controller logout');

    //TODO perform real authentication here
    req.session.authenticated = false;    

    //return res.send("<html><body>login controller response</br></br><a href='foo'>go foo</a></body></html>");
    return res.redirect('/');
  },  
};
