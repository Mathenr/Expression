let express = require('express');
let usersRouter = require('../app/routes/users');
let postsRouter = require('../app/routes/posts');
let bodyParser = require('body-parser');

module.exports = function() {

    let app = express();
    app.set("port", 3000);
 /*   app.use(express.static('./public')); */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    usersRouter(app);
    postsRouter(app);
    return app;
}