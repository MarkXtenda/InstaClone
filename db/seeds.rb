User.create(username: "Luke")
User.create(username: "Puke")
User.create(username: "Muke")

4.times{ |i| user.last.posts.create(image: "", caption: "Post number:#{i}")
}