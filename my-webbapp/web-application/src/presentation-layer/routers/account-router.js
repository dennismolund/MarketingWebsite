const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')




//create account
router.post('/createAccount', function(request,response){
    console.log("HEJ FROM SIGNUP")
    const account = {
      username: request.body.username,
      password: request.body.password
    };
    console.log("Account from ROUTER:", account.username);
    
    accountManager.createAccount(account, function(errors, accounts){
        if(errors){
            console.log("sending over errors: ", errors)
            response.render("account-signup.hbs", errors)
        }})
      

});



router.get('/getAllAccounts', function(request,response){
    accountManager.getAllAccounts(function(array, accounts){
        console.log("ALL ACCOUNTS:", accounts)
    })
})

router.get('/login', function(request, response){
    const enteredAccount = {
        username: request.query.username,
        password: request.query.password
      };

      
      
	accountManager.getAccountByUsername(enteredAccount.username, function(errors, account){

        console.log("*******within accountrouter callback function: ", account, errors)
        console.log("account that is trying to login:", enteredAccount)
        
    })
    
    response.render("account-login.hbs")
})

router.get("/", function(request,response){
	response.render("account-login.hbs")
})

router.get("/signup", function(request,response){
    console.log("RELOAD I SIGNUP")
	response.render("account-signup.hbs")
})



module.exports = router