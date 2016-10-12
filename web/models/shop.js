var mongoose = require('mongoose'),
    shopSchema = require('../schema/shop'),

    shopModel = mongoose.model('shop', shopSchema);

module.exports = shopModel