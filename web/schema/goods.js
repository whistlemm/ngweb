var mongoose = require('mongoose'),

    ObjectId = mongoose.Schema.Types.ObjectId

var goodsSchema = new mongoose.Schema({
    title: String,
    des: String,
    stars: {
        type: Number,
        default: 0
    },
    info: String,
    shop: { type: ObjectId, ref: "shop" },
    images: [{type: String}],
    money: {
        old: {
            type: Number,
            default: 0
        },
        new: {
            type: Number,
            default: 0
        }
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

goodsSchema.pre('save', function(next){

    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
})

goodsSchema.statics = {
    fetch: function(cb){
        return this.find({})
                   .populate('shop', 'title')
                   .sort('meta.updateAt')
                   .exec(cb);
    },
    findById: function(id, cb){
        return this.findOne({_id: id})
                   .exec(cb);
    }
}

module.exports = goodsSchema