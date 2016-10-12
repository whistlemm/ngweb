var mongoose = require('mongoose'),

    ObjectId = mongoose.Schema.Types.ObjectId

var articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    stars: {type: Number, default: 0},
    shops: [{
        shop: {type: ObjectId, ref: "shop"},
        des: String
    }],
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

articleSchema.pre('save', function(next){
    var user = this

    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }

    next()
})

articleSchema.statics = {
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

module.exports = articleSchema