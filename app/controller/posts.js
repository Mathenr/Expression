let database = require('../models/database');
let User = require('../models/users.js');
let Post = require('../models/posts.js');

module.exports.getPosts = function(req, res) {

    let promise = Post.find().exec();
    promise.then(
        function(posts) {
            res.json(posts);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.getPostDetails = function(req, res) {

    let id = req.params.id;
    let promise = Post.findOne(
        {
            _id: id
        }).exec();

    promise.then(
        function(user) {
            res.json(user);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.getPoster = function(req, res) {

    let id = req.params.id;

    let promise = Post.findOne(
        {
            _id: id
        }).exec();

    promise.then(
        function(user) {

            let promise = User.findOne({
                _id: user.uid
            }).exec();

            promise.then(
                function(users) {
                    res.json(users);
                },
                function(e) {
                    res.status(500).json(e);
                }
            );
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.setPost = function(req, res){

    let promise = Post.create(req.body);
    promise.then(
        function(c) {
            res.status(201).json(c);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.updatePost = function(req, res) {

    let id = req.params.id;
    let promise = Post.findByIdAndUpdate(id, req.body).exec();
    
    promise.then(
        function(c) {
            res.status(201).json("Atualizado com sucesso!");
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.deletePost = function(req, res) {

    let id = req.params.id;
    let promise = Post.findByIdAndRemove(id).exec();
    
    promise.then(
        function(c) {
            res.status(201).json("Deletado com sucesso!");
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}