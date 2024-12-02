var firstName = prompt("Enter your first name:");
var lastName = prompt("Enter your last name:");

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function isValidInput(input) {
    for (var i = 0; i < input.length; i++) {
        if (!(input[i] >= 'a' && input[i] <= 'z') && !(input[i] >= 'A' && input[i] <= 'Z')) {
            return false;
        }
    }
    return true;
}

if (!isValidInput(firstName) || !isValidInput(lastName)) {
    console.log("Wrong input!");
    alert("Wrong input!");
} else {
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);

    var fullName = firstName + " " + lastName;
    console.log("Hello, " + fullName + "!");
    alert("Hello, " + fullName + "!");
}