module('manipulation.js');

//replaceWith(textnode)
test('hippo.replaceWith()',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').replaceWith('test');
	equal(fixture.text(),'test');
});

test('hippo.replaceWith(String)',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').replaceWith('<i>test</i>');
	equal(fixture[0].firstElementChild.tagName,'I');
});

test('hippo.replaceWith(Node)',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').replaceWith(hippo('<p>test</p>')[0]);
	equal(fixture[0].firstElementChild.tagName,'P');
});

test('hippo.replaceWith(Selector)',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').replaceWith('.firstLi');
	equal(fixture[0].firstElementChild.tagName,'LI');
});

test('hippo.replaceWith(hippo())',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').replaceWith(hippo('.firstLi'));
	equal(fixture[0].firstElementChild.tagName,'LI');
});

//remove()

test('hippo.remove()',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').remove();
	equal(fixture.find('ul').total(),0);
});

//empty()

test('hippo.empty()',function(){
	var fixture = hippo('#qunit-fixture');
	hippo('#qunit-fixture ul').empty();
	equal(fixture.find('li').total(),0);
});


//before()
test('hippo.before(htmlstring)',function(){
	hippo('li:first-child','#qunit-fixture').before('<li class="testBefore"></li>');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testBefore');
});

test('hippo.before(Node)',function(){
	var testHTML = hippo('<li class="testBeforeNode"></li>').get();
	hippo('li:first-child','#qunit-fixture').before(testHTML);
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testBeforeNode');
});

test('hippo.before(selector)',function(){
	hippo('li:first-child','#qunit-fixture').before('.lastLi');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'lastLi');
});

//insertBefore()
test('hippo.insertBefore(selector)',function(){
	hippo('<li class="testInsertBefore"></li>').insertBefore('.firstLi');
	equal(hippo('li:first-child','#qunit-fixture')[0].className,'testInsertBefore');
});

test('hippo.insertBefore(html)',function(){
	var hippoHTML = hippo('<li class=""></li>').insertBefore('<li class="testInsertBefore"><li>');
	equal(hippoHTML.total(),2);
	equal(hippoHTML.get(0).className,'testInsertBefore');
});

//before()
test('hippo.after(htmlstring)',function(){
	hippo('li:first-child','#qunit-fixture').after('<li class="testAfter"></li>');
	equal(hippo('li','#qunit-fixture').get(1).className,'testAfter');
});

test('hippo.after(Node)',function(){
	var testHTML = hippo('<li class="testAfter"></li>').get();
	hippo('li:first-child','#qunit-fixture').after(testHTML);
	equal(hippo('li','#qunit-fixture').get(1).className,'testAfter');
});

test('hippo.after(selector)',function(){
	hippo('li:first-child','#qunit-fixture').after('.lastLi');
	equal(hippo('li','#qunit-fixture')[1].className,'lastLi');
});

//insertAfter()
test('hippo.insertAfter(selector)',function(){
	hippo('<li class="testInsertAfter"></li>').insertAfter('.firstLi');
	equal(hippo('li','#qunit-fixture').get(1).className,'testInsertAfter');
});

test('hippo.insertAfter(html)',function(){
	var hippoHTML = hippo('<li class=""></li>').insertAfter('<li class="testInsertAfter"><li>');
	equal(hippoHTML.total(),2);
	equal(hippoHTML.get(1).className,'testInsertAfter');
});

//append()
test('hippo.append(htmlstring)',function(){
	hippo('ul','#qunit-fixture').append('<li class="test">test</li>');
	equal(hippo('li','#qunit-fixture').last().hasClass('test'),true);
});

test('hippo.append(textstring)',function(){
	hippo('li:first-child','#qunit-fixture').append('test');
	equal(hippo('li','#qunit-fixture').first().text(),'1test');
});

test('hippo.append(element node)',function(){
	hippo('ul','#qunit-fixture').append(hippo('<li>test</li>')[0]);
	equal(hippo('li','#qunit-fixture').last().text(),'test');
});

//appendTo()
test('hippo.appendTo(selector)',function(){
	hippo('<li>test</li>').appendTo('#qunit-fixture ul');
	equal(hippo('li','#qunit-fixture').last().text(),'test');
});

//prepend()
test('hippo.prepend(htmlstring)',function(){
	hippo('ul','#qunit-fixture').prepend('<li class="test">test</li>');
	equal(hippo('li','#qunit-fixture').first().hasClass('test'),true);
});

test('hippo.prepend(textstring)',function(){
	hippo('li:first-child','#qunit-fixture').prepend('test');
	equal(hippo('li','#qunit-fixture').first().text(),'test1');
});

test('hippo.prepend(element node)',function(){
	hippo('ul','#qunit-fixture').prepend(hippo('<li>test</li>')[0]);
	equal(hippo('li','#qunit-fixture').first().text(),'test');
});

//prependTo()
test('hippo.prependTo(selector)',function(){
	hippo('<li>test</li>').prependTo('#qunit-fixture ul');
	equal(hippo('li','#qunit-fixture').first().text(),'test');
});

//html()
test('hippo.html()',function(){
	equal(hippo('ul','#qunit-fixture').html('<li class="test"></li>').html(),'<li class="test"></li>');
});

//text()
test('hippo.text()',function(){
	equal(hippo('li','#qunit-fixture').first().text('test').text(),'test');
});

