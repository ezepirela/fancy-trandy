const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {required: true, type: String},
    firstName: {required: true, type: String},
    lastName: {required: true, type: String},
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