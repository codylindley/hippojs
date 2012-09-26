
/**
contains methods for operating on the element attributes

@module attribute.js
**/

/**
 sets attribute value

 @method setAttr
 @for hippo
 @param attribute {String}
 @param value {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.setAttr = function(attr,value){
	this.each(function(){
		this.setAttribute(attr,(value?value:attr)); //account for boolean attributes where we need to set disable='disabled';
	});
	return this;
};

/**
 gets attribute value

 @method addAttr
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.getAttr = function(attr){
	return this[0].getAttribute(attr);
};

/**
 remove attribute value

 @method removeAttr
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeAttr = function(attr){
	this.each(function(){
		this.removeAttribute(attr);
	});
	return this;
};

/**
 has attribute value

 @method hasAttr
 @for hippo
 @param class {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.hasAttr = function(attr){
	return this[0].hasAttribute(attr);
};