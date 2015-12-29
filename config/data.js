/**
 * Initial data to load in api models.
 *
 * Expected is an array of records in the form:
 *  [
 *    ModelName: [
 *      {
 *        attributeName: "value", 
 *        otherAttribute: "otherValue"
 *      },
 *      {
 *        attributeName: "yet another", 
 *        otherAttribute: "and so forth"
 *      },
 *    ], 
 *    OtherModel: [
 *      ...
 *    ]
  * ]
 */
module.exports.data = [
  {
    User: [
      {
        "username": "Demo1", 
        "password": "Password1"
      },
      {
        "username": "Demo2", 
        "password": "Password1"
      },
    ]
  },
  {
    Todo: [
      {
        "text": "The thing that I need to do",
        "state": "todo",
        "userId": 1,
      },
      {
        "text": "The other thing that needs to get done",
        "state": "todo",
        "userId": 2,
      },
      {
        "text": "Finally do this",
        "state": "todo",
        "userId": 1,
      },
      {
        "text": "The thing that was done",
        "state": "done",
        "userId": 1,
      },
      {
        "text": "The other thing that got done",
        "state": "done",
        "userId": 2,
      }
    ]
  }, 
  //Additional records
  {
    About: {text: 'More records...'}
  }
];
