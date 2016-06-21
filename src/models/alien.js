/* eslint-disable func-names */
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';

const file = path.join(__dirname, '../../data/aliens.json');

function Alien(o) {
  this.id = uuid.v1();
  this.name = o.newName;
  this.age = o.newAge;
  this.picture = o.newPicture;
  this.planet = o.newPlanet;
}

Alien.prototype.save = function () {
  fs.writeFileSync(file, `${JSON.stringify(this)}\n`, { flag: 'a' });
};

Alien.find = function (id) {
  let data = fs.readFileSync(file, { encoding: 'utf8' });
  data = data.split('\n');
  data.pop();
  const aliens = data.map(d => JSON.parse(d));
  if (id) {
    return aliens.find(a => a.id === id);
  }
  return aliens;
};

Alien.remove = function (id) {
  let data = fs.readFileSync(file, { encoding: 'utf8' });
  data = data.split('\n');
  data.pop();
  const aliens = data.map(d => JSON.parse(d));
  data = aliens.filter(a => a.id !== id);
  fs.writeFileSync(file, '');
  for (let i = 0; i < data.length; i++) {
    fs.writeFileSync(file, `${JSON.stringify(data[i])}\n`, { flag: 'a' });
  }
};

module.exports = Alien;
