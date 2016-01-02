var _ = require('underscore');
var $ = require('jquery');
var React = require("react");
var Api = require('../assets/js/Api');
var TodoItem = require('./TodoItem.jsx');

const TodoList = React.createClass({
  addTodoItem() {
    var self = this;
    var text = window.prompt("New Item To Do","The thing that I need to do");
    if (text) {
      var newTodoItem = {id: 0, text: text, state: 'todo', order: 999}; //id will be updated later
      this.setState({data: this.state.data.concat(newTodoItem)}); 

      Api.post('todo', newTodoItem, function(data) { 
        //update new portfolio's id
        _.findWhere(self.state.data, {id: newTodoItem.id}).id=data.id;
        self.setState({data: self.state.data});
      });
    
    }
  },

  setTodoItemState(id, state) {
    var todoItem = _.findWhere(this.state.data, {id: id});
    if (typeof todoItem !== 'undefined') {
      todoItem.state = state;

      //update locally
      this.setState({data: this.state.data}); 
      //update remotely

      if (state == 'deleted') {
        Api.delete('todo', todoItem.id);
      }
      else {
        Api.put('todo', todoItem.id, todoItem);
      }
    }
  },

  setTodoItemText(id) {
    //console.log('setting text [' + text + '] for todo item [' + id + ']');

    var todoItem = _.findWhere(this.state.data, {id: id});
    if (typeof todoItem !== 'undefined') {

      var text = window.prompt("Update Item To Do", todoItem.text);
      
      if (text) {
        todoItem.text = text;

        //update locally
        this.setState({data: this.state.data}); 

        //update remotely
        Api.put('todo', todoItem.id, todoItem);
      }     
    }
  },

  getInitialState() {
    var url = 'todo' + ((typeof this.props.state !== 'undefined') ? '?state=' + this.props.state : '');

    return {data: Api.getInitial(url)};
  },  

  componentDidMount() {
    var self = this;
    var fetchData = function() {
      var url = 'todo' + ((typeof self.props.state !== 'undefined') ? '?state=' + self.props.state : '');

      Api.get(url, function(data) { 
        self.setState({data: data}); 
      }, function(errorCode) {
        if (errorCode == 403) {
          Api.logout();
          Api.navigate('/login');
        }
      });
    };

    io.socket.on('todo', function (msg) {
      //quick and dirty for now
      fetchData();
    });

   fetchData();
  },

  render() {
    var self = this;
    var todoItems = [];
    var sortByField = this.props.state=='todo' ? 'createdAt' : 'updatedAt';
    var sortAscOrDesc = function(collection) {
      return self.props.state=='todo' ? collection : collection.reverse();
    }

    var list = sortAscOrDesc(_.sortBy(_.where(this.state.data, {state: this.props.state}), sortByField));

    if (this.props.state=='todo') {
      if (list.length == 0) {
        return (
        <div>
          {/*<p className="text-center">
            <i>Nothing do to! Press the button below and create new things to do!</i>
          </p>*/}
          <br/>
          <div className="text-center">
              <button onClick={this.addTodoItem} className="btn btn-primary">Add</button>
          </div>
        </div>
        )
      }
      else {
        return (
          <div>
            {list.map(function(todoItem) {
              return (
                <TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text} state={todoItem.state} setState={self.setTodoItemState} setText={self.setTodoItemText} />
              );
            })}

            <br/>
            <div className="text-center">
                <a onClick={this.addTodoItem} className="btn btn-primary">
                  <i className="fa fa-plus" aria-hidden="true"/> Add
                </a>
            </div>
          </div>
        );
      }
    }
    else {
      if (list.length == 0) {
        return (
        <p className="text-center">
          {/*<i>Nothing to see here, move along!</i>*/}
        </p>
        )
      }
      else {
        return (
          <div>
            {list.map(function(todoItem) {
              return (
                <TodoItem key={todoItem.id} id={todoItem.id} text={todoItem.text} state={todoItem.state} setState={self.setTodoItemState} setText={self.setTodoItemText} />
              );
            })}

          </div>
        );
      }
    }
  }
});

module.exports = TodoList;
