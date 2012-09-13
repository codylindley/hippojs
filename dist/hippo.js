/*! hippo - v1.0 - 2012-09-13
* http://hippojs.com
* Copyright (c) 2012 Cody Lindley; Licensed MIT */

(function(){

//core.js
//store reference to global context
var global = this;

//hippo func
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

//hippo version
hippo.version = '1.0';

if(typeof exports !== 'undefined'){//export for use on server i.e. node
	exports.hippo = hippo;
}else{//else assume browser
	global.hippo = hippo;
	if(!('$' in global)){
		global.$ = hippo;
	}
}

//prototype
hippo.fn = createHippoObject.prototype = {
    constructor:hippo
};

//utiliteis.js
hippo.each = function(object, callback){
	var name, i = 0, length = object.length;

	for (; i < length;){
		if (callback.call(object[i], i, object[i++]) === false){
			break;
		}
	}

	return object;
};

//looping.js
hippo.fn.each = function(callback){
    return hippo.each(this, callback);
};

//class.js
hippo.fn.addClass = function(classString){
	this.each(function(){
		this.classList.add(classString);
	});
	return this;
};

//outro.js
}.call(this)); //call anynoumous function, set this value, for function to global scope