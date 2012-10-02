module('attributes.js');

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
	equal(typeof hippoLi.getAttr().length,'number','get all attributes in array');
	hippoLi.removeAttr('doo ioo foo');
});

test('hippo().hasAttr()',function(){
	var hippoLi = hippo('<li></li>');
	hippoLi.setAttr('inert','inert');
	equal(hippoLi.hasAttr('inert'),true,'has a attr');
	hippoLi.removeAttr('inert');
});