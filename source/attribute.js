
/**
contains methods for operating on the element attributes

@module attribute.js
**/

/**
 sets attribute value

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
 gets attribute value, or has of attribute values

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
 remove attribute value

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
 has attribute value

 @method hasAttr
 @for hippo
 @param class {String}
 @returns {Boolean} 
 **/
hippo.fn.hasAttr = function(attr){
	return this[0].hasAttribute(attr);
};