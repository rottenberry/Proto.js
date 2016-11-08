const Prototype = (function(){

  const initPrototypeFactory = () => {
    const Proto = Object.create(null);
    Proto.factory = Object.create(null);
    //To prevent adding "hasOwnProperty" and another "Object" properties.
    Proto.factory.Prototype = Proto;
    //"factory.create" will be inherited by all prototypes of Proto object.
    Proto.factory.create = function createAbstractInstance(args) {
      const instance = Object.create(this.Prototype);
      Object.defineProperty(instance, 'factory', {
        value: null,
      });
      //to prevent new instances to do prototype things.
      this.init(instance, args);

      return instance;
    };
    Proto.factory.init = function throwErrorOnProtoFactoryInitCall() {
      throw Error('"init()" method must be implemented!');
    };

    const prototypeFactory = (prototype = Proto) => {
      const newPrototype = Object.create(prototype);
      newPrototype.factory = Object.create(prototype.factory);
      newPrototype.factory.Prototype = Object.create(newPrototype);

      return newPrototype;
    };

    return prototypeFactory;
  };


  return {
    create: initPrototypeFactory(), 
    extend: (prototype) => Prototype.create(prototype),
  };

}());