const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
	if(request.session.currentAccount){
		response.render("home.hbs", {username: request.session.currentAccount.username})
	}
	else{response.render("home.hbs")}
})

router.get("/cv", function(request,response){
	if(request.session.currentAccount){
		response.render("cv.hbs", {username: request.session.currentAccount.username})
	}
	else{response.render("cv.hbs")}
})
module.exports = router