const functions = require('express')


let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();
let currentDay = today.getDay();

let thuesday = getDateForThuesday(currentDate, daysUntilThuesday)
let wednesDay = thuesday+1
let thursday = wednesDay+1

console.log(currentDate, thuesday)

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthAndYear = currentYear + " - " + months[currentMonth];
let firstDay = today.getDay();
console.log(firstDay)

let bookings = ["Not Available", "Not Available", "Not Available"]

function daysUntilThuesday(weekDay){
    switch (weekDay){
        case 0: return 2; break;
        case 1: return 1; break;
        case 2: return 0; break;
        case 3: return -1; break;
        case 4: return -2; break;
        case 5: return -3; break;
        case 6: return -4; break;
    }
}
function getDateForThuesday(currentDate){
    return currentDate + daysUntilThuesday(currentDay)
}

exports.bookings = bookings
exports.monthAndYear = monthAndYear
exports.thuesday = thuesday