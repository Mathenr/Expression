let database = require('../models/database');
let User = require('../models/users.js');
let Post = require('../models/posts.js');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.getUsers = function(req, res) {

    let promise = User.find().exec();
    promise.then(
        function(users) {
            res.json(users);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.getUserDetails = function(req, res) {

    let id = req.params.id;
    let promise = User.findOne(
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

module.exports.getUserPosts = function(req, res) {

    let id = req.params.id;
    let promise = Post.find({
        uid: id
    }).exec();

    promise.then(
        function(users) {
            res.json(users);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.setUser = function(req, res){

    let newUser = new User({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 5)
    })

    let promise = User.create(newUser);
    promise.then(
        function(c) {
            res.status(201).json("Usuário registrado com sucesso. Id: " + c._id);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.updateUser = function(req, res) {

    let id = req.params.id;

    if (jwt.decode(req.query.token).id == id) {
        let promise = User.findByIdAndUpdate(id, req.body).exec();
    
        promise.then(
            function(c) {
                res.status(201).json("Atualizado com sucesso!");
            },
            function(e) {
                res.status(500).json(e);
            }
        );
    } else {
        res.status(500).json("Você não tem autorização para realizar esse procedimento")
    }
}

module.exports.deleteUser = function(req, res) {

    let id = req.params.id;

    if (jwt.decode(req.query.token).id == id) {
        let promise = User.findByIdAndRemove(id).exec();
        
        promise.then(
            function(c) {
                res.status(201).json("Usuário deletado com sucesso.");
            },
            function(e) {
                res.status(500).json(e);
            }
        );
    } else {
        res.status(500).json("Você não tem autorização para realizar esse procedimento")
    }
}