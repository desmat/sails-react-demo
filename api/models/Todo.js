/**
* Todo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    text: {
      type: 'string',
      required: true
    },
    state: {
      type: 'string',
      required: true,
      defaultsTo: 'todo'
    },
    order: {
      type: 'string',
      required: true, 
      defaultsTo: 0
    }
  }
};

