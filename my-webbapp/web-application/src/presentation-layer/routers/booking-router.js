const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')
const functions = require('../functions/booking-functions')

const dummyData = [{id: 1, date: 14, time: 1}, {id: 2, date: 15, time: 0}];


router.get("/", function(request,response){
    const model = {
        weekDay: functions.weekDay,
        currentDate: functions.currentDate,
        cellInfo: functions.cellInfo,
        month: functions.month,
        year: functions.year,
        datesToShow: functions.datesToShow,
    }
    console.log("BOOKING-ROUTER model: ", model)
    response.render("booking.hbs", {model})
})

router.post("/next",function(request,response){
    const date = request.body.date;
    const datesToShow = functions.nextWeek(date)
    const model = {
        weekDay: functions.weekDay,
        currentDate: functions.currentDate,
        bookings: functions.bookings,
        month: functions.month,
        year: functions.year,
        datesToShow: datesToShow
    }
    console.log(model.datesToShow)

    response.render("booking.hbs", {model, dummyData})
})


module.exports = router


/*
bookingManager.getAllBookings(function(array, bookings){
        console.log("ALL ACCOUNTS:", bookings)
        response.render("booking.hbs", {bookings, monthAndYear})
    })
*/