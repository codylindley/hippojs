/*global hippo:true */
/**
utilities for hippo.js

@module helpers.js
**/

/**
hippo. e.g. hippo.version

@class hippo.
@static
**/

/**
Returns the version of hippo

@property version
@for hippo.
@static
@type String
@return {string}
**/
hippo.version = '0.1';

/**
loop over an object or array

@method each
@static
@for hippo.
@param Object|Array {Object|Array}
	An Array or Object to iterate over
@param callback {Function}
	A callback Function
@return returns the Object or Array passed in
**/
hippo.each = function(objectOrArray, callback){
	var name,
	i = 0,
	length = objectOrArray.length;

	if (length === undefined){//is {} with no length property
		for (name in objectOrArray){
			if (callback.call(objectOrArray[name], name, objectOrArray[name]) === false){
				break;
			}
		}
	}else{//is {} or [] with a length
		for (; i < length;){
			if (callback.call(objectOrArray[i], i, objectOrArray[i++]) === false ){
				break;
			}
		}
	}

	return objectOrArray;
};

/**
return JavaScript datatype as string e.g. 'string'|'number'|'null'|'undefined'|'object'|'array'

@method type
@static
@for hippo.
@param value {Object}
  Any JavaScript value
@return 'string'|'number'|'null'|'undefined'|'object'|'array'
**/
hippo.type = function(value){
	if(value === null) { return 'null'; }
	if(value === undefined) { return 'undefined'; }
	var ret = Object.prototype.toString.call(value).match(/^\[object\s+(.*?)\]$/)[1];
	ret = ret? ret.toLowerCase() : '';
	if(ret == 'number' && isNaN(value)) {
		return 'NaN';
	}
	return ret;
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method isArray
@static
@for hippo.
@param value {Object}
  Any JavaScript value
@return {Boolean}
**/
hippo.isArray = Array.isArray || function(arrayReference){
	return hippo.type(arrayReference) === "array";
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method isFunction
@static
@for hippo.
@param JavasScript value
@return {Boolean}
**/
hippo.isFunction = function(funcReference){
	return hippo.type(funcReference) === "function";
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method matchesSelector
@static
@for hippo.
@param element {Node}
@param selector {String}
@return {Boolean}
**/
hippo.matchesSelector = function(node,selector){
	var d = doc.body;
	return (doc.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.oMatchesSelector||d.msMatchesSelector).call(node,selector);
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method collectElements
@static
@for hippo.
@param element {Node}
@param property {String}
@return {Array}
**/
hippo.collectElements = function(element,property,selector){
	var list = [];
	while((element = element[property])){
		if(element.nodeType === rootObject.Node.ELEMENT_NODE){
			list.push(element);
			//if the last selector matches then return list early
			if(selector && hippo.matchesSelector(element,selector)){return list;}
		}
	}
	return list;
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method uniqElements
@static
@for hippo.
@param array {Array}}
@return {Array}
**/
hippo.uniqElements = function(results){
	var hasDuplicate;
	var elem;
	var i = 1;
	var sortOrder = function(a, b){
		if (a === b){
			hasDuplicate = true;
			return 0;
		}
		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	};

	results.sort(sortOrder);

	for ( ; (elem = results[i]); i++ ) {
		if ( elem === results[ i - 1 ] ) {
			results.splice( i--, 1 );
		}
	}
	return results;
};

/**
return true if the array passed in is constructed from the Array() Constructor

@method camelCaseDashs
@static
@for hippo.
@param {String}
@return {String}
**/
hippo.camelCaseDashs = function(string){
	return string.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi, function(all,letter){return(letter + '').toUpperCase();});
};



