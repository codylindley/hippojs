
/**
looping over a hippo() object

@module looping.js
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