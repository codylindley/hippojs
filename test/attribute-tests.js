module('attributes.js');

test('hippo().getData()',function(){
	var html = hippo('<p data-foo="foo" data-bar="bar"></p>');
	equal(html.getData('foo'),'foo');
	equal(html.getData().dataFoo,'foo');
});

test('hippo().hasData()',function(){
	var html = hippo('<p data-foo="foo" data-bar="bar"></p>');
	equal(html.hasData('foo'),true);
});

test('hippo().setData()',function(){
	var html = hippo('<p></p>').setData('foo').setData({'bar':'bar'});
	equal(html.hasData('foo'),true);
	equal(html.hasData('bar'),true);
});

test('hippo().removeData(string)',function(){
	var html = hippo('<p data-foo="foo" data-bar="bar"></p>');
	equal(html.removeData('foo').hasData('foo'),false);
	equal(html.removeData('bar').hasData('bar'),false);
});

test('hippo().removeData("string string")',function(){
	var html = hippo('<p data-foo="foo" data-bar="bar"></p>');
	equal(html.removeData('foo bar').hasData('foo'),false);
	equal(html.hasData('bar'),false);
});

test('hippo().addClass()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.addClass('testClass');
	equal(hippoLi.hasClass('testClass'),true,'add a class');
});

test('hippo().removeClass()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.addClass('testClass');
	hippoLi.removeClass('testClass');
	equal(hippoLi.hasClass('testClass'),false,'remove a class');
});

test('hippo().hasClass()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.addClass('testClass');
	equal(hippoLi.hasClass('testClass'),true,'verify it has a class');
});

test('hippo().toggleClass()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.addClass('testClass');
	equal(hippoLi.toggleClass('testClass').hasClass('testClass'),false,'toggle class, remove it');
	equal(hippoLi.toggleClass('testClass').hasClass('testClass'),true,'togglle class, add it');
});

test('hippo().setAttr()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.setAttr('inert','inert');
	hippoLi.setAttr({'foo':'bar'});
	equal(hippoLi.getAttr('inert'),'inert','add a attr');
	equal(hippoLi.getAttr('foo'),'bar','add a {attr:value}');
	hippoLi.removeAttr('doo ioo foo');
});

test('hippo().removeAttr()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.setAttr({'foo':'bar','doo':'noo','ioo':'koo'});
	hippoLi.removeAttr('foo');
	hippoLi.removeAttr('doo ioo');
	equal(hippoLi.getAttr('foo'),undefined,'remove single attr');
	equal(hippoLi.getAttr('ioo'),undefined,'remove more than one');
	equal(hippoLi.getAttr('doo'),undefined,'remove more than one');
});

test('hippo().getAttr()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.setAttr({'foo':'bar','doo':'noo','ioo':'koo'});
	equal(hippoLi.getAttr('foo'),'bar','get a attr');
	equal(hippoLi.getAttr().foo,'bar','get all attributes in object');
	hippoLi.removeAttr('doo ioo foo');
});

test('hippo().hasAttr()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.setAttr('inert','inert');
	equal(hippoLi.hasAttr('inert'),true,'has a attr');
	hippoLi.removeAttr('inert');
});