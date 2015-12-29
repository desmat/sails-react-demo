
var data = [
  {
    Todo: [
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
    ]
  }, 
  // Additional records
  // {
  //   About: {text: 'More records...'}
  // }
];

module.exports.load = function() {
  
  //look at database table, compare with data structure above, insert missing records, mark as inserted in database  
  
  Database.count().then(function(count) {
    //console.log('database count: ' + count);
    //console.log('data count: ' + data.length);

    if (count < data.length) {
      _.each(data.slice(count, data.length), function(data) {
        
        //split record as name-value pair
        _.each(data, function(k, v) {          

          sails.log.debug('Loading up intial [' + v + '] records');          
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
        });
      });
    }
  });
};
