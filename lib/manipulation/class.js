
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
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
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
	this.each(function(){
		this.classList.remove(classString);
	});
	return this;
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
	this.each(function(){
		this.classList.toggle(classString);
	});
	return this;
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