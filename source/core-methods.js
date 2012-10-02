
/**
contains methods for operating on the wrapped set of elements in the hippo object

@module core-methods.js
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