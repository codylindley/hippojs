
/**
* core.js
*
* @module core.js
**/

var global = this;

/**
* hippo function
*
* @class hippo
* @constructor
*/
var hippo = function(selector) {
	return new createHippoObject(selector);
};

var createHippoObject = function(selector) {
	var nodes = document.querySelectorAll(selector);
	for (var i = 0; i < nodes.length; i++) {
		this[i] = nodes[i];
	}
	this.length = nodes.length;
	return this;
};

/**
* hippo.js version
* @property version
* @for hippo
* @static
* @type String
*/
hippo.version = '1.0';

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