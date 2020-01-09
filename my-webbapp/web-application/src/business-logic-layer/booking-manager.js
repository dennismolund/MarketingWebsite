//retrive dates from database.
const bookingRepository = require('../data-access-layer/booking-repository')


exports.getAllBookings= function(callback){
	bookingRepository.getAllBookings(callback)
}


