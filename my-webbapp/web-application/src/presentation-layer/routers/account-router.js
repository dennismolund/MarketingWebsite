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




router.post('/login', function(request, response){ // This should be POST avoid query string with uname pswrd in URL.
    const enteredAccount = {
        username: request.body.username,
        password: request.body.password
      };
    
	accountManager.getAccountByUsername(enteredAccount.username, function(errors, accounts){
        const module ={
            error: errors,
            account: accounts
        }
        console.log("account module: ", module.account.username)

        if(enteredAccount.password == module.account.password){
            console.log("SUCESSFULL LOGIN")
            
            request.session.currentAccount = {username: module.account.username}
            request.session.isLoggedIn = true
            response.render("home.hbs", {username: request.session.currentAccount.username, isLoggedIn: request.session.isLoggedIn})
        }
        else{response.render("account-login.hbs")}
        
    })
})

router.get("/", function(request,response){
	response.render("account-login.hbs")
})

router.get("/logout", function(request,response){
    console.log("Logout")
    request.session.destroy(function(err) {
        // cannot access session here
      })
	response.render("home.hbs")
})

router.get('/getAllAccounts', function(request,response){
    accountManager.getAllAccounts(function(array, accounts){
        console.log("ALL ACCOUNTS:", accounts)
    })
})

router.get("/getAllexperiences", function(request, response){
    accountManager.getAllExperiences(function(array, experiences){
        console.log("ALL Experiences:", experiences, array)
    })
})

module.exports = router