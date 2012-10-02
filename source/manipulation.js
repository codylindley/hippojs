
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
	//deal with inserting a doc frag, infront of another doc frag i.e. hippo('<li></li>').insertBefore('<li class="test"><li>')
	if(this[0].parentNode.className === 'hippo-doc-frag-wrapper' && regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){
		return hippo(this[0]).add(htmlStringOrNodeOrSelector,true);
	}
	//else, do a normal insertBefore
	return this.each(function(){
		hippo(htmlStringOrNodeOrSelector).before(this);
	});
};

/**
 Add content to the DOM after each element in the set

 @method after
 @for hippo
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.after = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('beforeEnd',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('beforeEnd',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else{ //node
			this.insertAdjacentHTML('beforeEnd',htmlStringOrNodeOrSelector.outerHTML);
		}
	});
};

/**
 Add content to the DOM after the element selected by the selector expression

 @method insertAfter
 @for hippo
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
 **/
hippo.fn.insertAfter = function(htmlStringOrNodeOrSelector){
	//deal with inserting a doc frag, infront of another doc frag i.e. hippo('<li></li>').insertBefore('<li class="test"><li>')
	if(this[0].parentNode.className === 'hippo-doc-frag-wrapper' && regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){
		return hippo(this[0]).add(htmlStringOrNodeOrSelector);
	}
	//else, do a normal insertBefore
	return this.each(function(){
		hippo(htmlStringOrNodeOrSelector).after(this);
	});
};

