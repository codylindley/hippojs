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
	equal(hippoLi[0].className,'firstLi','make sure its the right li');
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

test('invoke hippo(Selector,Element Node)',function(){
	var hippoObj = hippo('li',document.body);
	ok(hippoObj, 'No problem passing node reference');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(Selector,Document)',function(){
	var hippoObj = hippo('li',document);
	ok(hippoObj, 'No problem passing node reference');
	equal(hippoObj[0].nodeType,1,'Its an ELEMENT_NODE');
});

//only works, locally if ran from server, or on safari, opera, firefox
asyncTest('invoke hippo(Selector,window.frames[0].document)',function(){
	setTimeout(function(){
		var hippoObj = hippo('body',window.frames[0].document);
		ok(hippoObj, 'No problem passing node reference');
		start();
	}, 1000);
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

test('hippo.each(Object||Array,Function)', function(){

	hippo.each( [0,1,2],function(i, n){
		equal( i, n, 'Check array iteration' );
	});

	hippo.each( { name: 'name', lang: 'lang' },function(i, n){
		equal( i, n, 'Check object iteration' );
	});

});

module('miscellaneous.js');

test('hippo().filter(selector||Function)', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.filter('.firstLi').length,'1','get only li with .firstLi class using selector');
	equal(hippoLi.filter(function(){return hippo(this).hasClass('firstLi');}).length,'1','get only li with .firstLi class using function');
});

test('hippo().find(selector)', function(){
	var hippoLi = hippo('ul').find('.firstLi');
	equal(hippoLi[0].className,'firstLi','get only li with .firstLi class using selector');
});

test('hippo().total()', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.total(),3,'total li\'s in fixture, should be 3');
});

test('hippo().toArray()', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	ok(hippo.type(hippoLi.toArray()) === 'array','convert hippo object to array');
});

test('hippo().get()', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.get().nodeType,1,'get first node by default with not params passed');
	ok(hippoLi.get(0),'get first node in hippo object');
	ok(hippoLi.get(1),'get second node in hippo object');
	ok(hippoLi.get(2),'get third node in hippo object');
});

test('hippo().clone()', function(){
	var hippoLiCloned = hippo('#qunit-fixture').clone();
	var hippoLiClonedTrue = hippo('#qunit-fixture ul').clone(true);
	equal(hippoLiCloned.total(),1,'only clones one element node');
	equal(hippoLiClonedTrue.get(0).children.length,3,'clones selected node and all its children');
});

module('class.js');

test('hippo().addClass()',function(){
	hippo('li').addClass('testClass');
	equal(hippo('li').hasClass('testClass'),true,'add a class');
});

test('hippo().removeClass()',function(){
	hippo('li').addClass('testClass');
	hippo('li').removeClass('testClass');
	equal(hippo('li').hasClass('testClass'),false,'remove a class');
});

test('hippo().hasClass()',function(){
	hippo('li').addClass('testClass');
	equal(hippo('li').hasClass('testClass'),true,'verify it has a class');
});

test('hippo().toggleClass()',function(){
	hippo('li').addClass('testClass');
	equal(hippo('li').toggleClass('testClass').hasClass('testClass'),false,'toggle class, remove it');
	equal(hippo('li').toggleClass('testClass').hasClass('testClass'),true,'togglle class, add it');
});

module('attributes.js');

test('hippo().setAttr()',function(){
	hippo('li').setAttr('inert','inert');
	hippo('li').setAttr({'foo':'bar'});
	equal(hippo('li').getAttr('inert'),'inert','add a attr');
	equal(hippo('li').getAttr('foo'),'bar','add a {attr:value}');
	hippo('li').removeAttr('doo ioo foo');
});

test('hippo().removeAttr()',function(){
	hippo('li').setAttr({'foo':'bar','doo':'noo','ioo':'koo'});
	hippo('li').removeAttr('foo');
	hippo('li').removeAttr('doo ioo');
	equal(hippo('li').getAttr('foo'),undefined,'remove single attr');
	equal(hippo('li').getAttr('ioo'),undefined,'remove more than one');
	equal(hippo('li').getAttr('doo'),undefined,'remove more than one');
});

test('hippo().getAttr()',function(){
	hippo('li').setAttr({'foo':'bar','doo':'noo','ioo':'koo'});
	equal(hippo('li').getAttr('foo'),'bar','get a attr');
	equal(typeof hippo('li').getAttr().length,'number','get all attributes in array');
	hippo('li').removeAttr('doo ioo foo');
});

test('hippo().hasAttr()',function(){
	hippo('li').setAttr('inert','inert');
	equal(hippo('li').hasAttr('inert'),true,'has a attr');
	hippo('li').removeAttr('inert');
});

