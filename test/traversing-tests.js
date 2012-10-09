module('traversing.js');

test('hippo().child()', function(){
	equal(hippo('#qunit-fixture').child().is('ul'),true);
});

test('hippo().childs()', function(){
	equal(hippo('#qunit-fixture').childs().total(),2);
	equal(hippo('#qunit-fixture').childs().last().hasClass('firstLi'),true);
});

test('hippo().childs("last")', function(){
	equal(hippo('#qunit-fixture').childs('last').total(),1);
	equal(hippo('#qunit-fixture').childs('last').last().is('iframe'),true);
});

test('hippo().ancestors()', function(){
	equal(hippo('body').ancestors().total(),1);
});

test('hippo().descendants()', function(){
	equal(hippo('#qunit-fixture ul').descendants().total(),3);
	equal(hippo('#qunit-fixture ul,#qunit-fixture').descendants().total(),5);
});

test('hippo().nextSibs()', function(){
	equal(hippo('li','#qunit-fixture').first().nextSibs().total(),2);
});

test('hippo().siblings()', function(){
	equal(hippo('li','#qunit-fixture').first().siblings().total(),2);
});

test('hippo().prevSibs()', function(){
	equal(hippo('li','#qunit-fixture').last().prevSibs().total(),2);
});

test('hippo().parent()', function(){
	equal(hippo('.firstLi').parent().is('ul'),true);
});

test('hippo().parents()', function(){
	equal(hippo('.firstLi').parents().total(),4);
});

test('hippo().parentsUntil()', function(){
	equal(hippo('li.firstLi').parentsUntil('#qunit-fixture').total(),2);
});

test('hippo().children()', function(){
	var hippoLi = hippo('ul','#qunit-fixture').children();
	equal(hippoLi.total(),3);
});