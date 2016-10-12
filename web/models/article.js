var mongoose = require('mongoose'),
    artcileSchema = require('../schema/article')

    articleModel = mongoose.model('article', artcileSchema)

module.exports = articleModel