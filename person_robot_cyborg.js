const Person = Prototype.create();
Person.factory.init = function initPerson(instance, args) {
  const {name, gender} = args;
  instance.name = name;
  instance.gender = gender;
}

const Robot = Prototype.create();
Robot.factory.init = function initRobot(instance, args) {
  const {model, color} = args;
  instance.model = model;
  instance.color = color;
}

const Cyborg = Prototype.create();
Cyborg.factory.init = function initCyborg(instance, args) {  
  Person.factory.init(instance, args);
  Robot.factory.init(instance, args);
}

const LaserCyborg = Prototype.extend(Cyborg);
LaserCyborg.factory.init = function initLaserCyborg(instance, args) {
  Cyborg.factory.init(instance, args);
  instance.isLaser = true;
}

