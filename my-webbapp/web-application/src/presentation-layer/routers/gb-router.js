const express = require('express')
const router = express.Router()
const gbManager = require('../../business-logic-layer/gb-manager')


router.get("/", function(request,response){
    gbManager.getAllPosts(function(error, postsArray){

        if(request.session.currentAccount){
            const model = {
                username: request.session.currentAccount.username,
                allPosts: postsArray
            }
            console.log(model)
            response.render("guest-book.hbs", model)
        }
        else{
            const model = {
                allPosts: postsArray
            }
            response.render("guest-book.hbs", model)
        }
    })

})
router.post("/", function(request, response){
    console.log("Creating post")
    const newPost = {
        username: request.session.currentAccount.username,
        message: request.body.message
    }

    gbManager.createPost(newPost, function(error){
        if(error){
            console.error("We had an error");
            response.redirect("/guestbook")
        }
        else{
            console.log("No error")
            response.redirect("/guestbook")
        }
    })
})

module.exports = router