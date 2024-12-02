function getFormattedDate(dateObject) {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var day = dateObject.getDate();
    var month = dateObject.getMonth();
    var year = dateObject.getFullYear();

    var dayOfWeek = dateObject.getDay();

    var formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 9 ? '0' : '') + (month + 1) + '.' + year + ' ' + (dateObject.getHours() < 10 ? '0' : '') + dateObject.getHours() + ':' + (dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes() + ' ' + daysOfWeek[dayOfWeek];

    return formattedDate;
}

// Example usage
const date0 = new Date(1993, 11, 1);
const date1 = new Date(1998, 0, -33);
const date2 = new Date('42 03:24:00');
console.log(getFormattedDate(date0)); // 01.12.1993 00:00 Wednesday
console.log(getFormattedDate(date1)); // 28.11.1997 00:00 Friday
console.log(getFormattedDate(date2)); // 01.01.2042 03:24 Wednesday
