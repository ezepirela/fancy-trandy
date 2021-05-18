const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    googleID: String,
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: 'Order'
    }]
});
userSchema.plugin(passportLocalMongoose, {
	errorMessages:{
	IncorrectPasswordError: 'Password or username are incorrect',
	IncorrectUsernameError: 'Password or username are incorrect'
}});
const User = mongoose.model('User', userSchema)

module.exports = User;