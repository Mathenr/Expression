let database = require('../models/database');

module.exports.getPosts = function(req, res) {
    res.json(database.posts);
}

module.exports.getPostDetails = function(req, res) {
    let id = req.params.id;
    let post = database.posts.find(post => (post._id == id));

    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post não encontrado');
    }
}

module.exports.getPoster = function(req, res) {
    post = database.posts.find(post => post._id == req.params.id);
    user = database.users.find(i => i._id == post.uid);
    res.json(user);
}

module.exports.setPost = function(req, res){
    database.posts.push(req.body);
    res.status(200).send(req.body);
}

module.exports.updatePost = function(req, res) {
    index = database.posts.findIndex(i => i._id == req.body._id);
    database.posts[index] = req.body;
    res.status(200).send(req.body);
}

module.exports.deletePost = function(req, res) {
    index = database.posts.findIndex(i => i._id == req.body._id);
    database.posts.splice(index, 1);
    res.status(200).send(req.body);
}