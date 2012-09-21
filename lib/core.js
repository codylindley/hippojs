
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

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//if no elements assume html element was sent
	if(!elements){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, fill object, then return object
	if(typeof elements === 'string' &&
		elements.charAt(0) === "<" &&
		elements.charAt( elements.length - 1 ) === ">" &&
		elements.length >= 3){
			var divElm = document.createElement('div');
			var docFrag = document.createDocumentFragment();
			docFrag.appendChild(divElm);
			docFrag.querySelector('div').innerHTML = elements;
			this.length = 1;
			this[0] = docFrag.querySelector('div').firstChild;
			return this;
	}

	//if a single element node reference is passed, fill object, return object
	if(typeof elements === 'object' && elements.nodeName){
		this.length = 1;
		this[0] = elements;
		return this;
	}

	//other wise assume selector string, nodelist, or array, and use context if its passed
	var nodes;

	if(typeof elements !== 'string'){//its not a string so its an array or nodelist
		nodes = elements;
	}else{//if its a string create a nodelist, use context if provided
		nodes = (doc.querySelectorAll(context)[0] || doc).querySelectorAll(elements);
	}
	//loop over array or nodelist and place in fill object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the object a length value
	this.length = nodes.length;

	//return object
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and create $ shortcut
rootObject.hippo = hippo;
if(!('$' in rootObject)){
	rootObject.$ = hippo;
}


//setup prototype
hippo.fn = CreateHippoObject.prototype = {
    constructor:hippo
};