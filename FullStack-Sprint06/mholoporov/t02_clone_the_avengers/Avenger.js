class Avenger {
  constructor(name, alias, gender, age, powers, hp) {
    this.name = name;
    this.alias = alias;
    this.gender = gender;
    this.age = age;
    this.powers = powers;
    this.hp = hp;

    const instance = this;
    const callableHandler = function() {
      return `${instance.alias.toUpperCase()}\n${instance.powers.join('\n')}`;
    };

    return new Proxy(callableHandler, {
      apply: (target, thisArg, argumentsList) => target(),
      get: (target, prop, receiver) => {
        if (prop in instance) return instance[prop];
        return undefined;
      }
    });
  }

  toString() {
    return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
  }
}

module.exports = Avenger;