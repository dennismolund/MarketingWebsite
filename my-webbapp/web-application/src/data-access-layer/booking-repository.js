const db = require('./db')

exports.getAllBookings = function(callback){
	
	
	const bookings = [{date: 'monday'}, {date: 'wednesday'} ]
	
	callback([], bookings)
		
	
	
}