const db = require('./db')

let dummyPost = {
    id: 1,
    username: "Username",
    message: "This is the second post, testing  testing testing testing testing testing testing testingv testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testing testingv testingv testing testing testing"
}
let dummyArray = [dummyPost]

exports.getAllPosts = function(callback){
    console.log("get all posts from database")
    const query = `SELECT * FROM gbPosts ORDER BY id`
	const values = []
	
	db.query(query, values, function(error, posts){
		if(error){
            console.log(error)
			callback(['databaseError'], null)
		}else{
            console.log("Returning from DB: ", posts)
            posts.push(dummyPost)
			callback([], posts)
		}
	})
}
exports.createPost = function(newPost, callback){
    console.log(newPost)
    const query = 'INSERT INTO gbPosts (username, message) VALUES (?, ?)'
    const values = [newPost.username, newPost.message]
    db.query(query, values, function(error, results){
        if(error){
            console.log("error creating post")
            callback(error, null)
        }
        else{
            callback([], results.inserId)
        }
    })

}