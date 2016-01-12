
var cacheReactInitState = function(model, data) {
	if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
	  window.__ReactInitState__[model.toLowerCase()] = data;
	}
};

module.exports = {

	get(model, onSuccess, onError) {
		io.socket.get('/api/' + model, {}, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: GET ' + '/api/' + model + ': ' + jwres.statusCode);
				console.dir(jwres);
        if (onError) onError(jwres.statusCode);        
			}
			else {
				cacheReactInitState(model, data);
        if (onSuccess) onSuccess(data);
			}
		});
	},

	getInitial(model) {
    if (typeof window !== 'undefined') {
      if (window.hasOwnProperty('__ReactInitState__') && 
      	  window.__ReactInitState__.hasOwnProperty(model.toLowerCase())) {
        //console.log('has init state');
        //console.dir(window.__ReactInitState__[model]);
        return window.__ReactInitState__[model.toLowerCase()];
      }
    }
    else if (typeof global !== 'undefined') {
      if (global.hasOwnProperty('__ReactInitState__') && 
      	  global.__ReactInitState__.hasOwnProperty(model.toLowerCase())) {
        //console.log('has init state');
        //console.dir(global.__ReactInitState__[model]);
        return global.__ReactInitState__[model.toLowerCase()];
      }
    }

    return [];
 	},

	post(model, data, onSuccess, onError) {
		var modelAndQuery = model.split('?'); //we might want to keep query portions if present for caching but not for calling end-point

		io.socket.post('/api/' + modelAndQuery[0], data, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: POST ' + '/api/' + modelAndQuery[0] + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
				// cacheReactInitState(model, data);
        if (onSuccess) onSuccess(data);
			}
		});
	}, 

	put(model, id, data, onSuccess, onError) {
    var modelAndQuery = model.split('?'); //we might want to keep query portions if present for caching but not for calling end-point

		io.socket.put('/api/' + modelAndQuery[0] + '/' + id, data, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: PUT ' + '/api/' + modelAndQuery[0] + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
				// cacheReactInitState(model, data);
        if (onSuccess) onSuccess(data);
			}
		});
	},
       
	delete(model, id, onSuccess, onError) {
    var modelAndQuery = model.split('?'); //we might want to keep query portions if present for caching but not for calling end-point

		io.socket.delete('/api/' + modelAndQuery[0] + '/' + id, {}, function(data, jwres) {
			//console.dir(jwres);
			if (typeof jwres.error !== 'undefined') {
				//TODO figure out what to do with errors
				console.log('Api error: DELETE ' + '/api/' + modelAndQuery[0] + ': ' + jwres.statusCode);
				console.dir(jwres.error);
			}
			else {
				//cacheReactInitState(model, data);
        if (onSuccess) onSuccess(data);
			}
		});
	},
        
};
