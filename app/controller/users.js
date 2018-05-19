let database = require('../models/database');

module.exports.getUsers = function(req, res) {
    res.json(database.users);
}

module.exports.getUserDetails = function(req, res) {
    let id = req.params.id;
    let user = database.users.find(user => (user._id == id));

    if (user) {
            res.json(user);
    } else {
            res.status(404).send('Usuário não encontrado');
    }
}

module.exports.getUserPosts = function(req, res) {
    user = database.users.find(user => (user._id == req.params.id));
    postList = [];
    
    for (post of database.posts) {
        if (post.uid == user._id) {
           postList.push(post); 
        }
    }

    res.json(postList);
}

module.exports.setUser = function(req, res){
    database.users.push(req.body);
    res.status(200).send(req.body._id);
}

module.exports.updateUser = function(req, res) {
    index = database.users.findIndex(i => i._id == req.body._id);
    database.users[index] = req.body;
    res.status(200).send(req.body);
}

module.exports.deleteUser = function(req, res) {
    index = database.users.findIndex(i => i._id == req.body._id);
    database.users.splice(index, 1);
    res.status(200).send(req.body);
}