let database = require('../models/database');
let User = require('../models/users.js');
let Post = require('../models/posts.js');

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

    // res.json(database.users);
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

    /*
    let id = req.params.id;
    let user = database.users.find(user => (user._id == id));

    if (user) {
            res.json(user);
    } else {
            res.status(404).send('Usuário não encontrado');
    } */
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

    let promise = User.create(req.body);
    promise.then(
        function(c) {
            res.status(201).json(c);
        },
        function(e) {
            res.status(500).json(e);
        }
    );

    /* database.users.push(req.body);
    res.status(200).send(req.body._id); */
}

module.exports.updateUser = function(req, res) {

    let id = req.params.id;
    let promise = User.findByIdAndUpdate(id, req.body).exec();
    
    promise.then(
        function(c) {
            res.status(201).json("Atualizado com sucesso!");
        },
        function(e) {
            res.status(500).json(e);
        }
    );

    /* index = database.users.findIndex(i => i._id == req.body._id);
    database.users[index] = req.body;
    res.status(200).send(req.body);
    */
}

module.exports.deleteUser = function(req, res) {

    let id = req.params.id;
    let promise = User.findByIdAndRemove(id).exec();
    
    promise.then(
        function(c) {
            res.status(201).json("Deletado com sucesso!");
        },
        function(e) {
            res.status(500).json(e);
        }
    );
    /* 
    index = database.users.findIndex(i => i._id == req.body._id);
    database.users.splice(index, 1);
    res.status(200).send(req.body);
    */
}