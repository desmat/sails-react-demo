/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index(req, res) {
		console.log('index controller default');
		return res.send("<html><body>index controller response</br></br><a href='foo'>go foo</a></body></html>");
  },

  user(req, res) {
		console.log('index controller user');
		return res.send("<html><body>index controller user response</br></br><a href='foo'>go foo</a></body></html>");
  }
};

