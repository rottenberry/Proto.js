/*
  It's how to create new prototypes
*/

const Person = Prototype.create();
Person.factory.init = function initPerson(instance, args) {
  const {name, gender} = args;
  instance.name = name;
  instance.gender = gender;
}; 
Person.factory.createMale = function createMalePerson(args) {
  const maleArgs = Object.create(args);
  maleArgs.gender = 'male';

  return this.create(maleArgs);
};

const Robot = Prototype.create();
Robot.factory.init = function initRobot(instance, args) {
  const {model, color} = args;
  instance.model = model;
  instance.color = color;
};

const Cyborg = Prototype.create();
Cyborg.factory.init = function initCyborg(instance, args) {
  //Mixins
  Person.factory.init(instance, args);
  Robot.factory.init(instance, args);
  
  instance.implants = [];
};

const LaserCyborg = Prototype.extend(Cyborg);
LaserCyborg.factory.init = function initLaserCyborg(instance, args) {
  Cyborg.factory.init(instance, args);
  //It's not necessary, but useful if we want laser cyborgs be like cyborgs
  
  instance.isLaser = true;
  instance.implants.push('laser hand');
};

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
  //To prevent modifying the original array
};
/*
  "Cyborg" is a prototype for "LaserCyberg",
  and "LaserCyborg" is a prototype for "myLaserCyborg",
  so "myLaserCyborg" inherits all properties from "Cyborg" dynamically,
  as well as from "LaserCyborg"
*/

myLaserCyborg.getImplants().forEach((implant) => console.log(implant));
/*
=>  laser hand
=>  aiming cheap
=>  long life battery
*/

LaserCyborg.laserColor = 'red';
//'red' is supposed to be a default value for all laser cyborgs.
console.log(myLaserCyborg.laserColor); //=> red

myLaserCyborg.laserColor = 'blue';
//Our laser cyborg is special now
console.log(myLaserCyborg.laserColor); //=> blue