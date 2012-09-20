
/**
* core.js
*
* @module core.js
*/

var rootObject = this;
var doc = rootObject.document;

/**
`hippo('li')`  
`hippo('li','ul')`  
`hippo('<div></div>')`  
`hippo(document.body)`  
`hippo([document.body,document.head])`  
`hippo(document.body.children)`  
`hippo(document.all)`  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param [context='<html>'] {String}
  A string containing a selector expression
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/
var hippo = function(configParam,context){
	return new CreateHippoObject(configParam,context);
};

var CreateHippoObject = function(configParam,context){

	//if no configParam assume html element was sent
	if(!configParam){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, then return object
	if(typeof configParam === 'string' && configParam.charAt(0) === "<" && configParam.charAt( configParam.length - 1 ) === ">" && configParam.length >= 3){
		var divElm = document.createElement('div');
		var docFrag = document.createDocumentFragment();
		docFrag.appendChild(divElm);
		docFrag.querySelector('div').innerHTML = configParam;
		this.length = 1;
		this[0] = docFrag.querySelector('div').firstChild;
		return this;
	}

	//if a single element node reference is passed
	if(typeof configParam === 'object' && configParam.nodeName){
		this.length = 1;
		this[0] = configParam;
		return this;
	}

	//other wise assume selector string, nodelist, or array, and use context if its passed
	var nodes;

	if(typeof configParam !== 'string'){//its not a string so its an array or nodelist
		nodes = configParam;
	}else{//if its a string create a nodelist, use context if provided
		nodes = (doc.querySelectorAll(context)[0] || doc).querySelectorAll(configParam);
	}
	//loop over array or nodelist and place in 'this' object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the object a length value
	this.length = nodes.length;

	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and deal with browser v.s. node
if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	rootObject.hippo = hippo;
	if(!('$' in rootObject)){
		rootObject.$ = hippo;
	}
}

//setup prototype
hippo.fn = CreateHippoObject.prototype = {
    constructor:hippo
};