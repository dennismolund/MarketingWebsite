const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')
const functions = require('../functions/booking-functions')

const model = {
    weekDay: functions.weekDay,
    currentDate: functions.currentDate,
    bookings: functions.bookings,
    month: functions.month,
    year: functions.year,
    datesToShow: functions.datesToShow
}
console.log("BOOKING-ROUTER model: ", model)

router.get("/", function(request,response){
    response.render("booking.hbs", {model})
})


module.exports = router


/*
bookingManager.getAllBookings(function(array, bookings){
        console.log("ALL ACCOUNTS:", bookings)
        response.render("booking.hbs", {bookings, monthAndYear})
    })
*/