
![Augustine of Hippo](https://raw.github.com/codylindley/hippojs/master/saint-augustine.jpeg)

###hippo.js


A wishful, likley naive, jQuery inspired DOM Library for use in modern ES5 browsers. 
(i.e. think of it similar to [zepto.js](http://zeptojs.com/) with a focus on the DOM and support for ie9+)

---

###Project Goals 

* Be all about the DOM allowing CSS to be CSS and XHR, XHR. Native DOM first!
* Don't try and be [underscore.js](http://underscorejs.org/) or [lodash](http://lodash.com/). If you need that, use those.
* Be about modern browsers (including ie9+) allowing polyfills to deal with the past.
* Be modular so as to permit custom builds using [grunt.js](http://gruntjs.com/).
* Be lightweight, not middleweight.
* Be easy to update or change by keeping the code simple, readable, and heavily commented so at the very least the code teaches.
* Be jQuery-like in its plugin architecture but with the heart of zepto.js.
* Be fixable by mere humans with some JavaScript chops

---

###API Draft 
(warning: API is in flux. This is less api documentation and more road map for now. * = not developed or tested yet. And yes I know its not small or fast yet.)


###### Hippo() Constructor, creates a set of Element nodes

```
hippo('li') //Selector
hippo('li','ul') //Selector & Selector context
hippo('li',document.body) //Selector & Element Node context 
hippo('<div></div>') //HTML
hippo('<div></div>','window.frames[0].document') //HTML & Document context
hippo(document.body) //Element Node
hippo([document.body,document.head])` //Array
hippo(document.body.children) //NodeList
hippo(document.all) //HTMLCollection
hippo(hippo()) //a hippo object
```
###### Hippo Helper/Utilites Functions
```
hippo.version
hippo.each()
hippo.type()
hippo.isArray()
hippo.isFunction()
hippo.matchesSelector()
hippo.collectElements()
hippo.uniqueElements()
```
###### Hippo() Set Operatation Methods
```
//does not return hippo object, non-chainable
hippo().is()
hippo().isEmpty()
hippo().has()
hippo().total()
hippo().toArray()
hippo().get()
hippo().index()
hippo().siblingIndex()

//returns hippo object, chainable 
hippo().each()
hippo().slice()
hippo().eq()
hippo().children()
hippo().find()
hippo().filter()
hippo().add()
hippo().last()
hippo().first()
hippo().ancestors() //create new set containg all ancestors elements
hippo().descendants() //create new set containg all descendants elements
hippo().parents() //create new set, containg all parents elements
*hippo().childs() //create new set, containg all first child elements
hippo().nextSiblings() //create a new set, containg all next sibling elements
hippo().prevSiblings() //create a new set, containg all previous sibling elements
hippo().siblings() //create a new set, containg all sibling elements
hippo().clone()
```
###### Hippo() Attribute Methods
```
hippo().getAttr()
hippo().hasAttr()
hippo().setAttr()
hippo().removeAttr()
*hippo().getClass()
hippo().hasClass()
hippo().addClass()
hippo().removeClass()
hippo().toggleClass()
*hippo().getData()
*hippo().hasData()
*hippo().setData()
*hippo().removeData()
```
###### Hippo() Manipulation Methods
```
hippo().replaceWith()
hippo().empty()
hippo().before()
hippo().insertBefore()
hippo().after()
hippo().insertAfter()
hippo().append()
hippo().appendTo()
hippo().prepend()
hippo().prependTo()
hippo().wrap()
hippo().wrapInner()
hippo().html()
hippo().outerHtml()
hippo().text()
```
###### Hippo() Traversing Methods
```
*hippo().up() //travese to first parent element
*hippo().upTo() //traverse all parent elments, finding the one that matches the selector
*hippo().down() //traverse to first child element
*hippo().downTo() //traverse all firstChild elements, finding the one that matches the selector
*hippo().anestorsTo() //traverse all ancestors, finding the one that matches the selector
*hippo().descendantsTo() //traverse all descendants, finding the one that matches the selector
*hippo().next() //traverse to next sibling element
*hippo().nextTo() //traverse to next sibling element, until a match is found
*hippo().prev() //traverse to previous sibling element
*hippo().prevTo() //travers to previous sibling element, until a match is found
```

