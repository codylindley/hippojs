/*hippo - v1.0 - 2012-09-20
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* core.js
*
* @module core.js
*/

var rootObject = this;
var doc = rootObject.document;

/**
`hippo('li')`  
`hippo('li','ul')`  
`hippo('<div></div>')`  
`hippo(document.body)`  
`hippo([document.body,document.head])`  
`hippo(document.body.children)`  
`hippo(document.all)`  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param [context='<html>'] {String}
  A string containing a selector expression
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/
var hippo = function(configParam,context){
	return new CreateHippoObject(configParam,context);
};

var CreateHippoObject = function(configParam,context){

	//if no configParam assume html element was sent
	if(!configParam){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, then return object
	if(typeof configParam === 'string' && configParam.charAt(0) === "<" && configParam.charAt( configParam.length - 1 ) === ">" && configParam.length >= 3){
		var divElm = document.createElement('div');
		var docFrag = document.createDocumentFragment();
		docFrag.appendChild(divElm);
		docFrag.querySelector('div').innerHTML = configParam;
		this.length = 1;
		this[0] = docFrag.querySelector('div').firstChild;
		return this;
	}

	//if a single element node reference is passed
	if(typeof configParam === 'object' && configParam.nodeName){
		this.length = 1;
		this[0] = configParam;
		return this;
	}

	//other wise assume selector string, nodelist, or array, and use context if its passed
	var nodes;

	if(typeof configParam !== 'string'){//its not a string so its an array or nodelist
		nodes = configParam;
	}else{//if its a string create a nodelist, use context if provided
		nodes = (doc.querySelectorAll(context)[0] || doc).querySelectorAll(configParam);
	}
	//loop over array or nodelist and place in 'this' object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the object a length value
	this.length = nodes.length;

	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and deal with browser v.s. node
if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	rootObject.hippo = hippo;
	if(!('$' in rootObject)){
		rootObject.$ = hippo;
	}
}

//setup prototype
hippo.fn = CreateHippoObject.prototype = {
    constructor:hippo
};

/**
utilities.js

@module helpers.js
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
hippo.version = '0.1';

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
return JavaScript datatype as string e.g. 'string'|'number'|'null'|'undefined'|'object'|'array'

@method type
@static
@for hippo.
@param value {Object}
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

/**
return true if the array passed in is constructed from the Array() Constructor

@method isArray
@static
@for hippo.
@param value {Object}
  Any JavaScript value
@return {Boolean}
**/
hippo.isArray = Array.isArray || function(arrayReference){
		return hippo.type(arrayReference) === "array";
};

/**
looping over a hippo() object

@module miscellaneous.js
**/

/**
loop over each element
 
 @method each
 @for hippo
 @param callback {Function}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.each = function(callback){
    return hippo.each(this, callback);
};

/**
total elements in the hippo object
 
 @method total
 @for hippo
 @returns {Number}
 **/
hippo.fn.total = function(){
	return this.length;
};

/**
convert hippo object of DOM elements into JavaScript array of elements
 
 @method toArray
 @for hippo
 @returns {Array}
 **/
hippo.fn.toArray = function(){
	return Array.prototype.slice.call(this);
};

/**
get a DOM node from the hippo object at a specific index (zero based).
 
 @method get
 @for hippo
 @param callback {Number}
 @returns {Node}
 **/
hippo.fn.get = function(number){
	return number === null ? this[0] : this[number];
};

/**
clone element nodes in hippo object
 
 @method clone
 @for hippo
 @param callback {Boolean}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.clone = function(number){
	this.each(function(){
		
	});
	return this;
};

/**
contains methods for operating on the class="" attribute

@module class.js
**/

/**
 Adds class attribute value

 @method addClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};

/**
 removes class attribute value

 @method removeClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeClass = function(classString){
	this.each(function(){
		this.classList.remove(classString);
	});
	return this;
};

/**
 toggle class attribute value

 @method toggleClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.toggleClass = function(classString){
	this.each(function(){
		this.classList.toggle(classString);
	});
	return this;
};

/**
 is class attribute value already defined

 @method hasClass
 @for hippo
 @param class {String}
 @chainable
 @returns {Boolean}
 **/
hippo.fn.hasClass = function(classString){
	return this[0].classList.contains(classString);
};

}).call(this); //invoke function, set the value of this using call() to current global head object