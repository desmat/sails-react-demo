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
  //Additional records
  {
    About: {text: 'More records...'}
  }
];
