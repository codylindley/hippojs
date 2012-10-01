
/**
contains methods for operating on elements

@module manipulation.js
**/

/**
need description

 @method replaceWith
 @for hippo
 @param value {String}
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.replaceWith = function(value){ //unclear if modern browser still leak memory
	var stringHtml = doc.querySelector(value).outerHTML;
	return this.each(function(){
			this.outerHTML = stringHtml;
	});
};

/**
need description

 @method empty
 @for hippo
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.empty = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		this.innerHTML = '';
	});
};

/**
 need description

 @method remove
 @for hippo
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.remove = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		this.parentNode.removeChild(this);
	});
};

/**
 Add content to the DOM before each element in the set

 @method before
 @for hippo
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.before = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('beforebegin',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else{ //node
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector.outerHTML);
		}
	});
};

/**
 Add content to the DOM before the element selected by the selector expression

 @method insertBefore
 @for hippo
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.insertBefore = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		hippo(htmlStringOrNodeOrSelector).before(this);
	});
};

