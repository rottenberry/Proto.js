# Proto.js
#### A small library which provides simple prototype inheritance. 

####API

* Prototype.create()
  Returns a new prototype which inherits nothing. It **doesn't** mean that the new prototype can't use mixins.
* Prototype.extend(prototype)
  Return a new prototype which inherits dynamicly from an already existing prototype. It **doesn't** mean that the new prototype must use mixins.

There are two kinds of things: prototypes (factories) and instances (just simple objects). 

Objects are being created without `new` keyword. 

Every prototype must implement at least one method - 'init()'. In this method a new instance gets its properties from the prototype or another prototypes. 

There aren't `hasOwnProperty`, `instanceOf` and other such properties, which would have been inherited from `Object` in the case instances were created as usual objects. 

Remember: `instanceOf` **won't work**!

The only one special property of every isntance is `factory` wich is always `null`. Also this property is special for prototypes too: it contains methods `init()`, `create()` and `Prototype` (it's just a link to the prototype itself).

The prototype aren't compatible with functions that are constructors or with classes from ES6. But you still can borrow methods directly if your codebase allows that. 

The prototype must fit in these conditions: 

* Properties which should be inherited by instances, **must** be defined directly in the prototype; properties which should not be inherited, **must** be defined in `factory` property of the prototype.
* `SomePrototype.factory.create()` (in the case you overrided it) **should** accept only one parameter - an object, which contains all needed properties.
* `SomePrototype.factory.init()` **must** be implented in every prototype. And this method **should** accept two parameters: a new instance and the object which contains all properties.

You can combine many calls of `init()` method of different prototypes to make mixins.

Check out [`person_robot_cyborg_example.js`](https://github.com/rottenberry/Proto.js/blob/master/person_robot_cyborg_example.js) file to see how it works.