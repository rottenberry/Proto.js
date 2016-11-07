# proto.js
A small library which provides simple prototype inheritance. 
There are two kinds of things: prototypes (factories) and instances (just simple objects). 
Objects are being created without `new` keyword. 
Every prototype must implement at least one method - 'init'. In this method a new instance gets its properties from the prototype or another prototypes. 
There aren't `hasOwnProperty`, `instanceOf` and other such properties, which would have inherited from `Object`. 
The only one special property of every isntance is `factoty` wich is always `null`. 
The prototype aren't compatible with functions that are constructors. But you still borrow methods directly if your codebase allows that. 
