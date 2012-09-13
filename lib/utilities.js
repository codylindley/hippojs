
/**
* utilities.js
*
* @module utilities.js
*/

/**
* hippo.
*
* @class hippo.
* @static
*/

/**
* loop over anything
* @method each
* @static
* @for hippo.
* @param object {Object} an object
* @param callback {Function} callback function
* @return {Object}
*/
hippo.each = function(object, callback){
	var name, i = 0, length = object.length;

	for (; i < length;){
		if (callback.call(object[i], i, object[i++]) === false){
			break;
		}
	}

	return object;
};