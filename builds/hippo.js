/*hippo - v0.1 - 2012-10-09
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

/**
* setup hippo() function, constructor, and prototype shortcut
*
* @module core.js
*/

//private vars
var rootObject = this;
var doc = rootObject.document;
var regXContainsHTML = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

/**
`hippo('li')` //selector  
`hippo('li','ul')` //selector & selector context  
`hippo('li',document.body)` //selector & element node context   
`hippo('<div></div>')` //HTML  
`hippo('<div></div>','window.frames[0].document')` //HTML & Document context  
`hippo(document.body)` //element node  
`hippo([document.body,document.head])` //Array  
`hippo(document.body.children)` //NodeList  
`hippo(document.all)` //HTMLCollection  
`hippo(hippo())` //a hippo() object itself 
@class hippo()
@constructor
@param {String|Node|Object} selector/HTML|Node|hippo() A string selector, html string, element node, or hippo() object, if you leave it empty default to HTML element
@default `<html>` element
@param {String|Node} selector|Node A string containing a selector expression, element node, or document node
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//take care of context, could be a selector, an element, this document, or iframe document
	var d;
	if(context && context.nodeType){ //context was passed and its a node
		if(context.nodeType === 1){//its an element context
			d = context.ownerDocument; //so get the elements document
		}else{//its a document (could be this document or iframe)
			d = context.body.ownerDocument; //so get document from document
		}
	}else{//its a selector i.e. a string so use the store doc
		d = doc;//point at scoped document i.e. var doc = document in next scope up
	}

	//if no elements parameter passed, return html element
	if(!elements){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, fill object, then return object
	if(typeof elements === 'string' &&
		elements.charAt(0) === "<" &&
		elements.charAt( elements.length - 1 ) === ">" &&
		elements.length >= 3){//yup its forsure html string
			//create div & docfrag, append div to docfrag, then set its div's innerHTML to the string, then get first child
			var divElm = d.createElement('div');
			divElm.className = 'hippo-doc-frag-wrapper';
			var docFrag = d.createDocumentFragment();
			docFrag.appendChild(divElm);
			var queryDiv = docFrag.querySelector('div');
			queryDiv.innerHTML = elements;
			var numberOfChildren = queryDiv.children.length;
			//loop over nodelist and fill object, needs to be done because a string of html can be passed with siblings
			for (var z = 0; z < numberOfChildren; z++) {
				this[z] = queryDiv.children[z];
			}
			//give the object a length value
			this.length = numberOfChildren;
			//return object
			return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
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
		nodes = elements; //so... is already something that can be looped with for loop
	}else{//if its a string create a nodelist, use context if provided
		if(typeof context === 'string' && d.querySelectorAll(context)[0] === undefined){//bad context return nothing
			nodes = []; //no context
		}else{//its a string selector, create a context first, then run query again, or use current document
			nodes = (typeof context === 'string' ? d.querySelectorAll(context)[0] : d).querySelectorAll(elements);
		}
	}
	//loop over array or nodelist created above and fill hippo object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the hippo object a length value
	this.length = nodes.length;

	//return hippo object
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and create $ shortcut
rootObject.hippo = hippo;
if(!('$' in rootObject)){
	rootObject.$ = hippo;
}


//setup prototype shortcut and setup constructor reference
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
return true if the array passed in is constructed from the Array() Constructor

@method collectElements
@static
@for hippo.
@param element {Node}
@param property {String}
@return {Array}
**/
hippo.collectElements = function(element,property,selector){
	var list = [];
	while((element = element[property])){
		if(element.nodeType === Node.ELEMENT_NODE){
			list.push(element);
			//if the last selector matches then return list early
			if(selector && hippo.matchesSelector(element,selector)){return list;}
		}
	}
	return list;
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method uniqElements
@static
@for hippo.
@param array {Array}}
@return {Array}
**/
hippo.uniqElements = function(results){
	var hasDuplicate;
	var elem;
	var i = 1;
	var sortOrder = function(a, b){
		if (a === b){
			hasDuplicate = true;
			return 0;
		}
		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

	results.sort(sortOrder);

	for ( ; (elem = results[i]); i++ ) {
		if ( elem === results[ i - 1 ] ) {
			results.splice( i--, 1 );
		}
	}
	return results;
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method camelCaseDashs
@static
@for hippo.
@param {String}
@return {String}
**/
hippo.camelCaseDashs = function(string){
	return string.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi, function(all,letter){return(letter + '').toUpperCase();});
};





/**
contains methods for operating on the wrapped set of elements in the hippo object

@module core-methods.js
**/

///////////////////////////////////////////////////////////////////////////
//operates on the set, but does not return a hippo() object
///////////////////////////////////////////////////////////////////////////

/**
do any of the elements in the set match the passed in selector

@method is
@for hippo()
@param {String|Object} selector or element node
@returns {Boolean}
**/
hippo.fn.is = function(selectorOrNode){
	var check = true;
	this.each(function(name,value){
		if(selectorOrNode.nodeValue){
			if(value === selectorOrNode){
				check = false;
				return;
			}
		}else{
			if(!hippo.matchesSelector(value,selectorOrNode)){
				check = false;
				return;
			}
		}
	});
	return check;
};

/**
Check if any of the elements in the set are empty from in regards to children elements

@method isEmpty
@for hippo()
@returns {Boolean}
**/
hippo.fn.isEmpty = function(){
	var check = true;
	this.each(function(name,value){
		if(this.innerHTML.trim() !== ''){
			check = false;
			return;
		}
	});
	return check;
};

/**
get the index, from the set, of the element or selector passed in

@method index
@for hippo()
@param {String|Node} selector or element node
@returns {Number}
**/
hippo.fn.index = function(selectorOrNode){
	var index = -1;
	this.each(function(name,value){
		if(typeof selectorOrNode === 'string'){
			if(hippo.matchesSelector(this,selectorOrNode)){
				index = name;
				return;
			}
		}else{
			if(this === selectorOrNode){
				index = name;
				return;
			}
		}
	});
	return index;
};

/**
get the index of the first element in the set, among its siblings

@method siblingsIndex
@for hippo()
@returns {Number}
**/
hippo.fn.siblingIndex = function(){
	if(this[0] === undefined){return -1;}
	var index = 0;
	var element = this[0];
	while(element && (element = element.previousElementSibling)){
			index++;
	}
	return index;
};

/**
Check if any of the elements childrens, in the set, matches the CSS selector

@method has
@for hippo()
@param {String|Node} selector or element node
@returns {Boolean}
**/
hippo.fn.has = function(selectorOrNode){
	var check = false;
	this.each(function(name,value){
		if(typeof selectorOrNode === 'string' ? this.parentNode.querySelectorAll(selectorOrNode).length === 1 : this.parentNode.contains(selectorOrNode)){
			check = true;
			return false;
		}
	});
	return check;
};

/**
total elements in the hippo object

@method total
@for hippo()
@returns {Number}
**/
hippo.fn.total = function(){
	return this.length;
};

/**
convert hippo object of DOM elements into JavaScript array of elements
 
@method toArray
@for hippo()
@returns {Array}
**/
hippo.fn.toArray = function(){
	return [].slice.call(this);
};

/**
get a DOM node from the hippo object at a specific index (zero based).
 
@method get
@for hippo()
@param index {Number}
@returns {Node}
**/
hippo.fn.get = function(index){
	return index === undefined ? this[0] : this[index];
};

///////////////////////////////////////////////////////////////////////////
//operates on the set, changing the set, but still returns a hippo() object
///////////////////////////////////////////////////////////////////////////

/**
loop over each element

@method each
@for hippo()
@param callback {Function}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.each = function(callback){
	return hippo.each(this, callback);
};

/**
slice the set

@method slice
@for hippo()
@param {Number} starting index
@param {Number} ending index
@optional
@chainable
@returns {Object} hippo() object
**/
hippo.fn.slice = function(start,end){
	return hippo(this.toArray().slice(start,end));
};

/**
reduce set to a single element at a specific index

@method at
@for hippo()
@param {Number} index
@chainable
@returns {Object} hippo() object
**/
hippo.fn.at = function(index){
	return hippo(this.get(index));
};

/**
loop over each element, finding its descendants that match the passed in selector, return matched desendants in hippo set

@method find
@for hippo()
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
	return hippo(this.length === 1 ? results : hippo.uniqElements(results));
};

/**
loop over each element, removing descendants matching the selector, return desendants in hippo set

@method exclude()
@for hippo()
@param Selector {String}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.exclude = function(selector){
	results = [];
	this.each(function(){
		var collection = this.querySelectorAll('*:not('+selector+')');// get nodelist containing elements that match selector
		if(collection.length){//if a match is found, then loop over nodlist pushing elements to array
			hippo.each(collection,function(name,value){
				results.push(value);
			});
		}
	});
	return hippo(this.length === 1 ? results : hippo.uniqElements(results)); //construct new hippo object from array
};

/**
loop over each element, removing elements do not match selector

@method not()
@for hippo()
@param {String} selector
@chainable
@returns {Object} hippo() object
**/
hippo.fn.not = function(selector){
	var results = []; //store function that return true
	this.each(function(name,value){ //loop over each element
		if(!hippo.matchesSelector(value,selector)){
			results.push(value);
		}
	});
	return hippo(results); //construct new hippo object from array
};

/**
filter elements by selector expression or callback function
 
@method filter
@for hippo()
@param {String|Function} selector|callback 
@chainable
@returns {Object} hippo() object
**/
hippo.fn.filter = function(selectorOrCallback){

	var results = []; //store function that return true

	if(hippo.isFunction(selectorOrCallback)){

		this.each(function(name,value){ //loop over each element
			if(selectorOrCallback.call(value)){// call callBackFilter function setting this value to element in hippo object
				//if the function returns true push to the array
				results.push(value);
			}
		});
		return hippo(results);//construct new hippo object from array

	}else if(typeof selectorOrCallback === 'string'){
		
		this.each(function(name,value){ //loop over each element
			if(hippo.matchesSelector(value,selectorOrCallback)){
				results.push(value);
			}
		});
		return hippo(results); //construct new hippo object from array

	}else{

		return this;

	}
};

/**
add element to set

@method add
@for hippo()
@param selector/HTML|Node|Hippo() {String||Node||Object}
  A string selector, node, or hippo() object, if you leave it empty default to HTML element
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
Get the last element of the current set
 
@method last
@for hippo()
@returns {Node}
**/
hippo.fn.last = function(){
	return hippo(this[this.length - 1]);
};

/**
Get the first element of the current set
 
@method first
@for hippo()
@returns {Node}
**/
hippo.fn.first = function(){
	return hippo(this[0]);
};


/**
clone element nodes in hippo object
 
@method clone
@for hippo()
@param callback {Boolean}
  default is false, passing true does a deep clone, meaning not just the first selected element but all of its children too
@chainable
@returns {Object} hippo() object
**/
hippo.fn.clone = function(copy){
	return hippo(this[0].cloneNode(copy?copy:false));
};




/**
contains methods for operating on elements

@module manipulation.js
**/

/**
replace the elements in the set with an html string, selected node from the DOM, a node, or each element in a hippo set

 @method replaceWith
 @for hippo()
 @param {String|Node|Selector|Object}
   html string, text string, Node, or Selector, or Hippo Object
 @chainable
 @returns {Object}
   hippo() object containing orignal elements removed
**/
hippo.fn.replaceWith = function(value){ //unclear if modern browser still leak memory
	if(!value){return this;}
	return this.each(function(){
		if(regXContainsHTML.exec(value) !== null){ //html string
			this.outerHTML = value;
		}else if(typeof value === 'string' && doc.querySelectorAll(value).length === 0){//text node
			this.outerHTML = value;
		}else if(typeof value === 'string'){ //selector
			this.outerHTML = hippo(value)[0].outerHTML;
		}else if(value.nodeName){ //node
			this.outerHTML = value.outerHTML;
		}else{//if hippo object
			this.outerHTML = value[0].outerHTML;	
		}
	});
};

/**
remove DOM contents of each element in the set

 @method empty
 @for hippo()
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.empty = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		this.innerHTML = '';
	});
};

/**
remove each element in the set

 @method remove
 @for hippo()
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.remove = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		if(this.parentNode){
			this.parentNode.removeChild(this);
		}
	});
};

/**
 Add content to the DOM before each element in the set

 @method before
 @for hippo()
 @param {String|Node|Selector|Object}
   html string, Node, or Selector, or Hippo Object
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.before = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('beforebegin',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else if(htmlStringOrNodeOrSelector.nodeName){ //node
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrNodeOrSelector.each(function(name,value){
				that.insertAdjacentHTML('beforebegin',value.outerHTML);
			});
		}
	});
};

/**
 Add content to the DOM before the element selected by the selector expression

 @method insertBefore
 @for hippo()
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.insertBefore = function(htmlStringOrNodeOrSelector){
	//deal with inserting a doc frag, infront of another doc frag i.e. hippo('<li></li>').insertBefore('<li class="test"><li>')
	if(this[0].parentNode.className === 'hippo-doc-frag-wrapper' && regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){
		return hippo(this[0]).add(htmlStringOrNodeOrSelector,true);
	}
	//else, do a normal insertBefore
	return this.each(function(){
		hippo(htmlStringOrNodeOrSelector).before(this);
	});
};

/**
 Add content to the DOM after each element in the set

 @method after
 @for hippo()
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.after = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('afterend',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('afterend',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else if(htmlStringOrNodeOrSelector.nodeName){ //node
			this.insertAdjacentHTML('afterend',htmlStringOrNodeOrSelector.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrNodeOrSelector.each(function(name,value){
				that.insertAdjacentHTML('afterend',value.outerHTML);
			});
		}
	});
};

/**
 Add content to the DOM after the element selected by the selector expression

 @method insertAfter
 @for hippo()
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.insertAfter = function(htmlStringOrNodeOrSelector){
	//deal with inserting a doc frag, infront of another doc frag i.e. hippo('<li></li>').insertBefore('<li class="test"><li>')
	if(this[0].parentNode.className === 'hippo-doc-frag-wrapper' && regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){
		return hippo(this[0]).add(htmlStringOrNodeOrSelector);
	}
	//else, do a normal insertBefore
	return this.each(function(){
		hippo(htmlStringOrNodeOrSelector).after(this);
	});
};

/**
 Append content to the DOM inside each individual element in the set

 @method append
 @for hippo()
 @param {String|Node}
   html string/text string or Element Node
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.append = function(htmlStringOrtextStringOrNode){
	return this.each(function(){
		if(typeof htmlStringOrtextStringOrNode === 'string'){ //selector
			this.insertAdjacentHTML('beforeend',htmlStringOrtextStringOrNode);
		}else if(htmlStringOrtextStringOrNode.nodeName){ //node
			this.insertAdjacentHTML('beforeend',htmlStringOrtextStringOrNode.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrtextStringOrNode.each(function(name,value){
				that.insertAdjacentHTML('beforeend',value.outerHTML);
			});
		}
	});
};

/**
 Append content to the DOM inside the selector

 @method appendTo
 @for hippo()
 @param {String}
   selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.appendTo = function(selector){
	return this.each(function(){
		hippo(selector).append(this);
	});
};

/**
 prepend content to the DOM inside each individual element in the set

 @method prepend
 @for hippo()
 @param {String|Node}
   html string/text string or Element Node
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.prepend = function(htmlStringOrtextStringOrNode){
	return this.each(function(){
		if(typeof htmlStringOrtextStringOrNode === 'string'){ //selector
			this.insertAdjacentHTML('afterbegin',htmlStringOrtextStringOrNode);
		}else if(htmlStringOrtextStringOrNode.nodeName){ //node
			this.insertAdjacentHTML('afterbegin',htmlStringOrtextStringOrNode.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrtextStringOrNode.each(function(name,value){
				that.insertAdjacentHTML('afterbegin',value.outerHTML);
			});
		}
	});
};

/**
 prepend content to the DOM inside the selector

 @method prependTo
 @for hippo()
 @param {String}
   selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.prependTo = function(selector){
	return this.each(function(){
		hippo(selector).prepend(this);
	});
};

/**
Wrap each element of the set separately in a DOM structure

 @method wrap
 @for hippo()
 @param {String}
   html string
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.wrap = function(string){
	return this.each(function(){
		$(this).replaceWith(hippo(string).append(this));
	});
};

/**
Wrap each element of the set separately in a DOM structure

 @method wrapInner
 @for hippo()
 @param {String}
   html string
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.wrapInner = function(string){
	return this.each(function(){
		this.innerHTML = hippo(string).append(this)[0].outerHTML;
	});

};

/**
 Set HTML contents of elements in the set, or get innerHTML of first element

 @method html
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or innerHTML
**/
 hippo.fn.html = function(htmlStringOrTextString){
	if(htmlStringOrTextString){
		return this.each(function(){
			this.innerHTML = htmlStringOrTextString;
		});
	}else{
		return this[0].innerHTML;
	}
};

/**
 Set HTML contents including parent element

 @method outerHtml
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or innerHTML
**/
 hippo.fn.outerHtml = function(htmlStringOrTextString){
	if(htmlStringOrTextString){
		return this.each(function(){
			this.outerHTML = htmlStringOrTextString;
		});
	}else{
		return this[0].outerHTML;
	}
};


/**
 Set text contents of elements in the set, or get textContent of first element

 @method text
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or textContent
**/
hippo.fn.text = function(textString){
	if(textString){
		return this.each(function(){
			this.textContent = textString;
		});
	}else{
		return this[0].textContent.trim();
	}
};




}).call(this); //invoke function, set the value of this using call() to current global head object