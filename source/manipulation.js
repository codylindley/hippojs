
/**
contains methods for operating on elements

@module manipulation.js
**/

/**
replace the elements in the set with an html string, selected node from the DOM, a node, or each element in a hippo set

 @method replaceWith
 @for hippo()
 @param {String|Node|Selector|Object}
   html string, text string, Node, or Selector, or Hippo Object
 @chainable
 @returns {Object}
   hippo() object containing orignal elements removed
**/
hippo.fn.replaceWith = function(value){ //unclear if modern browser still leak memory
	if(!value){return this;}
	return this.each(function(){
		if(regXContainsHTML.exec(value) !== null){ //html string
			this.outerHTML = value;
		}else if(typeof value === 'string' && doc.querySelectorAll(value).length === 0){//text node
			this.outerHTML = value;
		}else if(typeof value === 'string'){ //selector
			this.outerHTML = hippo(value)[0].outerHTML;
		}else if(value.nodeName){ //node
			this.outerHTML = value.outerHTML;
		}else{//if hippo object
			this.outerHTML = value[0].outerHTML;	
		}
	});
};

/**
remove DOM contents of each element in the set

 @method empty
 @for hippo()
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.empty = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		this.innerHTML = '';
	});
};

/**
remove each element in the set

 @method remove
 @for hippo()
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.remove = function(){ //unclear if modern browser still leak memory
	return this.each(function(){
		if(this.parentNode){
			this.parentNode.removeChild(this);
		}
	});
};

/**
 Add content to the DOM before each element in the set

 @method before
 @for hippo()
 @param {String|Node|Selector|Object}
   html string, Node, or Selector, or Hippo Object
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.before = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('beforebegin',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else if(htmlStringOrNodeOrSelector.nodeName){ //node
			this.insertAdjacentHTML('beforebegin',htmlStringOrNodeOrSelector.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrNodeOrSelector.each(function(name,value){
				that.insertAdjacentHTML('beforebegin',value.outerHTML);
			});
		}
	});
};

/**
 Add content to the DOM before the element selected by the selector expression

 @method insertBefore
 @for hippo()
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
 @for hippo()
 @param {String|Node|Selector}
   html string, Node, or Selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.after = function(htmlStringOrNodeOrSelector){
	return this.each(function(){
		if(regXContainsHTML.exec(htmlStringOrNodeOrSelector) !== null){ //html string
			this.insertAdjacentHTML('afterend',htmlStringOrNodeOrSelector);
		}else if(typeof htmlStringOrNodeOrSelector === 'string'){ //selector
			this.insertAdjacentHTML('afterend',hippo(htmlStringOrNodeOrSelector)[0].outerHTML);
		}else if(htmlStringOrNodeOrSelector.nodeName){ //node
			this.insertAdjacentHTML('afterend',htmlStringOrNodeOrSelector.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrNodeOrSelector.each(function(name,value){
				that.insertAdjacentHTML('afterend',value.outerHTML);
			});
		}
	});
};

/**
 Add content to the DOM after the element selected by the selector expression

 @method insertAfter
 @for hippo()
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

/**
 Append content to the DOM inside each individual element in the set

 @method append
 @for hippo()
 @param {String|Node}
   html string/text string or Element Node
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.append = function(htmlStringOrtextStringOrNode){
	return this.each(function(){
		if(typeof htmlStringOrtextStringOrNode === 'string'){ //selector
			this.insertAdjacentHTML('beforeend',htmlStringOrtextStringOrNode);
		}else if(htmlStringOrtextStringOrNode.nodeName){ //node
			this.insertAdjacentHTML('beforeend',htmlStringOrtextStringOrNode.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrtextStringOrNode.each(function(name,value){
				that.insertAdjacentHTML('beforeend',value.outerHTML);
			});
		}
	});
};

/**
 Append content to the DOM inside the selector

 @method appendTo
 @for hippo()
 @param {String}
   selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.appendTo = function(selector){
	return this.each(function(){
		hippo(selector).append(this);
	});
};

/**
 prepend content to the DOM inside each individual element in the set

 @method prepend
 @for hippo()
 @param {String|Node}
   html string/text string or Element Node
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.prepend = function(htmlStringOrtextStringOrNode){
	return this.each(function(){
		if(typeof htmlStringOrtextStringOrNode === 'string'){ //selector
			this.insertAdjacentHTML('afterbegin',htmlStringOrtextStringOrNode);
		}else if(htmlStringOrtextStringOrNode.nodeName){ //node
			this.insertAdjacentHTML('afterbegin',htmlStringOrtextStringOrNode.outerHTML);
		}else{//if hippo object
			var that = this;
			htmlStringOrtextStringOrNode.each(function(name,value){
				that.insertAdjacentHTML('afterbegin',value.outerHTML);
			});
		}
	});
};

/**
 prepend content to the DOM inside the selector

 @method prependTo
 @for hippo()
 @param {String}
   selector
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.prependTo = function(selector){
	return this.each(function(){
		hippo(selector).prepend(this);
	});
};

/**
Wrap each element of the set separately in a DOM structure

 @method wrap
 @for hippo()
 @param {String}
   html string
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.wrap = function(string){
	return this.each(function(){
		$(this).replaceWith(hippo(string).append(this));
	});
};

/**
Wrap each element of the set separately in a DOM structure

 @method wrapInner
 @for hippo()
 @param {String}
   html string
 @chainable
 @returns {Object} hippo() object
**/
hippo.fn.wrapInner = function(string){
	return this.each(function(){
		this.innerHTML = hippo(string).append(this)[0].outerHTML;
	});

};

/**
 Set HTML contents of elements in the set, or get innerHTML of first element

 @method html
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or innerHTML
**/
 hippo.fn.html = function(htmlStringOrTextString){
	if(htmlStringOrTextString){
		return this.each(function(){
			this.innerHTML = htmlStringOrTextString;
		});
	}else{
		return this[0].innerHTML;
	}
};

/**
 Set HTML contents including parent element

 @method outerHtml
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or innerHTML
**/
 hippo.fn.outerHtml = function(htmlStringOrTextString){
	if(htmlStringOrTextString){
		return this.each(function(){
			this.outerHTML = htmlStringOrTextString;
		});
	}else{
		return this[0].outerHTML;
	}
};


/**
 Set text contents of elements in the set, or get textContent of first element

 @method text
 @for hippo()
 @param {String}
   selector
 @optional
 @chainable
 @returns {Object} hippo() object or textContent
**/
hippo.fn.text = function(textString){
	if(textString){
		return this.each(function(){
			this.textContent = textString;
		});
	}else{
		return this[0].textContent.trim();
	}
};


