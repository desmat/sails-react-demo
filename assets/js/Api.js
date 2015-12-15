var $ = require('jquery');

const Api = {

	get(model, onSuccess, onError) {
		io.socket.get('/api/' + model, {}, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: GET ' + '/api/' + model + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
		        if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
		          window.__ReactInitState__[model] = data;
		        }

		        if (onSuccess) onSuccess(data);
			}
		});
	},

	getInitial(model) {
	    if (typeof window !== 'undefined') {
	      if (window.hasOwnProperty('__ReactInitState__') && 
	      	  window.__ReactInitState__.hasOwnProperty(model)) {
	        //console.log('has init state');
	        //console.dir(window.__ReactInitState__[model]);
	        return window.__ReactInitState__[model];
	      }
	    }
	    else if (typeof global !== 'undefined') {
	      if (global.hasOwnProperty('__ReactInitState__') && 
	      	  global.__ReactInitState__.hasOwnProperty(model)) {
	        //console.log('has init state');
	        //console.dir(global.__ReactInitState__[model]);
	        return global.__ReactInitState__[model];
	      }
	    }

	    return [];
   	},

	post(model, data, onSuccess, onError) {
		io.socket.post('/api/' + model, data, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: POST ' + '/api/' + model + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
		        if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
		          window.__ReactInitState__[model] = data;
		        }

		        if (onSuccess) onSuccess(data);
			}
		});
	}, 

	put(model, id, data, onSuccess, onError) {
		io.socket.put('/api/' + model + '/' + id, data, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: PUT ' + '/api/' + model + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
		        if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
		          window.__ReactInitState__[model] = data;
		        }

		        if (onSuccess) onSuccess(data);
			}
		});
	},
       
	delete(model, id, onSuccess, onError) {
		io.socket.delete('/api/' + model + '/' + id, {}, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: DELETE ' + '/api/' + model + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
		        if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
		          window.__ReactInitState__[model] = data;
		        }

		        if (onSuccess) onSuccess(data);
			}
		});
	},
        
};

module.exports = Api;
