
/**
contains methods for operating on elements

@module traversing.js
**/

/**
get all ancestors elements filter by selector
 
@method ancestors()
@for hippo()
@param {String} selector
@optional
@returns {Object} hippo() object
**/
hippo.fn.ancestors = function(selector){
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

	//remove any duplicate elements, reverse list so closes ancestor is first, fitler if needed
	return hippo(this.length === 1 ? list.reverse() : hippo.uniqElements(list.reverse())).filter(selector);
};

/**
get all ancestors element, until selector
 
@method ancestorsUntil()
@for hippo()
@param {String} selector
@returns {Object} hippo() object
**/
hippo.fn.ancestorsUntil = function(selector){
	var elms = doc.querySelector(selector).getElementsByTagName('*');
	var list = [];

	this.each(function(name,value){
		var stop = value.parentNode;
		hippo.each(elms,function(name,value){
			if(value !== stop){
				list.push(value);
			}else if(value === stop){
				list.push(value.parentNode);
				list.push(stop);
				if(value === document.documentElement){list.push(document.documentElement);}
				return false;
			}
		});
	});

	console.log(elms);
	return hippo(this.length === 1 ? list.reverse() : hippo.uniqElements(list.reverse()));
};

/**
get all descendant elements
 
@method descendants()
@for hippo()
@param {String} selector
@optional
@returns {Object} hippo() object
**/
hippo.fn.descendants = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(value.getElementsByTagName("*"),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list)).filter(selector);
};

/**
get all descendant elements, until selector
 
@method descendantsUntil()
@for hippo()
@param {String} selector
@optional
@returns {Object} hippo() object
**/
hippo.fn.descendantsUntil = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(value.getElementsByTagName("*"),function(name,value){
			list.push(value);
			if(hippo.matchesSelector(value,selector)){return false;}
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
get all parent elements, filter by selector
 
@method parents()
@for hippo()
@param {String} selector
@optional
@returns {Object} hippo() object
**/
hippo.fn.parents = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'parentNode'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list)).filter(selector);
};

/**
get parent element
 
@method parent()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.parent = function(){
	var list = [];
	this.each(function(name,value){
			list.push(this.parentNode);
	});
	return hippo(list);
};

/**
get parent elements for each element in the set, until selector
 
@method parentsUntil()
@for hippo()
@param {String} selector
@optional
@returns {Object} hippo() object
**/
hippo.fn.parentsUntil = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'parentNode',selector),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
get next sibling
 
@method nextSib()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.nextSib = function(){
	var list = [];
	this.each(function(name,value){
			list.push(this.nextElementSibling);
	});
	return hippo(list);
};

/**
get next sibling, filter by selector
 
@method nextSibs()
@param {String} selector
@optional
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.nextSibs = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'nextElementSibling'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list)).filter(selector);
};

/**
get next siblings until the selector
 
@method nextSibsUntil()
@param {String} selector
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.nextSibsUntil = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'nextElementSibling',selector),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
get previous sibling
 
@method prevSib()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.prevSib = function(){
	var list = [];
	this.each(function(name,value){
			list.push(this.previousElementSibling);
	});
	return hippo(list);
};

/**
get previous sibling, filter by selector
 
@method prevSibs()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.prevSibs = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'previousElementSibling'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list)).filter(selector);
};

/**
get previous siblings until the selector
 
@method prevSibsUntil()
@param {String} selector
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.prevSibsUntil = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'previousElementSibling',selector),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
get all siblings
 
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
get child element for each element in the set
 
@method child()
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.child = function(){
	var list = [];
	this.each(function(name,value){
			list.push(this.firstElementChild);
	});
	return hippo(list);
};

/**
return all first child elements or last child elements
 
@method childs()
@param {String} selector
@optional
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.childs = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'firstElementChild'),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list)).filter(selector);
};

/**
get child element for each element in the set, until selector
 
@method childsUntil()
@param {String} selector
@for hippo()
@returns {Object} hippo() object
**/
hippo.fn.childsUntil = function(selector){
	var list = [];
	this.each(function(name,value){
		hippo.each(hippo.collectElements(value,'firstElementChild',selector),function(name,value){
			list.push(value);
		});
	});
	return hippo(this.length === 1 ? list : hippo.uniqElements(list));
};

/**
get children elements of each element in the set, fitler by selector 

@method children
@for hippo()
@param {String} selector
@chainable
@returns {Object} hippo() object
**/
hippo.fn.children = function(selector){
	var set = [];
	this.each(function(name,value){
		hippo(this.children).each(function(name,value){
			set.push(value);
		});
	});
	return hippo(set).filter(selector);
};

/**
get the children elements of each element in the set, until selector

@method childrenUntil
@for hippo()
@chainable
@returns {Object} hippo() object
**/
hippo.fn.childrenUntil = function(selector){
	var set = [];
	this.each(function(name,value){
		hippo(this.children).each(function(name,value){
			set.push(value);
			if(hippo.matchesSelector(value,selector)){return false;}
		});
	});
	return hippo(set);
};
