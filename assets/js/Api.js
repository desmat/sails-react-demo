var $ = require('jquery');

const Api = {

	get(model, onSuccess, onError) {

	    $.ajax({
	      url: '/api/' + model,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        if (typeof window !== 'undefined' && window.hasOwnProperty('__ReactInitState__')) {
	          window.__ReactInitState__[model] = data;
	        }

	        if (onSuccess) onSuccess(data);
	      },
	      error: function(xhr, status, err) {
	        if (onError) {
	        	onError(err);
	        }
	        else {
	        	console.error(model, status, err.toString());
	        }
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
	    $.ajax({
			url: '/api/' + model,
			dataType: 'json',
			method: 'POST',
			contentType: 'application/json',
			data: data,
			cache: false,

			success: function(data) {
				if (onSuccess) onSuccess(data);
			},
			error: function(xhr, status, err) {
				if (onError) {
					onError(err);
				}
				else {
					console.error(this.props.url, status, err.toString());
				}
			}
	    });
	}, 

	put(model, id, data, onSuccess, onError) {
		console.log('PUT ' + model);

	    $.ajax({
			url: '/api/' + model + '/' + id,
			dataType: 'json',
			method: 'PUT',
			contentType: 'application/json',
			data: data,
			cache: false,
			success: function(data) {
				if (onSuccess) onSuccess(data);
			},
			error: function(xhr, status, err) {
				if (onError) {
					onError(err);
				}
				else {
					console.error(this.props.url, status, err.toString());
				}
			}
	    });
	},
       
	delete(model, id, onSuccess, onError) {
		console.log('DELETE ' + model);

	    $.ajax({
			url: '/api/' + model + '/' + id,
			dataType: 'json',
			method: 'DELETE',
			cache: false,
			success: function(data) {
				if (onSuccess) onSuccess(data);
			},
			error: function(xhr, status, err) {
				if (onError) {
					onError(err);
				}
				else {
					console.error(this.props.url, status, err.toString());
				}
			}
	    });
	},
        
};

module.exports = Api;
