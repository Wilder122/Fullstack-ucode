var animal = prompt("What animal is the superhero most similar to?");
var gender = prompt("Is the superhero male or female? Leave blank if unknown or other.");
var age = prompt("How old is the superhero?");

var animalRegExp = /^[a-zA-Z]{1,20}$/;
var genderRegExp = /^(male|female|)$/i;
var ageRegExp = /^[1-9]\d{0,4}$/;

var validAnimal = animalRegExp.test(animal);
var validGender = genderRegExp.test(gender);
var validAge = ageRegExp.test(age);

// Check input validity
if (!validAnimal || !validGender || !validAge) {
    alert("Invalid input. Please enter valid input according to the instructions.");
} else {

    var description;
    if (gender.toLowerCase() === "male") {
        description = (parseInt(age) < 18) ? "boy" : "man";
    } else if (gender.toLowerCase() === "female") {
        description = (parseInt(age) < 18) ? "girl" : "woman";
    } else {
        description = (parseInt(age) < 18) ? "kid" : "hero";
    }

    var superheroName = animal.toLowerCase() + "-" + description;
    alert("The superhero name is: " + superheroName + "!");
}
