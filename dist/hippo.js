/*hippo - v1.0 - 2012-09-14
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* core.js
*
* @module core.js
*/

var global = this;

/**
`hippo('li')`  
`hippo('li','ul')`  
`hippo('<div></div>')`  
@class hippo
@constructor
@param Selector|HTML {String|String}
  A string containing a selector expression | A string containing HTML
@param [Context='html'] {String}
  A string containing a selector expression
@return {Object} {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
**/
var hippo = function(configParam,context){
	return new createHippoObject(configParam,context);
};

var createHippoObject = function(configParam,context){

	//if no configParam
	if(!configParam){
		return this;
	}

	//ok, expect at the very least a configParam string
	var nodes = (document.querySelectorAll(context)[0] || document).querySelectorAll(configParam);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;

	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
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

/**
* return JavaScript type
*
* @method type
* @static
* @for hippo.
* @param Any JavaScript Value
* @return {String}
*/

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

//looping.js
hippo.fn.each = function(callback){
    return hippo.each(this, callback);
};

/**
 * length of the hippo object
 *
 * @property length
 * @type Number
 * @for hippo
 * @default 0
 */
hippo.fn.size = function(){
	console.log(this);
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

//outro.js
}.call(this)); //call anynoumous function, set this value, for function to global scope