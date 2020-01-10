const functions = require('express')

const dummyData = [{id: 1, date: 14, time: 1}, {id: 2, date: 15, time: 0}, {id: 3, date: 15, time: 3}, {id: 4, date: 16, time: 3}];
const SUNDAY = 0
const MONDAY = 1
const TUESDAY = 2
const WEDNESDAY = 3
const THURSDAY = 4
const FRIDAY = 5
const SATURDAY = 6


let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDate = today.getDate();
let currentDay = today.getDay();

let startDate = currentDate;
let datesToShow = getDatesToShow(startDate, currentDay)


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let weekDay = days[currentDay]
let month = months[currentMonth];
let year = currentYear

let tuesday = ["Book now", "Book now", "Book now", "Book now"]
let wednesDay = ["Book now", "Book now", "Book now", "Book now"]
let thursday = ["Book now", "Book now", "Book now", "Book now"]

let cellInfo = [tuesday, wednesDay, thursday]
bookedArray()



// Returns number of days from todays date until thuesday, starting from Friday
function daysUntilTuesday(weekDay){
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
function getDatesToShow(startDate, weekDay){
    const tuesday = startDate + daysUntilTuesday(weekDay)
    const wednesDay = tuesday + 1
    const thursday = tuesday + 2
    const monthDays = getMonthDays(currentMonth)
    const datesToShow = []

    if(tuesday > monthDays){ datesToShow.push(tuesday - monthDays) }
    else { datesToShow.push(tuesday) }

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

function bookedArray(){
    for (dates in datesToShow){
        for(date in dummyData){
            if (datesToShow[dates] == dummyData[date].date){
                cellInfo[dates][date] = "NOT AVAILABLE"
            }
        }
    }
}

exports.nextWeek = function nextWeek(date){
    console.log("nextWeek date: ", date)
    let datesToShow = []
    date = parseInt(date) + 7
    datesToShow = getDatesToShow(date, TUESDAY)
    console.log("nextWeek: datesToShow: ", datesToShow)
    return datesToShow
}

exports.weekDay = weekDay
exports.currentDate = currentDate
exports.cellInfo = cellInfo
exports.month = month
exports.year = year
exports.datesToShow = datesToShow