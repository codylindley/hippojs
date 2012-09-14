
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