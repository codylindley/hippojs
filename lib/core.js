
/**
* core.js
*
* @module core.js
*/

var global = this;

/**
`hippo('li')`  
`hippo('li','ul')`  
`hippo('<div></div>')`  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param [context='<html>'] {String}
  A string containing a selector expression
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/
var hippo = function(configParam,context){
	return new createHippoObject(configParam,context);
};

var createHippoObject = function(configParam,context){

	//if no configParam return html element
	if(!configParam){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string
	if(configParam.charAt(0) === "<" && configParam.charAt( configParam.length - 1 ) === ">" && configParam.length >= 3){
		var divElm = document.createElement('div');
		var docFrag = document.createDocumentFragment();
		docFrag.appendChild(divElm);
		docFrag.querySelector('div').innerHTML = configParam;
		this.length = 1;
		this[0] = docFrag.querySelector('div').firstChild;
		return this;
	}

	//Assume selector string and use context if its passed
	var nodes = (document.querySelectorAll(context)[0] || document).querySelectorAll(configParam);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//deal with browser v.s. node
if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	global.hippo = hippo;
	if(!('$' in global)){
		global.$ = hippo;
	}
}

//setup prototype
hippo.fn = createHippoObject.prototype = {
    constructor:hippo
};