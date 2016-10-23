var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var shopSchema = new mongoose.Schema({
    title: String,
    stars: {type: Number, default: 0},
    location: String,
    phone: String,
    logo: String,
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

shopSchema.pre('save', function(next){
    var user = this

    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    next();
})

shopSchema.statics = {
    fetch: function(cb){
        return this.find({})
                   .sort('meta.updateAt')
                   .exec(cb);
    },
    findById: function(id, cb){
        return this.findOne({_id: id})
                   .exec(cb);
    }
}

module.exports = shopSchema