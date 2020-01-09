const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	if(request.session.isLoggedIn){
		response.render("home.hbs", {username: request.session.currentAccount.username, isLoggedIn: request.session.isLoggedIn})
	}
	else{response.render("home.hbs")}
})

router.get("/cv", function(request,response){
	response.render("cv.hbs")
})
module.exports = router