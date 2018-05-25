var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
      },
    name: {
       type: String,
       required: true
      },
    email: {
       type: String,
       required: true
       },
    senha: {
        type: String,
        required: true
    }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
