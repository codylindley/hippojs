
/**
utilities.js

@module utilities.js
**/

/**
hippo. e.g. hippo.version

@class hippo.
@static
**/

/**
Returns the version of hippo

@property version
@for hippo.
@static
@type String
@return {string}
**/
hippo.version = '1.0';

/**
loop over an object or array

@method each
@static
@for hippo.
@param Object|Array {Object|Array}
	An Array or Object to iterate over
@param callback {Function}
	A callback Function
@return returns the Object or Array passed in
**/
hippo.each = function(object, callback){
	var name,
	i = 0,
	length = object.length,
	isObj = length === undefined;

	if (isObj){
		for (name in object){
			if (callback.call(object[name], name, object[name]) === false){
				break;
			}
		}
	}else{
		for (; i < length;){
			if (callback.call(object[i], i, object[i++]) === false ){
				break;
			}
		}
	}

	return object;
};

/**
* return JavaScript datatype as string e.g. 'string'|'number'|'null'|'undefined'|'object'|'array'

@method type
@static
@for hippo.
@param value {}
  Any JavaScript value
@return 'string'|'number'|'null'|'undefined'|'object'|'array'
**/

hippo.type = function(value){
	if(value === null) { return 'null'; }

	if(value === undefined) { return 'undefined'; }

	var ret = Object.prototype.toString.call(value).match(/^\[object\s+(.*?)\]$/)[1];

	ret = ret? ret.toLowerCase() : '';

	if(ret == 'number' && isNaN(value)) {
		return 'NaN';
	}

	return ret;
};