let controller = require("../controller/users");
let auth = require("../controller/auth");

module.exports = function(app){
    app.post("/api/users/login", auth.login);
    app.post('/api/users', controller.setUser);
    app.use('/api/users', auth.verifyToken);
    app.get('/api/users', controller.getUsers);
    app.get('/api/users/:id', controller.getUserDetails);
    app.get('/api/users/:id/posts', controller.getUserPosts);
    app.put('/api/users/:id', controller.updateUser);
    app.delete('/api/users/:id', controller.deleteUser);
}