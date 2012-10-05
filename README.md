
![Augustine of Hippo](https://raw.github.com/codylindley/hippojs/master/saint-augustine.jpeg)

###hippos.js


A wishful, likley naive, jQuery inspired DOM Library for use in modern browsers 
(i.e. think of it similar to [zepto.js](http://zeptojs.com/) but with support for ie9+)

---

###API Draft 
(warning: API is in flux. This is less api documentation and more road map for now)


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
hippo().is()
hippo().isEmpty()
hippo().has()
hippo().total()
hippo().toArray()
hippo().each()
hippo().slice()
hippo().eq()
hippo().children()
hippo().find()
hippo().filter()
hippo().add()
hippo().last()
hippo().first()
hippo().index()
hippo().siblingIndex()
hippo().ancestors() //create new set containg all ancestors
hippo().descendants() //create new set containg all descendants
*hippo().parents() //create new set, containg all parents (ie. parentNode)
*hippo().nextSiblings() //create a new set, containg all next siblings
*hippo().prevSiblings() //create a new set, containg all previous siblings
*hippo().siblings() //create a new set, containg all siblings
hippo().clone()
```
###### Hippo() Attribute Methods
```
hippo().setAttr()
hippo().getAttr()
hippo().removeAttr()
hippo().hasAttr()
hippo().addClass()
hippo().removeAttr()
hippo().toggleClass()
hippo().hasClass()
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
*hippo().parent() //travers to parent
*hippo().parentsUntil() //traverse all parents, until all match is found
*hippo().ancestorsUntil() //traverse all ancestors, until a match is found
*hippo().descendantsUntil() //traverse all descendants, until a match is found
*hippo().next() //traverse to next sibling
*hippo().nextUntil() //traverse to next sibling, until a match is found
*hippo().prev() //traverse to previous sibling
*hippo().prevUntil() //travers to previous sibling, until a match is found
```

