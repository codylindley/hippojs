
/**
* core.js
*
* @module core.js
*/

var rootObject = this;
var doc = rootObject.document;

/**
`hippo('li')` //Selector  
`hippo('li','ul')` //Selector & Selector context  
`hippo('li',document.body)` //Selector & Element context   
`hippo('<div></div>')` //HTML  
`hippo('<div></div>','window.frames[0].document')` //HTML & Document context  
`hippo(document.body)` //Element  
`hippo([document.body,document.head])` //Array  
`hippo(document.body.children)` //NodeList  
`hippo(document.all)` //HTMLCollection  
@class hippo
@constructor
@param selector|HTML {String|String}
  A string containing a selector expression or a string containing HTML
@param selector|Element|Document {String||Node}
  A string selector or node (Element or Document), defaults to current html element
@return {Object} hippo() object e.g. `{0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}`
**/

//return a new hippo object containing the node elements descibed by the elements parameter
var hippo = function(elements,context){
	return new CreateHippoObject(elements,context); //construct object
};

var CreateHippoObject = function(elements,context){

	//take care of context, could be a selector, an element, this document, or iframe document
	var d;
	if(context && context.nodeType){
		if(context.nodeType === 1){//its an element context
			d = context.ownerDocument;
		}else{//its a document (could be this document or iframe)
			d = context.body.ownerDocument;
		}
	}else{//its a selector
		d = doc;//point at scoped document i.e. var doc = document in next scope up
	}

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
			var divElm = d.createElement('div');
			var docFrag = d.createDocumentFragment();
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
		//if its a string selector create a context first, then run query again, or use current document
		nodes = (typeof context === 'string' ? d.querySelectorAll(context)[0] : d).querySelectorAll(elements);
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