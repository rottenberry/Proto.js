/*
  It's how to create new prototypes
*/

const Person = Prototype.create();
Person.factory.init = function initPerson(instance, args) {
  const {name, gender} = args;
  instance.name = name;
  instance.gender = gender;
}
Person.factory.createMale = function createMalePerson(args) {
  const maleArgs = Object.create(args);
  maleArgs.gender = 'male';

  return this.create(maleArgs);
}


const Robot = Prototype.create();
Robot.factory.init = function initRobot(instance, args) {
  const {model, color} = args;
  instance.model = model;
  instance.color = color;
}

const Cyborg = Prototype.create();
Cyborg.factory.init = function initCyborg(instance, args) {
  //Mixins
  Person.factory.init(instance, args);
  Robot.factory.init(instance, args);
  
  instance.implants = [];
}

const LaserCyborg = Prototype.extend(Cyborg);
LaserCyborg.factory.init = function initLaserCyborg(instance, args) {
  //It can be considered as a mixin too
  Cyborg.factory.init(instance, args);
  
  instance.isLaser = true;
  instance.implants.push('laser hand');
}

/*
  It's how to create new instances
*/

const person = Person.factory.create({
  name: 'John', 
  gender: 'male',
});

const malePerson = Person.factory.createMale({
  name: "Bob",
});

const myLaserCyborg = LaserCyborg.factory.create({
  name: 'LaserSam',
  gender: 'male',
  model: 'LS1',
  color: 'green',
  year: 2016,
});

myLaserCyborg.implants.push('aiming cheap');
myLaserCyborg.implants.push('long life battery');

/*
  Dynamic inheritance works just as usual, there is nothing new.
*/

Cyborg.getImplants = function getCyborgImplants() {
  return this.implants.slice();
}
/*
  "Cyborg" is a prototype for "LaserCyberg",
  and "LaserCyborg" is a prototype for "myLaserCyborg",
  so "myLaserCyborg" inherits all properties from "Cyborg" dynamicly,
  as well as from "LaserCyborg"
*/

myLaserCyborg.getImplants().forEach((implant) => console.log(implant));
/*
=>  laser hand
=>  aiming cheap
=>  long life battery
*/

LaserCyborg.laserColor = 'red';
console.log(myLaserCyborg.laserColor) //=> red

myLaserCyborg.laserColor = 'blue';
console.log(myLaserCyborg.laserColor) //=> blue