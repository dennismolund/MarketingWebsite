const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')

//create account
router.post('/createAccount', function(request,response){
    console.log("ACCOUNT ROUTER/createAccount")
    const account = {
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      confirmationPassword: request.body.confirmationPassword
    };
    console.log("ACCOUNT ROUTER/createAccount: creating account:", account);
    
    accountManager.createAccount(account, function(errors, accounts){
        if(errors.length > 0){
            const error = {
                // Only printing out the first error in the stack at the moment. 
                error: errors[0]
            }
            console.log("sending over errors: ", errors[0])
            response.render("account-signup.hbs", error)
        }else{
            response.render("account-login.hbs")
        }
    })
      

});



router.get('/getAllAccounts', function(request,response){
    accountManager.getAllAccounts(function(array, accounts){
        console.log("******ALL ACCOUNTS:", accounts)
    })
})

router.get('/login', function(request, response){ // This should be POST avoid query string with uname pswrd in URL.
    const enteredAccount = {
        username: request.query.username,
        password: request.query.password
      };
    
	accountManager.getAccountByUsername(enteredAccount.username, function(errors, accounts){

        console.log("*******within accountrouter callback function: ", accounts, errors)
        if(enteredAccount.password == (accounts.password)){
            console.log("SUCESSFULL LOGIN")
        }
        response.render("account-login.hbs")
        
    })
    
    
})

router.get("/", function(request,response){
	response.render("account-login.hbs")
})

router.get("/signup", function(request,response){
    console.log("RELOAD I SIGNUP")
	response.render("account-signup.hbs")
})

module.exports = router