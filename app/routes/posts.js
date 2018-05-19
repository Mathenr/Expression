let controller = require("../controller/posts");

module.exports = function(app) {
    app.get("/api/posts", controller.getPosts);
    app.get("/api/posts/:id", controller.getPostDetails);
    app.get("/api/posts/:id/user", controller.getPoster);
    app.post('/api/posts', controller.setPost);
    app.put('/api/posts/:id', controller.updatePost);
    app.delete('/api/posts/:id', controller.deletePost);
}