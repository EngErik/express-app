var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    userName : String,
    password : String
});

mongoose.model('User', UserSchema);
