/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function (req, res) {
		console.log('user controller home');
		foobar();
		return res.send("user home response");
    },
	"": function (req, res) {
		console.log('user controller default');
		return res.send("user default response");
    }
};

