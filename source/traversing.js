
/**
contains methods for operating on elements

@module traversing.js
**/

/**
clone element nodes in hippo object
 
@method ancestors()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.ancestors = function(){
	var elms = doc.getElementsByTagName('*');
	var list = [];
	this.each(function(name,value){
		var stop = value.parentNode;
		hippo.each(elms,function(name,value){
			if(value !== stop){
				list.push(value);
			}else if(value === stop){
				if(value === document.documentElement){list.push(document.documentElement);}
				return false;
			}
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
clone element nodes in hippo object
 
@method descendants()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.descendants = function(){
	var list = [];
	this.each(function(name,value){
		hippo.each(value.getElementsByTagName("*"),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
clone element nodes in hippo object
 
@method parents()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.parents = function(){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'parentNode'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
clone element nodes in hippo object
 
@method nextSibs()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.nextSibs = function(){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'nextElementSibling'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
clone element nodes in hippo object
 
@method prevSibs()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.prevSibs = function(){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'previousElementSibling'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
clone element nodes in hippo object
 
@method siblings()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.siblings = function(){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'previousElementSibling'),function(name,value){
			list.push(value);
		});
		hippo.each(hippo.collectElements(value,'nextElementSibling'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
return all first child elements or last child elements
 
@method childs()
@param {String} [first] passing the string 'first' or 'last' to get the first or last child nodes
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.childs = function(firstOrLast){
	var list = [];
	var nodeProp = firstOrLast ? (firstOrLast === 'first' ? 'firstElementChild' : 'lastElementChild') : 'firstElementChild';
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,nodeProp),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
reduce set to the children elements of each element in the set 

@method children
@for hippo()
@chainable
@returns {Object} hippo() object
**/
hippo.fn.children = function(){
	var set = [];
	this.each(function(name,value){
		hippo(this.children).each(function(name,value){
			set.push(value);
		});
	});
	return hippo(set);
};
