var $ = require('jquery');

var cache = [];

const Api = {

	get(model, onSuccess, onError) {
	    $.ajax({
	      url: '/api/' + model,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	      	cache[model] = data;
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

	getCached(model) {
		var cached = cache[model];
		if (cached) return cached;

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
