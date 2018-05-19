let controller = require("../controller/users");

module.exports = function(app){
    app.get("/api/users", controller.getUsers);
    app.get("/api/users/:id", controller.getUserDetails);
    app.get("/api/users/:id/posts", controller.getUserPosts);    
    app.post('/api/users', controller.setUser);
    app.put('/api/users/:id', controller.updateUser);
    app.delete('/api/users/:id', controller.deleteUser);
}