module('core-methods.js');

test('hippo().matchesSelector(selector)', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.matchesSelector('.firstLi'),true,'is the first element in the set have class .firstLi');
});

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

test('hippo().add()', function(){
	var hippoLi = hippo('li.firstLi','#qunit-fixture').add('.lastLi');
	equal(hippoLi.total(),2,'only clones one element node');

	var hippoHTML = hippo('<li></li>').add('<li><li>');
	equal(hippoHTML.total(),2,'only clones one element node');
});