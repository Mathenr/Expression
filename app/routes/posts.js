let controller = require("../controller/posts");
let auth = require("../controller/auth");

module.exports = function(app) {
    app.use('/api/posts', auth.verifyToken);
    app.post('/api/posts', controller.setPost);
    app.get('/api/posts', controller.getPosts);
    app.get('/api/posts/:id', controller.getPostDetails);
    app.get('/api/posts/:id/user', controller.getPoster);
    app.put('/api/posts/:id', controller.updatePost);
    app.delete('/api/posts/:id', controller.deletePost);
}