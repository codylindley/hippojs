module('core-methods.js');

test('hippo().is(selector)', function(){
	var hippoLi = hippo('li','#qunit-fixture').first();
	equal(hippoLi.is('.firstLi'),true);
});

test('hippo().has(selector)', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.has('.firstLi'),true);
});

test('hippo().slice()', function(){
	var hippoLi = hippo('li','#qunit-fixture').slice(0,1);
	equal(hippoLi.total(),1);
	equal(hippoLi.hasClass('firstLi'),true);
});

test('hippo().index()', function(){
	equal(hippo('li','#qunit-fixture').index('.firstLi'),0);
	equal(hippo('li','#qunit-fixture').index('.lastLi'),2);
	equal(hippo('li','#qunit-fixture').index('middle'),-1);
	equal(hippo('li','#qunit-fixture').index($('.lastLi')[0]),2);
});

test('hippo().index()', function(){
	equal(hippo('li.firstLi','#qunit-fixture').siblingIndex(),0);
	equal(hippo('li.lastLi','#qunit-fixture').siblingIndex(),2);
	equal(hippo('li.nothing','#qunit-fixture').siblingIndex(),-1);
});

test('hippo().isEmpty()', function(){
	equal(hippo('<li></li>').isEmpty(),true);
	equal(hippo('<li></li><li></li><li>test</li>').isEmpty(),false);
	equal(hippo('<li><strong>test</strong></li>').isEmpty(),false);
	equal(hippo('<li>test</li>').isEmpty(),false);
	equal(hippo('<li>  </li>').isEmpty(),true);
});

test('hippo().eq()', function(){
	var hippoLi = hippo('li','#qunit-fixture').eq(0);
	equal(hippoLi.total(),1);
	equal(hippoLi.hasClass('firstLi'),true);
});

test('hippo().children()', function(){
	var hippoLi = hippo('ul','#qunit-fixture').children();
	equal(hippoLi.total(),3);
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

test('hippo().last()', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.last().hasClass('lastLi'),true);
});

test('hippo().first()', function(){
	var hippoLi = hippo('li','#qunit-fixture');
	equal(hippoLi.first().hasClass('firstLi'),true);
});