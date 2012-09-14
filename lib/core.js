
/**
* core.js
*
* @module core.js
*/

var global = this;

/**
`hippo('li')`  
`hippo(document.getElementById('#foo'))`  
`hippo('<div></div>')`  
@class hippo
@constructor
@param Selector|HTML {String|String}
  A string containing a selector expression | A string containing HTML
@param [Context='html'] {String}
  A string containing a selector expression
@return {Object} {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
**/
var hippo = function(configParam,context){
	return new createHippoObject(configParam,context);
};

var createHippoObject = function(configParam,context){

	//if no configParam
	if(!configParam){
		return this;
	}

	//ok, expect at the very least a configParam string
	var nodes = (document.querySelectorAll(context)[0] || document).querySelectorAll(configParam);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;

	return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
};

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