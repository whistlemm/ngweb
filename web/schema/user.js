var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    // 计算强度
    saltRounds = 10

var userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
    },
    password: {
        type: String
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

userSchema.methods = {
    compilePassword: function(password, cb){
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if(err){
                return cb(err);
            }
            cb(null, isMatch)
        })
    }
}


userSchema.pre('save', function(next){
    var user = this

    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        if(err) return next(err);

        user.password = hash
        next()
    })
})

module.exports = userSchema