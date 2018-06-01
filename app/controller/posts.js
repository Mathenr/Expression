let database = require('../models/database');
let User = require('../models/users.js');
let Post = require('../models/posts.js');
let jwt = require('jsonwebtoken');

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

    let newPost = new Post({
        _id: req.body._id,
        text: req.body.text,
        likes: req.body.likes,
        uid: jwt.decode(req.query.token).id
    })

    let promise = Post.create(newPost);
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
    let post = Post.findOne({_id: id}).exec();
    let promise = Post.findByIdAndUpdate(id, req.body).exec();

    post.then(
        function(c) {
            let uid = c.uid
            if (jwt.decode(req.query.token).id == uid) {
                promise.then(
                    function(f) {
                        res.status(201).json("Atualizado com sucesso");
                    },
                    function(e) {
                        res.status(500).json("Erro:" + e);
                    }
                );
            } else {
                res.status(500).json("Você não tem autorização para realizar esse procedimento")
            } 
        }
    );
}

module.exports.deletePost = function(req, res) {

    let id = req.params.id;
    let post = Post.findOne({_id: id}).exec();
    let promise = Post.findByIdAndRemove(id).exec();

    post.then(
        function(c) {
            let uid = c.uid
            if (jwt.decode(req.query.token).id == uid) {
                promise.then(
                    function(f) {
                        res.status(201).json("Deletado com sucesso!");
                    },
                    function(e) {
                        res.status(500).json("Erro:" + e);
                    }
                );
            } else {
                res.status(500).json("Você não tem autorização para realizar esse procedimento")
            } 
        }
    );
}