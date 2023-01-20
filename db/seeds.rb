User.create(username: "Luke")
User.create(username: "Puke")
User.create(username: "Muke")

4.times{ |i| Post.create(user_id: 1, caption: "Post number:#{i}")
}