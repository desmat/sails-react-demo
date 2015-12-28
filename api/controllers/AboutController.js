/**
 * AboutController
 *
 * @description :: Server-side logic for managing Abouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

  database: function (req, res) {
    Database.find({}, function(err, rs) {
      if (err) return console.log(err);
      console.dir(rs);
    });

    res.send('ok');
  }
};

