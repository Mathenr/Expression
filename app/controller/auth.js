let User = require('../models/users');
let bycript = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports.login = function(req, res) {

    let promise = User.findOne({email: req.body.email}).exec();  
    promise.then(
        function login(user) {
            if (bycript.compareSync(req.body.senha, user.senha)) {
                let token = jwt.sign({id: user._id}, 'segredinho');
                res.status(200).json({
                    message: "Usuário logado no sistema.",
                    token: token
                })
            } else {
                res.status(401).send("Credenciais Incorretas");
            }
        }
    ).catch(
        function(){
        res.status(401).send("Erro interno.");
        }
    )
}

module.exports.verifyToken = function(req, res, next) {
    jwt.verify(req.query.token, 'segredinho', function(err, decoded) {
        if (err) {
            res.status(401).json({
                message: "Usuário sem autorização."
            });
        } else {
            next();
        }
    });
}