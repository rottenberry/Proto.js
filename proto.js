const Prototype = (function(){

const initPrototypeFactory = () => {
  /*
    Proto is an object that determinates the way inheritance will be work
    
    All prototypes generated from Proto have 'factory' property, but instances don't.
    
    All factory objects must implement at least one method - init;
    One can change value of "factory.Prototype", but should do it carefully.
    It's very undesireble to override "factory.create". It should always direct to Proto.factory.create.
    "factory.create" uses an object that contains parameters.
    The use of SomePrototype.factory.init() allows us to make mixins (see examples below) in another prototypes.
    "factory.init" in every prototype must accept two objects: instance and parameters.
    One prototype can dynamicly inherit properties from another prototype,
    but only from one (because of JavaScript architecture). Althout, 
    it is free to add mixins of another prototypes on an object creating stage.


    "instanceOf" doesn't work;
    "new" keyword is useless now;
  */

  const Proto = Object.create(null);
  Proto.factory = Object.create(null);
  //To prevent adding "hasOwnProperty" and another "Object" properties.
  Proto.factory.Prototype = Proto;
  //factory.create will be inherited by all prototypes of Proto object.
  Proto.factory.create = function createAbstractInstance(args) {
    const instance = Object.create(this.Prototype);
    Object.defineProperty(instance, 'factory', {
      value: null,
    });
    // "factory" has been added in order to forbid new instances do prototype things.
    this.init(instance, args);

    return instance;
  }
  Proto.factory.init = function throwErrorOnProtoFactoryInitCall() {
    throw Error('It must be implemented!');
  }

  const prototypeFactory = (prototype = Proto) => {
    const newPrototype = Object.create(prototype);
    newPrototype.factory = Object.create(prototype.factory);
    newPrototype.factory.Prototype = Object.create(newPrototype);

    return newPrototype;
  }

  return prototypeFactory;
}


return {
  create: initPrototypeFactory(), 
  extend: (prototype) => Prototype.create(prototype),
};

}());