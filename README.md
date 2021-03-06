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
* Be jQuery-like in its plugin architecture but with the heart and soult of zepto.js.
* Be fixable by mere humans with some JavaScript chops
* Be a viable solution for inclusion in other micro libraries that require sophisticated (beyond what the native dom api offers) DOM manipulation and nothing else

---

###API Draft 
(warning: API is in flux. This is less api documentation and more road map for now. * = not developed or tested yet. And yes I know its not small or fast yet.)


###### Hippo() Constructor, creates a set of Element nodes

```js
hippo('li') //Selector

hippo('li','ul') //Selector & Selector context

hippo('li',document.body) //Selector & Element Node context 

hippo('<div></div>') //HTML

hippo('<div></div>','window.frames[0].document') //HTML & Document context

hippo(document.body) //Element Node

hippo([document.body,document.head]) //Array

hippo(document.body.children) //NodeList

hippo(document.all) //HTMLCollection

hippo(hippo()) //a hippo object
```
###### Hippo Helper/Utilities Functions
```js
hippo.version
hippo.each(object/array,callback function)
hippo.type()
hippo.isArray()
hippo.isFunction()
hippo.matchesSelector()
hippo.collectElements()
hippo.uniqueElements()
*hippo.loadCss()
*hippo.loadJs()
```
###### Hippo() Set Operation Methods
```js
//does not return hippo object, non-chainable
hippo().is()
hippo().isEmpty()
hippo().has()
hippo().total()
hippo().toArray()
hippo().get(index)
hippo().index(selectorOrNodeElement)
hippo().lastIndex()
hippo().siblingIndex()

//returns hippo object, chainable 
hippo().each()
hippo().slice()
hippo().at(index)
hippo().find(selector)
hippo().exclude(selector)
hippo().not()
hippo().filter()
hippo().add()
hippo().last()
hippo().first()
hippo().reverse()
hippo().clone()
*hippo().push()
*hippo().pop()
*hippo().shift()
*hippo().unshift()
*hippo().even()
*hippo().odd()
```
###### Hippo() Attribute Methods
```js
hippo().attr() //gets, sets, and returns list
hippo().hasAttr() //one, or multiple
hippo().removeAttr() //remove one, multiple, or all

hippo().getClass() //gets one, or array containing all
hippo().addClass()
hippo().hasClass() //one, or multiple
hippo().removeClass() //remove one, multiple, or all
hippo().toggleClass()

hippo().data() //gets, sets, and returns list
hippo().hasData() //one, or multiple
hippo().removeData() //remove one, multiple, or all
```
###### Hippo() Manipulation Methods
```js
hippo().replaceWith()
hippo().empty()
hippo().remove()

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
```js
hippo().parent() //first parent element
hippo().parents(selector) //all parent elements
hippo().parentsUntil(selector)

hippo().child() //first child element
hippo().childs(selector) //all child elements
hippo().childsUntil(selector) 

hippo().nextSib() //next sibling
hippo().nextSibs(selector) //all next siblings
hippo().nextSibsUntil(selector) 

hippo().prevSib() //previous sibling
hippo().prevSibs(selector) //all previous siblings
hippo().prevSibsUntil(selector)

hippo().children(selector) //all children
hippo().childrenUntil(selector)

hippo().ancestors(selector) //all ancestors elements
hippo().ancestorsUntil(selector)
hippo().descendants(selector) //all descendants elements
hippo().descendantsUntil(selector) //all descendants elements
hippo().siblings(selector) //all sibling elements
```

