const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')


router.get("/", function(request,response){
    console.log("BOOKING-ROUTER")
bookingManager.getAllBookings(function(error, bookings){
    if(error.length > 0){
        console.log("Error getting all bookings")
        if(request.session.currentAccount){
            module.exports = bookings
            response.render("booking.hbs", {username: request.session.currentAccount.username, email: request.session.currentAccount.email})
        }
        else{response.render("booking.hbs")}
    }
    else{
        console.log("Cellback recieved with bookings", bookings)
        if(request.session.currentAccount){
            response.render("booking.hbs", {username: request.session.currentAccount.username, email: request.session.currentAccount.email, bookings})
        }
        else{response.render("booking.hbs")}
    }
})

})



router.post('/book', function(request, response){
    console.log("Post booking: ", request.body.inputDate)
    let booking = {
        date: request.body.inputDate,
        email: request.body.email,
        username: request.session.currentAccount.username,
        text: request.body.info
    }
    bookingManager.createBooking(booking, function(bookings){
        console.log("booking-router recieved callback, booking created")
    })
    response.render("booking.hbs", {username: request.session.currentAccount.username, email: request.session.currentAccount.email})
})




module.exports = router
