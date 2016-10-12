var mongoose = require('mongoose'),
    goodsSchema = require('../schema/goods'),

    goodsModel = mongoose.model('goods', goodsSchema)

module.exports = goodsModel