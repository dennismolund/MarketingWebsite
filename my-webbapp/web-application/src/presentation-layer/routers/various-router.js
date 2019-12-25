const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	response.render("home.hbs")
})

router.get("/calendar", function(request,response){
	
	response.render("calendar.hbs")
})

router.get("/cv", function(request,response){
	response.render("cv.hbs")
})
module.exports = router