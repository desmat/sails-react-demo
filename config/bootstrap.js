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

module.exports.bootstrap = function(cb) {
  // Load up initial data
  // look at database table, compare with data structure above, insert missing records, mark as inserted in database  
  var data = require('./data').data;

  Database.count().then(function(count) {
    //console.log('database count: ' + count);
    //console.log('data count: ' + data.length);

    if (count < data.length) {
      _.each(data.slice(count, data.length), function(data) {
        
        //split record as name-value pair
        _.each(data, function(k, v) {          
          sails.log.debug('Loading up intial [' + v + '] records');          

          try {
            this[v].create(k, function(err, created) {
              if (err) {
                sails.log.err(err);
              }
              else {
                //mark as inserted
                Database.create({model: v, count: (typeof k === 'Array' ? k.length : 1)}, function() {
                  if (err) sails.log.err(err);
                  //else sails.log.debug('marked [' + v + '] records as inserted');          
                });
              }
            });
          } 
          catch (err) {
            sails.log.warn("Error loading initial [" + v + "] records: " + err);
          }
        });
      });
    }
  });

  // JOBS

  var jobs = require('./jobs').jobs;

  _.each(jobs, function(job) {
    sails.log.debug('Scheduling job [' + job.name + ']');

    try {
      setInterval(function() {
        try {
          job.job();
        }
        catch (err) {
          sails.log.warn("Error executing job [" + job.name + "]: " + err);
        }
      }, job.interval);
    }
    catch (err) {
      sails.log.warn("Error scheduling job [" + job.name + "]: " + err);
    }
  });


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
