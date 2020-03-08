const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 15
const MIN_PASSWORD_LENGTH = 5
const usernameToShort = "Username to short (Min 3 characters)"
const usernameToLong = "Username to long (Max 15 characters)"
const passwordToShort = "Password to short (Min 5 characters)"
const passwordDontMatch = "Passwords didn't match, please try again"

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	console.log("ACCOUNT VALIDATOR: account: ", account)
	// Validate username.
	if(account.password.length < MIN_PASSWORD_LENGTH){
		errors.push(passwordToShort)
	}
	if(account.username.length < MIN_USERNAME_LENGTH){
		errors.push(usernameToShort)
	}
	if(MAX_USERNAME_LENGTH < account.username.length){
		errors.push(usernameToLong)
	}
	if(account.password != account.confirmationPassword){
		console.log("pushing error passwordDontMatch")
		errors.push(passwordDontMatch)
		console.log("Errors: ", errors)
	}
	
	return errors
}

exports.accountAuthentication = function(account){
	
}