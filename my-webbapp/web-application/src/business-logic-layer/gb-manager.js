const gbrepository = require('../data-access-layer/gb-repository')

exports.getAllPosts = function(callback){
	gbrepository.getAllPosts(callback)
}

exports.createPost = function(newPost, callback){
	gbrepository.createPost(newPost, callback)
}