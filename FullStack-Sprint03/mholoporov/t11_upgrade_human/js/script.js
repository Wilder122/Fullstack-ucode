let superhero; // Declare superhero globally

class Human {
    constructor(firstName, lastName, gender, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.age = age;
      this.calories = 0;
      this.isHungry = false;
      this.displayInfo();
      this.startHungryTimer();
    }
  
    sleepFor(seconds) {
      console.log(`I'm sleeping for ${seconds} seconds`);
      setTimeout(() => {
        console.log("I'm awake now");
      }, seconds * 1000);
    }
  
    feed() {
      if (this.calories >= 500) {
        console.log("I'm not hungry");
      } else {
        console.log("Nom nom nom");
        setTimeout(() => {
          this.calories += 200;
          if (this.calories < 500) {
            console.log("I'm still hungry");
          }
          this.displayInfo();
        }, 10000);
      }
    }
  
    displayInfo() {
      const humanDetails = document.getElementById("human-details");
      humanDetails.innerHTML = `
        <h2>Human</h2>
        <p>First Name: ${this.firstName}</p>
        <p>Last Name: ${this.lastName}</p>
        <p>Gender: ${this.gender}</p>
        <p>Age: ${this.age}</p>
        <p>Calories: ${this.calories}</p>
      `;
  
      const humanActions = document.getElementById("human-actions");
      humanActions.innerHTML = `
        <button onclick="human.sleepFor(prompt('Enter sleep duration in seconds'))">Sleep</button>
        <button onclick="human.feed()">Feed</button>
      `;
    }
  
    startHungryTimer() {
      setTimeout(() => {
        this.isHungry = true;
        console.log("I'm hungry!");
      }, 5000);
    }
  }
  
  class Superhero extends Human {
    constructor(firstName, lastName, gender, age, superPower) {
      super(firstName, lastName, gender, age);
      this.superPower = superPower;
    }
  
    fly() {
      console.log("I'm flying!");
      setTimeout(() => {
        console.log("Landing...");
      }, 10000);
    }
  
    fightWithEvil() {
      console.log("Khhhh-chh... Bang-g-g-g... Evil is defeated");
    }
  
    displayInfo() {
      const superheroDetails = document.getElementById("superhero-details");
      superheroDetails.innerHTML = `
        <h2>Superhero</h2>
        <p>First Name: ${this.firstName}</p>
        <p>Last Name: ${this.lastName}</p>
        <p>Gender: ${this.gender}</p>
        <p>Age: ${this.age}</p>
        <p>Calories: ${this.calories}</p>
        <p>Super Power: ${this.superPower}</p>
      `;
  
      const superheroActions = document.getElementById("superhero-actions");
      superheroActions.innerHTML = `
        <button onclick="superhero.fly()">Fly</button>
        <button onclick="superhero.fightWithEvil()">Fight with Evil</button>
      `;
    }
  }
  
  const human = new Human("Mike", "Doll", "Male", 25);
  
  const turnSuperheroButton = document.getElementById("turn-superhero");
  turnSuperheroButton.addEventListener("click", () => {
    if (human.calories >= 500) {
      superhero = new Superhero(human.firstName, human.lastName, human.gender, human.age, "Super Strength"); // Assign to the global superhero variable
      const humanContainer = document.getElementById("human-container");
      const superheroContainer = document.getElementById("superhero-container");
      humanContainer.style.display = "none";
      superheroContainer.style.display = "block";
      superhero.displayInfo();
    } else {
      console.log("You need at least 500 calories to turn into a superhero");
    }
  });
  
  setInterval(() => {
    if (human.calories > 0 && !human.isHungry) {
      human.calories -= 200;
      human.displayInfo();
    }
  }, 60000);