var mongoose = require('mongoose'),
    userSchema = require('../schema/user'),

    userModel = mongoose.model('users', userSchema);

module.exports = userModel

