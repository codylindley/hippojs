/*hippo - v1.0 - 2012-10-01
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* setup hippo() function, constuctor, and prototype shortcut
*
* @module core.js
*/

var rootObject = this;
var doc = rootObject.document;
var regXContainsHTML = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

/**
`hippo('li')` //Selector  
`hippo('li','ul')` //Selector & Selector context  
`hippo('li',document.body)` //Selector & Element context   
`hippo('<div></div>')` //HTML  
`hippo('<div></div>','window.frames[0].document')` //HTML & Document context  
`hippo(document.body)` //Element  
`hippo([document.body,document.head])` //Array  
`hippo(document.body.children)` //NodeList  
`hippo(document.all)` //HTMLCollection  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param selector|Element|Document {String||Node}
  A string selector or node (Element or Document), defaults to current document
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//take care of context, could be a selector, an element, this document, or iframe document
	var d;
	if(context && context.nodeType){
		if(context.nodeType === 1){//its an element context
			d = context.ownerDocument;
		}else{//its a document (could be this document or iframe)
			d = context.body.ownerDocument;
		}
	}else{//its a selector
		d = doc;//point at scoped document i.e. var doc = document in next scope up
	}

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
		elements.length >= 3){//yup html string
			//create div & docfrag, append div to docfrag, then set its div's innerHTML to the string, then get first child
			var divElm = d.createElement('div');
			var docFrag = d.createDocumentFragment();
			docFrag.appendChild(divElm);
			docFrag.querySelector('div').innerHTML = elements;
			var numberOfChildren = docFrag.querySelector('div').children.length;

			for (var z = 0; z < numberOfChildren; z++) {
				this[z] = docFrag.querySelector('div').children[z];
			}
			//give the object a length value
			this.length = numberOfChildren;

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
		//if its a string selector create a context first, then run query again, or use current document
		nodes = (typeof context === 'string' ? d.querySelectorAll(context)[0] : d).querySelectorAll(elements);
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
utilities for hippo.js

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
return true if the array passed in is constructed from the Array() Constructor

@method matchesSelector
@static
@for hippo.
@param element {Node}
@param selector {String}
@return {Boolean}
**/
hippo.matchesSelector = function(node,selector){
	var d = doc.body;
	return (doc.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.oMatchesSelector||d.msMatchesSelector).call(node,selector);
};



/**
contains methods for operating on the wrapped set of elements in the hippo object

@module miscellaneous.js
**/

/**
add element to set

@method add
@for hippo
@param {selector|node|htmlString}
@chainable
@returns {Object} hippo() object with new element added
**/
hippo.fn.add = function(htmlStringOrNodeOrSelector,addToStart){
	var newSet  = [].slice.call(this); //turn hippo object into array
	//push or unshift new element into array
	newSet[addToStart?'unshift':'push'](hippo(htmlStringOrNodeOrSelector)[0]);
	//create new hippo object from array and return it
    return hippo(newSet);
};

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
Check if the first element matches the CSS selector

@method matchesSelector
@for hippo
@param selector {String}
@returns {Boolean}
**/
hippo.fn.matchesSelector = function(selector){
    return hippo.matchesSelector(this[0],selector);
};

/**
loop over each element, finding its descendants that match the passed in selector

@method find
@for hippo
@param Selector {String}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.find = function(selector){
	results = [];
    this.each(function(){
		var collection = this.querySelectorAll(selector);// get nodelist containing elements that match selector
		if(collection.length){//if a match is found, then loop over nodlist pushing elements to array
			hippo.each(collection,function(name,value){
				results.push(value);
			});
		}
    });
    return this.constructor(results); //construct new hippo object from array
};

/**
filter elements by selector expression or callback function
 
@method filter
@for hippo
@param selector|function {String|Function}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.filter = function(callbackFilter){
	var d = doc.body;
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
			if(hippo.matchesSelector(value,callbackFilter)){
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
	return [].slice.call(this);
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
  default is false, passing true does a deep clone, meaning not just the first selected element but all of its children too
@chainable
@returns {Object} hippo() object
**/
hippo.fn.clone = function(copy){
	return this.constructor(this[0].cloneNode(copy?copy:false));
};

}).call(this); //invoke function, set the value of this using call() to current global head object