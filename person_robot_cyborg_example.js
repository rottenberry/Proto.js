const Person = Prototype.create();
Person.factory.init = function initPerson(instance, args) {
  const {name, gender} = args;
  instance.name = name;
  instance.gender = gender;
}
Person.factory.createMale = function createMalePerson(ars) {
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
}

const LaserCyborg = Prototype.extend(Cyborg);
LaserCyborg.factory.init = function initLaserCyborg(instance, args) {
  //Can be considered as a mixin too
  Cyborg.factory.init(instance, args);
  instance.isLaser = true;
}

