# proto.js
A small library which provides simple prototype inheritance. 

There are two kinds of things: prototypes (factories) and instances (just simple objects). 

Objects are being created without `new` keyword. 

Every prototype must implement at least one method - 'init'. In this method a new instance gets its properties from the prototype or another prototypes. 

There aren't `hasOwnProperty`, `instanceOf` and other such properties, which would have been inherited from `Object` if these isntances were created as usual objects. 

Remember: `instanceOf` **won't work**!

The only one special property of every isntance is `factory` wich is always `null`. Also this property is special for prototypes too: it contains methods `init()`, `create()` and `Prototype` (it's just a link to the prototype).

The prototype aren't compatible with functions that are constructors. But you still can borrow methods directly if your codebase allows that. 

The prototype must fit in these conditions: 

* Properties which should be inherited by instances, are defined directly in the prototype; properties which must not be inherited, are defined in `factory` property of the prototype.
* `SomePrototype.factory.create()` and `SomePrototype.factory.init()` must accept only one parameter - an object which contains all needed fields.

Check out [`person_robot_cyborg_example.js`](https://github.com/rottenberry/Proto.js/blob/master/person_robot_cyborg_example.js) file to see how it works.