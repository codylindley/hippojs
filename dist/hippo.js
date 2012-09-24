/*hippo - v1.0 - 2012-09-24
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

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//if no elements assume html element was sent
	if(!elements){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, fill object, then return object
	if(typeof elements === 'string' &&
		elements.charAt(0) === "<" &&
		elements.charAt( elements.length - 1 ) === ">" &&
		elements.length >= 3){
			var divElm = document.createElement('div');
			var docFrag = document.createDocumentFragment();
			docFrag.appendChild(divElm);
			docFrag.querySelector('div').innerHTML = elements;
			this.length = 1;
			this[0] = docFrag.querySelector('div').firstChild;
			return this;
	}

	//if a single element node reference is passed, fill object, return object
	if(typeof elements === 'object' && elements.nodeName){
		this.length = 1;
		this[0] = elements;
		return this;
	}

	//other wise assume selector string, nodelist, or array, and use context if its passed
	var nodes;

	if(typeof elements !== 'string'){//its not a string so its an array or nodelist
		nodes = elements;
	}else{//if its a string create a nodelist, use context if provided
		nodes = (doc.querySelectorAll(context)[0] || doc).querySelectorAll(elements);
	}
	//loop over array or nodelist and place in fill object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the object a length value
	this.length = nodes.length;

	//return object
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and create $ shortcut
rootObject.hippo = hippo;
if(!('$' in rootObject)){
	rootObject.$ = hippo;
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
hippo.each = function(objectOrArray, callback){
	var name,
	i = 0,
	length = objectOrArray.length;

	if (length === undefined){//is {} with no length property
		for (name in objectOrArray){
			if (callback.call(objectOrArray[name], name, objectOrArray[name]) === false){
				break;
			}
		}
	}else{//is {} or [] with a length
		for (; i < length;){
			if (callback.call(objectOrArray[i], i, objectOrArray[i++]) === false ){
				break;
			}
		}
	}

	return objectOrArray;
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
return true if the array passed in is constructed from the Array() Constructor

@method isFunction
@static
@for hippo.
@param JavasScript value 
@return {Boolean}
**/
hippo.isFunction = function(funcReference){
	return hippo.type(funcReference) === "function";
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
filter elements
 
 @method filter
 @for hippo
 @param selector|function {String|Function}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.filter = function(callbackFilter){
	var doc = document.body;
	var results = []; //store function that return true

	if(hippo.isFunction(callbackFilter)){

		this.each(function(name,value){ //loop over each element
			if(callbackFilter.call(value)){// call callBackFilter function setting this value to element in hippo object
				//if the function returns true push to the array
				results.push(value);
			}
		});
		return this.constructor(results);//construct new hippo object from array

	}else if(typeof callbackFilter === 'string'){
		
		this.each(function(name,value){ //loop over each element
			if((doc.matchesSelector||doc.mozMatchesSelector||doc.webkitMatchesSelector||doc.oMatchesSelector||doc.msMatchesSelector).call(value,callbackFilter)){
				results.push(value);
			}
		});
		return this.constructor(results); //construct new hippo object from array

	}else{

		return this;

	}
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
 @param index {Number}
 @returns {Node}
 **/
hippo.fn.get = function(index){
	return index === undefined ? this[0] : this[index];
};

/**
clone element nodes in hippo object
 
 @method clone
 @for hippo
 @param callback {Boolean}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.clone = function(copy){
	return this.constructor(this[0].cloneNode(copy?copy:false));
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