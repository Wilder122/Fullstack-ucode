var beginRange = parseInt(prompt("Enter the beginning of the range:"));
var endRange = parseInt(prompt("Enter the end of the range:"));

function checkDivision(begin, end) {
    begin = begin || 1;
    end = end || 100;

    for (var i = begin; i <= end; i++) {
        var description = "";

        if (i % 2 === 0) {
            description += "even";
        }

        if (i % 3 === 0) {
            description += (description ? ", " : "") + "a multiple of 3";
        }

        if (i % 10 === 0) {
            description += (description ? ", " : "") + "a multiple of 10";
        }

        console.log(String(i) + (description ? " is " + description : ""));
    }
}

checkDivision(beginRange, endRange);