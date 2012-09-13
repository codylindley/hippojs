
/**
* utilities.js
*
* @module utilities.js
*/

/**
* hippo. e.g. hippo.version
*
* @class hippo.
* @static
*/

/**
* Returns the version of hippo
*
* @property version
* @for hippo.
* @static
* @type String
* @return {string}
*/
hippo.version = '1.0';

/**
* loop over an object or array
*
* @method each
* @static
* @for hippo.
* @param object {Object} an object
* @param callback {Function} callback function
* @return {Object}
*/
hippo.each = function(object, callback){
	var name,
	i = 0,
	length = object.length,
	isObj = length === undefined;

	if (isObj){
		for (name in object){
			if (callback.call(object[ name ], name, object[ name ]) === false){
				break;
			}
		}
	}else{
		for (; i < length;){
			if (callback.call(object[ i ], i, object[ i++ ]) === false ){
				break;
			}
		}
	}

	return object;
};