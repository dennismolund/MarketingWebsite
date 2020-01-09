const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}
exports.getAllExperiences = function(callback){
	accountRepository.getAllExperiences(callback)
}

exports.createAccount = function(account, callback){
	
	// Validate the account.
	console.log("ACCOUNT MANAGER: account: ", account)
	const errors = accountValidator.getErrorsNewAccount(account)
	
	if(0 < errors.length){
		console.log("ACCOUNT MANAGER Errors creating account, errors.lenght > 0", errors)
		callback(errors, null)
		return
	}
	
	accountRepository.createAccount(account, callback)
}

exports.getAccountByUsername = function(username, callback){	
	accountRepository.getAccountByUsername(username, callback)
	
}

