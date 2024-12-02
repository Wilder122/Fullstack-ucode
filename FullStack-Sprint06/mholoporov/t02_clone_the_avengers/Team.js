const Avenger = require("./Avenger");

class Team {
  constructor(id, avengers) {
    this.id = id;
    this.avengers = avengers;
  }

  clone() {
    const clonedAvengers = this.avengers.map(avenger => new Avenger(
      avenger.name,
      avenger.alias,
      avenger.gender,
      avenger.age,
      [...avenger.powers],
      avenger.hp
    ));
    return new Team(this.id, clonedAvengers);
  }

  battle({ damage }) {
    const updatedAvengers = this.avengers.map(avenger => {
      const updatedAvenger = new Avenger(
        avenger.name,
        avenger.alias,
        avenger.gender,
        avenger.age,
        avenger.powers,
        avenger.hp - damage
      );
      return updatedAvenger.hp > 0 ? updatedAvenger : null;
    }).filter(avenger => avenger !== null);

    this.avengers = updatedAvengers;
  }

  calculateLosses(clonedTeam) {
    const initialCount = clonedTeam.avengers.length;
    const currentCount = this.avengers.length;
    const losses = initialCount - currentCount;
    if (losses > 0) {
      console.log(`In this battle we lost ${losses} Avenger${losses > 1 ? 's' : ''}.`);
    } else {
      console.log("We haven't lost anyone in this battle!");
    }
  }
}

module.exports = Team;