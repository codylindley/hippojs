
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
get the index, from the set, of the first element or selector passed in

@method index
@for hippo()
@param {String|Node} selector or element node
@returns {Number}
**/
hippo.fn.index = function(selectorOrNode){
	var index = -1;
	this.each(function(name,value){
		if(typeof selectorOrNode === 'string'){
			if(hippo.matchesSelector(value,selectorOrNode)){
				index = name;
				return false;
			}
		}else{
			if(this === selectorOrNode){
				index = name;
				return false;
			}
		}
	});
	return index;
};

/**
get the index, from the set, of the last element or selector passed in

@method lastIndex
@for hippo()
@param {String|Node} selector or element node
@returns {Number}
**/
hippo.fn.lastIndex = function(selectorOrNode){
	var fromStart = this.reverse().index(selectorOrNode);
	return (this.length - 1) - fromStart;
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
Check if any of the elements children, in the set, matches the CSS selector

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
reverse order of ser

@method reverse
@for hippo()
@chainable
@returns {Object} hippo() object
**/
hippo.fn.reverse = function(){
	return this.toArray().reverse();
};

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

@method findExclude()
@for hippo()
@param Selector {String}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.findExclude = function(selector){
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


