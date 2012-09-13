
/**
* contains methods for operating on the class="" attribute
*
* @module class.js
*/

/**
 * Adds class
 *
 * @method addClass
 * @for hippo
 * @param classString {String} class
 * @chainable
 */
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};

/**
 * length of the hippo object
 *
 * @property length
 * @type Number
 * @for hippo
 * @default 0
 */
hippo.fn.length = function(){
	console.log(this);
};