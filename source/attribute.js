
/**
contains methods for operating on the element attributes

@module attribute.js
**/

/**
 sets attribute value for all elements in the set

 @method setAttr
 @for hippo()
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
 gets attribute value, or object of attribute values from first element in the set

 @method addAttr
 @for hippo()
 @param attribute {String}
 @optional
 @returns either an object containing all attributes or a single value from a specific attribute passed in
 **/
hippo.fn.getAttr = function(attr){
	if(attr){
		return this[0].getAttribute(attr);
	}else{
		var attrArray = [].slice.call(this[0].attributes);

		var attrObject = {};

		hippo.each(attrArray,function(name,value){
			attrObject[value.nodeName] = value.nodeValue;
		});

		return attrObject;
	}
};

/**
 remove attribute value from all elements in the set

 @method removeAttr
 @for hippo()
 @param value {String}
   pass more than one value by providing a space inbetween values
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
 @for hippo()
 @param class {String}
 @returns {Boolean} 
 **/
hippo.fn.hasAttr = function(attr){
	return this[0].hasAttribute(attr);
};

/**
 Adds class attribute value

 @method addClass
 @for hippo()
 @param class {String}
   pass more than one value by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.addClass = function(classString){
	var classStringArray = classString.split(/\s+/);
	return this.each(function(){
		var that = this;
		hippo.each(classStringArray,function(name,value){
			that.classList.add(value);
		});
	});
};

/**
 removes class attribute value

 @method removeClass
 @for hippo()
 @param class {String}
   pass more than one value by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeClass = function(classString){
	var classStringArray = classString.split(/\s+/);
	return this.each(function(){
		var that = this;
		hippo.each(classStringArray,function(name,value){
			that.classList.remove(value);
		});
	});
};

/**
 toggle class attribute value

 @method toggleClass
 @for hippo()
 @param class {String}
   pass more than one value by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.toggleClass = function(classString){
	var classStringArray = classString.split(/\s+/);
	return this.each(function(){
		var that = this;
		hippo.each(classStringArray,function(name,value){
			that.classList.toggle(value);
		});
	});
};

/**
 is class attribute value already defined

 @method hasClass
 @for hippo()
 @param class {String}

 @returns {Boolean}
 **/
hippo.fn.hasClass = function(classString){
	return this[0].classList.contains(classString);
};

/**
 gets class value, or array of class values from first element in the set

 @method getClass
 @for hippo()
 @param boolean {Boolean}
 @returns either an array containing all attributes or a single value from a specific attribute passed in
 **/
hippo.fn.getClass = function(getArray){
	if(getArray){
		return this[0].getAttribute('class');
	}else{
		return [].slice.call(this[0].classList);
	}
};

/**
 needs description

 @method getData
 @for hippo()
 @param data value {String}
 @optional
 @returns either an object containing all attributes or a single value from a specific attribute passed in
 **/
hippo.fn.getData = function(dataValue){
	if(dataValue){
		return hippo(this[0]).getAttr('data-'+dataValue);
	}else{

		var attrArray = [].slice.call(this[0].attributes).filter(function(item){
				return item.nodeName.substr(0,5) === 'data-';
		});

		var attrObject = {};

		hippo.each(attrArray,function(name,value){
			attrObject[hippo.camelCaseDashs(value.nodeName)] = value.nodeValue;
		});

		return attrObject;
	}
};

/**
needs description

 @method setData
 @for hippo()
 @param attribute(s) {String|Object}
 @param value {String}
 @optional
 @returns {Object} hippo() object
**/
hippo.fn.setData = function(dataName,value){
	var isString = typeof dataName === 'string';
	return this.each(function(){
		var that = this;
		if(isString){
			this.setAttribute('data-'+dataName,value); //account for boolean attributes where we need to set disable='disabled';
		}else{
			hippo.each(dataName,function(name,value){
				that.setAttribute('data-'+name,value);
			});
		}
	});
};

/**
 remove data value from all elements in the set

 @method removeData
 @for hippo()
 @param value {String}
   pass more than one value by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeData = function(dataName){
	var attrArray = dataName.split(/\s+/);
	return this.each(function(){
		var that = this;
		hippo.each(attrArray,function(name,value){
			that.removeAttribute('data-'+value);
		});
	});
};

/**
 does the first element in the set have the data attribute value

 @method hasData
 @for hippo()
 @param class {String}
 @returns {Boolean} 
 **/
hippo.fn.hasData = function(dataValue){
	return this[0].hasAttribute('data-'+dataValue);
};



