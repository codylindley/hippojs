module('core.js');

test('invoke hippo() with no parameter',function(){
	equal(hippo.type(hippo()),'object','hippo() returns an object');
	equal(hippo()[0].tagName.toLowerCase(),'html','defaults to HTML element');
});

test('invoke hippo(\'li\') with selector string',function(){
	var hippoLi = hippo('li');
	ok(hippoLi, 'No problem passing a string selector');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(\'li\',\'#qunit-fixture\') with selector string & string selector context',function(){
	var hippoLi = hippo('li','#qunit-fixture');
	ok(hippoLi, 'No problem passing a string selector & string selector context');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(\'<ul><li></li></ul>\') with HTML string',function(){
	var hippoLi = hippo('<ul><li></li></ul>');
	ok(hippoLi, 'No problem passing html string selector');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo([node,node]) with array of node references',function(){
	var hippoObj = hippo([document.body,document.documentElement,document.head]);
	ok(hippoObj, 'No problem passing array of node references');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(NodeList)',function(){
	var hippoObj = hippo(document.body.children);
	ok(hippoObj, 'No problem passing NodeList');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(HTMLCollection || HTMLAllCollection)',function(){
	var hippoObj = hippo(document.all);
	ok(hippoObj, 'No problem passing HTMLCollection or HTMLAllCollection');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(Node)',function(){
	var hippoObj = hippo(document.body);
	ok(hippoObj, 'No problem passing node reference');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

module('helpers.js');

test('hippo.type returns accurate types',function(){
	equal(hippo.type({}),'object','hippo.type({}) returns an \'object\'');
	equal(hippo.type([]),'array','hippo.type({}) returns an \'array\'');
	equal(hippo.type(''),'string','hippo.type(\'\') returns an \'string\'');
	equal(hippo.type(2),'number','hippo.type(2) returns an \'number\'');
	equal(hippo.type(null),'null','hippo.type(null) returns \'an object\'');
	equal(hippo.type(undefined),'undefined','hippo(.typeundefined) returns an \'undefined\'');
	equal(hippo.type(NaN),'NaN','hippo.type(NaN) returns an \'NaN\'');
});

test('hippo.isArray() returns accurate boolean',function(){
	equal(hippo.isArray({}),false,'hippo.isArray({}) returns an false');
	equal(hippo.isArray([]),true,'hippo.isArray([]) returns an true');
});

test('hippo.isFunction() returns accurate boolean',function(){
	equal(hippo.isFunction(function(){}),true,'hippo.isFunction(function(){}) returns an true');
	equal(hippo.isFunction([]),false,'hippo.isFunction([]) returns an false');
});

test('hippo.version returns string',function(){
	equal(typeof hippo.version,'string','hippo.version returns string');
});

module('class.js');

test('hippo().addClass',function(){
	hippo('li').addClass('testClass');
	equal(hippo('li').hasClass('testClass'),true,'');
});
