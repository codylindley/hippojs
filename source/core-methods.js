
/**
contains methods for operating on the wrapped set of elements in the hippo object

@module core-methods.js
**/

///////////////////////////////////////////////////////////////////////////
//operates on the set, but does not return a hippo() object
///////////////////////////////////////////////////////////////////////////

/**
Check if any of the elements in the set matches the CSS selector

@method is
@for hippo()
@param selector {String}
@returns {Boolean}
**/
hippo.fn.is = function(selector){
	var check = true;
    this.each(function(name,value){
		if(!hippo.matchesSelector(value,selector)){
			check = false;
			return;
		}
    });
    return check;
};

/**
Check if any of the elements childrens, in the set, matches the CSS selector

@method has
@for hippo()
@param selector {String}
@returns {Boolean}
**/
hippo.fn.has = function(selector){
	var check = false;
    this.each(function(name,value){
		if(this.parentNode.querySelectorAll(selector).length === 1){
			check = true;
			return;
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
@param number {Number}
	start
@param number {Number}
	end
@chainable
@returns {Object} hippo() object
**/
hippo.fn.slice = function(start,end){
    return hippo(this.toArray().slice(start,end));
};

/**
reduce set to a single element

@method eq
@for hippo()
@param number {Number}
@chainable
@returns {Object} hippo() object
**/
hippo.fn.eq = function(index){
    return hippo(this.get(index));
};

/**
reduce set to the children elements of each element in the set 

@method children
@for hippo()
@chainable
@returns {Object} hippo() object
**/
hippo.fn.children = function(index){
	var set = [];
    this.each(function(name,value){
		hippo(this.children).each(function(name,value){
			set.push(value);
		});
    });
    return hippo(set);
};

/**
loop over each element, finding its descendants that match the passed in selector

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
    return this.constructor(results); //construct new hippo object from array
};

/**
filter elements by selector expression or callback function
 
@method filter
@for hippo()
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