const functions = require('express')


let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();
let currentDay = today.getDay();


let datesToShow = getDatesToShow(currentDate)


let days = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let weekDay = days[currentDay]
let month = months[currentMonth];
let year = currentYear


let bookings = ["Not Available", "Not Available", "Not Available"]

function daysUntilThuesday(weekDay){
    switch (weekDay){
        case 0: return 2; break;
        case 1: return 1; break;
        case 2: return 0; break;
        case 3: return -1; break;
        case 4: return -2; break;
        case 5: return 4; break;
        case 6: return 3; break;
    }
}

// Returns todays date + the days until thursday. Calculates for month shift. ** NOT READY FOR YEAR SHIFT **
function getDatesToShow(currentDate){
    const thuesday = currentDate + daysUntilThuesday(currentDay)
    const wednesDay = thuesday + 1
    const thursday = thuesday + 2
    const monthDays = getMonthDays(currentMonth)
    const datesToShow = []

    if(thuesday > monthDays){ datesToShow.push(thuesday - monthDays) }
    else { datesToShow.push(thuesday) }

    if(wednesDay > monthDays){ datesToShow.push(wednesDay - monthDays) }
    else{ datesToShow.push(wednesDay) }

    if(thursday > monthDays){ datesToShow.push(thursday - monthDays) }
    else{ datesToShow.push(thursday) }
    return datesToShow
}

// Returns true if the year is a leap year. 
function isLeapYear(year){
    if(year%4 == 0){
        return true;
    }
    return false;
}
// Returns number of days in the month. 
function getMonthDays(month){
    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
        return 31;
    }
    else if (month == 1 && !isLeapYear(year)){
        return 28
    }
    else if (month == 1){
        return 29
    }
    return 30
}

exports.weekDay = weekDay
exports.currentDate = currentDate
exports.bookings = bookings
exports.month = month
exports.year = year
exports.datesToShow = datesToShow