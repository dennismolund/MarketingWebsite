const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')
const functions = require('../functions/booking-functions')

const model = {
    bookings: functions.bookings,
    monthAndYear: functions.monthAndYear,
    thuesday: functions.thuesday
}

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