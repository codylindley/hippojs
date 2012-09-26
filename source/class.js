
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
	return this.each(function(){
		this.classList.add(classString);
	});
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
	return this.each(function(){
		this.classList.remove(classString);
	});
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
	return this.each(function(){
		this.classList.toggle(classString);
	});
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