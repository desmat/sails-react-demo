var _ = require('underscore');
var React = require("react");
var Api = require('../assets/js/Api');

const About = React.createClass({

  getInitialState() {
    //console.log('*** TodoList.getInitialState');

    return {data: Api.getInitial('About')};
  },  

  componentDidMount() {
    //console.log('*** TodoList.componentDidMount');

    var self = this;
    Api.get('About', function(data) { 
      //introduce delay for testing purposes
      //setTimeout(function() {
      	console.log('got data');
        self.setState({data: data}); 
      //}, 500);
      }
    );
  },

  render() {
    var sortByField = 'createdAt';
    var sortAscOrDesc = function(collection) {
      return collection;
    }

    return (
      <div>
      <p>A simple to-do list built with Node and Sails on the back-end, and React on the front-end with isomorphism configured for easy-going development.</p>
      <p>Documentation and source code: <a href='https://github.com/desmat/sails-react-demo'>https://github.com/desmat/sails-react-demo</a>.</p>

		{this.state.data.map(function(aboutText) {
			return (
				<p key={aboutText.id}>{aboutText.text}</p>
			);
		})}
      </div>
    )
  }
});

module.exports = About;
