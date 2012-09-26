
/**
contains methods for operating on the element attributes

@module attribute.js
**/

/**
 sets attribute value for all elements in the set

 @method setAttr
 @for hippo
 @param attribute(s) {String|Object}
 @param value {String}
 @optional
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.setAttr = function(attr,value){
	var attrIsString = typeof attr === 'string';
	return this.each(function(){
		var that = this;
		if(attrIsString){
			this.setAttribute(attr,(value?value:attr)); //account for boolean attributes where we need to set disable='disabled';
		}else{
			hippo.each(attr,function(name,value){
				that.setAttribute(name,value);
			});
		}
	});
};

/**
 gets attribute value, or array of attribute values from first element in the set

 @method addAttr
 @for hippo
 @param attribute {String}
 @optional
 @returns either an array containing all attributes or a single value from a specific attribute passed in
 **/
hippo.fn.getAttr = function(attr){
	if(attr){
		return this[0].getAttribute(attr);
	}else{
		return [].slice.call(this[0].attributes);
	}
};

/**
 remove attribute value from all elements in the set

 @method removeAttr
 @for hippo
 @param value {String}
   pass more than one value with by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeAttr = function(attr){
	var attrArray = attr.split(/\s+/);
	return this.each(function(){
		var that = this;
		hippo.each(attrArray,function(name,value){
			that.removeAttribute(value);
		});
	});
};

/**
 does the first element in the set have the attribute value

 @method hasAttr
 @for hippo
 @param class {String}
 @returns {Boolean} 
 **/
hippo.fn.hasAttr = function(attr){
	return this[0].hasAttribute(attr);
};

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