module('manipulation.js');

test('hippo.before(htmlstring)',function(){
	hippo('li:first-child','#qunit-fixture').before('<li class="testBefore"><li>');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testBefore');
});

test('hippo.before(Node)',function(){
	var testHTML = hippo('<li class="testBeforeNode"><li>').get();
	hippo('li:first-child','#qunit-fixture').before(testHTML);
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testBeforeNode');
});

test('hippo.before(selector)',function(){
	hippo('li:first-child','#qunit-fixture').before('.lastLi');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'lastLi');
});

test('hippo.insertBefore(selector)',function(){
	hippo('<li class="testInsertBefore"><li>').insertBefore('.firstLi');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testInsertBefore');
});

test('hippo.insertBefore(html)',function(){
	equal(hippo('<li class=""><li>').insertBefore('<li class="testInsertBefore"><li>').total(),2);
});
