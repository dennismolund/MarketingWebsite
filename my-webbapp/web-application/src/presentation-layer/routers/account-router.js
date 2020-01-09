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




router.post('/login', function(request, response){ 
    const enteredAccount = {
        username: request.body.username,
        password: request.body.password
      };
    
	accountManager.getAccountByUsername(enteredAccount.username, function(errors, accounts){
        const model ={
            error: errors,
            account: accounts
        }
        console.log("account model: ", model.account.username)

        if(enteredAccount.password == model.account.password){
            console.log("SUCESSFULL LOGIN")
            
            request.session.currentAccount = {username: model.account.username}
            response.render("home.hbs", {username: request.session.currentAccount.username})
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

router.get('/signup', function(request,response){
    response.render("account-signup.hbs")
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