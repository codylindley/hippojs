
/**
* setup hippo() function, constructor, and prototype shortcut
*
* @module core.js
*/

//private vars
var rootObject = this;
var doc = rootObject.document;
var regXContainsHTML = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

/**
`hippo('li')` //selector  
`hippo('li','ul')` //selector & selector context  
`hippo('li',document.body)` //selector & element node context   
`hippo('<div></div>')` //HTML  
`hippo('<div></div>','window.frames[0].document')` //HTML & Document context  
`hippo(document.body)` //element node  
`hippo([document.body,document.head])` //Array  
`hippo(document.body.children)` //NodeList  
`hippo(document.all)` //HTMLCollection  
`hippo(hippo())` //a hippo() object itself 
@class hippo()
@constructor
@param {String|Node|Object} selector/HTML|Node|hippo() A string selector, html string, element node, or hippo() object, if you leave it empty default to HTML element
@default `<html>` element
@param {String|Node} selector|Node A string containing a selector expression, element node, or document node
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//take care of context, could be a selector, an element, this document, or iframe document
	var d;
	if(context && context.nodeType){ //context was passed and its a node
		if(context.nodeType === 1){//its an element context
			d = context.ownerDocument; //so get the elements document
		}else{//its a document (could be this document or iframe)
			d = context.body.ownerDocument; //so get document from document
		}
	}else{//its a selector i.e. a string so use the store doc
		d = doc;//point at scoped document i.e. var doc = document in next scope up
	}

	//if no elements parameter passed, return html element
	if(!elements){
		this.length = 1;
		this[0] = document.documentElement;
		return this;
	}

	//if HTML string, construct domfragment, fill object, then return object
	if(typeof elements === 'string' &&
		elements.charAt(0) === "<" &&
		elements.charAt( elements.length - 1 ) === ">" &&
		elements.length >= 3){//yup its forsure html string
			//create div & docfrag, append div to docfrag, then set its div's innerHTML to the string, then get first child
			var divElm = d.createElement('div');
			divElm.className = 'hippo-doc-frag-wrapper';
			var docFrag = d.createDocumentFragment();
			docFrag.appendChild(divElm);
			var queryDiv = docFrag.querySelector('div');
			queryDiv.innerHTML = elements;
			var numberOfChildren = queryDiv.children.length;
			//loop over nodelist and fill object, needs to be done because a string of html can be passed with siblings
			for (var z = 0; z < numberOfChildren; z++) {
				this[z] = queryDiv.children[z];
			}
			//give the object a length value
			this.length = numberOfChildren;
			//return object
			return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
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
		nodes = elements; //so... is already something that can be looped with for loop
	}else{//if its a string create a nodelist, use context if provided
		if(typeof context === 'string' && d.querySelectorAll(context)[0] === undefined){//bad context return nothing
			nodes = []; //no context
		}else{//its a string selector, create a context first, then run query again, or use current document
			nodes = (typeof context === 'string' ? d.querySelectorAll(context)[0] : d).querySelectorAll(elements);
		}
	}
	//loop over array or nodelist created above and fill hippo object
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	//give the hippo object a length value
	this.length = nodes.length;

	//return hippo object
	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

//expose hippo to global scope and create $ shortcut
rootObject.hippo = hippo;
if(!('$' in rootObject)){
	rootObject.$ = hippo;
}


//setup prototype shortcut and setup constructor reference
hippo.fn = CreateHippoObject.prototype = {
    constructor:hippo
};