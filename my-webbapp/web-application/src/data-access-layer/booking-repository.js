const db = require('./db')

const bookings = []
const dummyDate = new Date(2020, 1, 27, 16)
const dummyDate2 = new Date(2020, 2, 3, 18)

const dummyBooking = {
	date: dummyDate,
	email: "testMail@test.com",
	username: "testUser",
	text: "Test text"
}
const dummyBooking2 = {
	date: dummyDate2,
	email: "test2@mail.com",
	username: "testuser2",
	text: "testtext2"
}

bookings.push(dummyBooking)
bookings.push(dummyBooking2)

exports.getAllBookings = function(callback){
	console.log("returning bookings array: ", bookings)
	callback([], bookings)
	
}
exports.createBooking = function(booking, callback){
	const newBooking = {
		date: booking.date,
		email: booking.email,
		username: booking.username,
		text: booking.text
	}
	console.log("Adding booking: ", newBooking)
	bookings.push(newBooking)
	callback(bookings)
}


