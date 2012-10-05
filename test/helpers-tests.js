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

test('hippo.matchesSelector(node,selector)',function(){
	equal(hippo.matchesSelector(document.body,'body'),true);
	equal(hippo.matchesSelector(document.body,'li'),false);
});

test('hippo.each(Object||Array,Function)', function(){

	hippo.each( [0,1,2],function(i, n){
		equal( i, n, 'Check array iteration' );
	});

	hippo.each( { name: 'name', lang: 'lang' },function(i, n){
		equal( i, n, 'Check object iteration' );
	});

});