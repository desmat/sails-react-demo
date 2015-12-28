/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var data = [
  {
    "text": "The thing that I need to do",
    "state": "todo",
  },
  {
    "text": "The other thing that needs to get done",
    "state": "todo",
  },
  {
    "text": "Finally do this",
    "state": "todo",
  },
  {
    "text": "The thing that was done",
    "state": "done",
  },
  {
    "text": "The other thing that got done",
    "state": "done",
  }
];

module.exports.bootstrap = function(cb) {
  // Load up initial data
  Todo.count().then(function(count) { 
    if (count == 0) {
      sails.log.debug('Loading up intial database records');
      Todo.create(data, function(err, created) {
        if (err) console.log(err);
      });
    }
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
