module('manipulation.js');

//before()
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

//insertBefore()
test('hippo.insertBefore(selector)',function(){
	hippo('<li class="testInsertBefore"><li>').insertBefore('.firstLi');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testInsertBefore');
});

test('hippo.insertBefore(html)',function(){
	var hippoHTML = hippo('<li class=""></li>').insertBefore('<li class="testInsertBefore"><li>');
	equal(hippoHTML.total(),2);
	equal(hippoHTML.get(0).className,'testInsertBefore');
});

//before()
test('hippo.after(htmlstring)',function(){
	hippo('li:first-child','#qunit-fixture').after('<li class="testAfter"><li>');
	equal(hippo('li','#qunit-fixture').get(1).className,'testAfter');
});

test('hippo.after(Node)',function(){
	var testHTML = hippo('<li class="testAfter"><li>').get();
	hippo('li:first-child','#qunit-fixture').after(testHTML);
	equal(hippo('li','#qunit-fixture').get(1).className,'testAfter');
});

test('hippo.after(selector)',function(){
	hippo('li:first-child','#qunit-fixture').after('.lastLi');
	equal(hippo('li','#qunit-fixture')[1].className,'lastLi');
});

//insertAfter()
test('hippo.insertAfter(selector)',function(){
	hippo('<li class="testInsertAfter"><li>').insertAfter('.firstLi');
	equal(hippo('li:first-child','#qunit-fixture').get(1).className,'testInsertAfter');
});

test('hippo.insertAfter(html)',function(){
	var hippoHTML = hippo('<li class=""></li>').insertAfter('<li class="testInsertAfter"><li>');
	equal(hippoHTML.total(),2);
	equal(hippoHTML.get(1).className,'testInsertAfter');
});
