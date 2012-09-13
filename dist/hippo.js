/*hippo - v1.0 - 2012-09-13
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* core.js
*
* @module core.js
**/

var global = this;

/**
* hippo() e.g. hippo('li').addClass();
*
* @class hippo
* @constructor
*/
var hippo = function(selector) {
	return new createHippoObject(selector);
};

var createHippoObject = function(selector) {
	var nodes = document.querySelectorAll(selector);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;
	return this;
};

if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	global.hippo = hippo;
	if(!('$' in global)){
		global.$ = hippo;
	}
}

//setup prototype
hippo.fn = createHippoObject.prototype = {
    constructor:hippo
};

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
	var name, i = 0, length = object.length, isObj = length;

	if (isObj){
		for (name in obj){
			if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
				break;
			}
		}
	}else{
		for ( ; i < length; ){
			if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
				break;
			}
		}
	}

	return object;
};

//looping.js
hippo.fn.each = function(callback){
    return hippo.each(this, callback);
};

/**
* contains methods for operating on the class="" attribute
*
* @module class.js
*/

/**
 * Adds class
 *
 * @method addClass
 * @for hippo
 * @param classString {String} class
 * @chainable
 */
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};

/**
 * length of the hippo object
 *
 * @property length
 * @type Number
 * @for hippo
 * @default 0
 */
hippo.fn.length = 0;

//outro.js
}.call(this)); //call anynoumous function, set this value, for function to global scope