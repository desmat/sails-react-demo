var _ = require('underscore');
var $ = require('jquery');
var React = require("react");
var Api = require('../js/api');
var TodoItem = require('./TodoItem.jsx');

var nextNewTodoTempId = -1; //TODO

var BACKEND_DATA = [];

const TodoList = React.createClass({
  addTodoItem() {
    var self = this;
    var text = window.prompt("New Item To Do","The thing that I need to do");
    if (text) {
      var newTodoItem = {id: 0, text: text, state: 'todo', order: 999}; //id will be updated later
      this.setState({data: this.state.data.concat(newTodoItem)}); 

      Api.post('todo', 
        JSON.stringify(newTodoItem), 
        function(data) { 
          console.log('Success!');
          //update new portfolio's id
          _.findWhere(self.state.data, {id: newTodoItem.id}).id=data.id;
          self.setState({data: self.state.data});
      });
    
    }
  },

  setTodoItemState(id, state) {
    console.log('setting state [' + state + '] for todo item [' + id + ']');

    var todoItem = _.findWhere(this.state.data, {id: id});
    if (typeof todoItem !== 'undefined') {
      todoItem.state = state;

      //update locally
      this.setState({data: this.state.data}); 
      //update remotely
      Api.put('todo', todoItem.id, JSON.stringify(todoItem));
    }
  },

  setTodoItemText(id) {
    console.log('setting text [' + text + '] for todo item [' + id + ']');

    var todoItem = _.findWhere(this.state.data, {id: id});
    if (typeof todoItem !== 'undefined') {

      var text = window.prompt("Update Item To Do", todoItem.text);
      
      if (text) {
        todoItem.text = text;

        //update locally
        this.setState({data: this.state.data}); 

        //update remotely
        Api.put('todo', todoItem.id, JSON.stringify(todoItem));
      }     
    }
  },

  getInitialState() {
    console.log('*** TodoList.getInitialState');
    
    //Api.get('todo', function(data) { self.setState({data: data}); });

    // if (typeof window === 'undefined') {
    //   console.log('RUNNING IN BACKEND');

      
    //   var data = Api.getCached('todo');
    //   console.log('returned with data');

    //   return {data: data};
    // }

//    console.dir(this.state.data);


    if (typeof window !== 'undefined') {
      if (window.hasOwnProperty('data')) return {data: data};

    }

    return {data: []};
  },  

  componentDidMount() {
    console.log('*** TodoList.componentDidMount');
    var self = this;
    Api.get('todo', function(data) { self.setState({data: data}); window['data'] = data; });
  },

  render() {
    var self = this;
    var todoItems = [];
    var sortByField = this.props.state=='todo' ? 'createdAt' : 'updatedAt';
    var sortAscOrDesc = function(collection) {
      return self.props.state=='todo' ? collection : collection.reverse();
    }

    if (this.state.data) {
      todoItems = sortAscOrDesc(_.sortBy(_.where(this.state.data, {state: this.props.state}), sortByField)).map(function(todoItem) {
        return (
          <TodoItem id={todoItem.id} text={todoItem.text} state={todoItem.state} setState={self.setTodoItemState} setText={self.setTodoItemText} />
        );
      });
    }

    if (this.props.state=='todo') {
      return (
        <div>
          {todoItems}
          <div><a href="#" onClick={this.addTodoItem}>add</a></div>
        </div>
      );
    }
    else {
      return (
        <div>
          {todoItems}
        </div>
      );
    }
  }
});

module.exports = TodoList;
