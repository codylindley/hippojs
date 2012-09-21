
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