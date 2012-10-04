module('core.js');

test('invoke hippo() with no parameter',function(){
	equal(hippo.type(hippo()),'object','hippo() returns an object');
	equal(hippo()[0].tagName.toLowerCase(),'html','defaults to HTML element');
});

test('invoke hippo(\'li\') with selector string',function(){
	var hippoLi = hippo('<li></li>');
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

test('invoke hippo(\'<li></li><li></li>\') with HTML string',function(){
	var hippoLi = hippo('<li></li><li></li>');
	ok(hippoLi, 'No problem passing html string selector');
	equal(hippoLi.total(),2,'contains two elements now');
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

test('invoke hippo(hippo())',function(){
	var hippoLi = hippo(hippo('li.firstLi','#qunit-fixture'));
	ok(hippoLi, 'No problem passing node reference');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
	equal(hippoLi.is('.firstLi'),true);
	equal(hippoLi.total('.firstLi'),1);
});

//only works, locally if ran from server, or on safari, opera, firefox
asyncTest('invoke hippo(Selector,window.frames[0].document)',function(){
	setTimeout(function(){
		var hippoObj = hippo('body',window.frames[0].document);
		ok(hippoObj, 'No problem passing node reference');
		start();
	}, 1000);
});