
/**
contains methods for operating on the element attributes

@module attribute.js
**/

/**
 sets attribute value for all elements in the set

 @method attr
 @for hippo()
 @param attribute(s) {String|Object}
 @param value {String}
 @optional
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.attr = function(attr,value){

	if(attr && value || typeof attr === 'object'){ //setting
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

	}else if(attr){ //getting specific attr

		return this[0].getAttribute(attr);

	}else{ //getting all attr

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

	if(attr){//remove one or multiple

		var attrArray = attr.split(/\s+/);
		return this.each(function(){
			var that = this;
			hippo.each(attrArray,function(name,value){
				that.removeAttribute(value);
			});
		});

	}else{ //remove all

		return this.each(function(){
			var that = this;
			hippo.each([].slice.call(this.attributes),function(name,value){
				that.removeAttribute(value.nodeName);
			});
		});

	}

};

/**
 does the first element in the set have the attribute value

 @method hasAttr
 @for hippo()
 @param class {String}
 @returns {Boolean}
 **/
hippo.fn.hasAttr = function(attr){
	var attrValueArray = attr.split(/\s+/);
	var has = false;
	this.each(function(){
		var that = this;
		hippo.each(attrValueArray,function(name,value){
			if(that.hasAttribute(value)){
				has = true;
				return;
			}
		});
	});
	return has;
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
	if(classString){//remove one or multiple
		var classStringArray = classString.split(/\s+/);
		return this.each(function(){
			var that = this;
			hippo.each(classStringArray,function(name,value){
				that.classList.remove(value);
			});
		});
	}else{ //remove all
		return this.each(function(){
			this.className = '';
		});
	}
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
	var classStringArray = classString.split(/\s+/);
	var has = false;
	this.each(function(){
		var that = this;
		hippo.each(classStringArray,function(name,value){
			if(that.classList.contains(value)){
				has = true;
				return;
			}
		});
	});
	return has;
};

/**
 gets class value, or array of class values from first element in the set

 @method getClass
 @for hippo()
 @param boolean {Boolean}
 @returns either an array containing all attributes or a single value from a specific attribute passed in
 **/
hippo.fn.getClass = function(className){
	if(className){
		return this[0].getAttribute('class');
	}else{ //return list of all classs in array
		return [].slice.call(this[0].classList);
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
hippo.fn.data = function(dataName,value){

	if(dataName && value || typeof dataName === 'object'){ //setting

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

	}else if(dataName){ //getting

		return hippo(this[0]).attr('data-'+dataName);

	}else{ //getting all data

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
 remove data value from all elements in the set

 @method removeData
 @for hippo()
 @param value {String}
   pass more than one value by providing a space inbetween values
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.removeData = function(dataName){

	if(dataName){//remove one or multiple

		var attrArray = dataName.split(/\s+/);
		return this.each(function(){
			var that = this;
			hippo.each(attrArray,function(name,value){
				that.removeAttribute('data-'+value);
			});
		});

	}else{ //remove all data- attrs

		return this.each(function(){
			var that = this;
			hippo.each([].slice.call(this.attributes),function(name,value){
				if(value.nodeName.substr(0,5) === 'data-'){
					that.removeAttribute(value.nodeName);
				}
			});
		});

	}

};

/**
 does the first element in the set have the data attribute value

 @method hasData
 @for hippo()
 @param class {String}
 @returns {Boolean}
 **/
hippo.fn.hasData = function(dataValue){
	var dataValueArray = dataValue.split(/\s+/);
	var has = false;
	this.each(function(){
		var that = this;
		hippo.each(dataValueArray,function(name,value){
			if(that.hasAttribute('data-'+value)){
				has = true;
				return;
			}
		});
	});
	return has;
};



