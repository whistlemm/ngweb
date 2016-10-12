var request = require('request'),
    articleModel = require('../models/article'),
    shopModel = require('../models/shop'),


    util = require('util')

exports.index = function(req, res){
    articleModel.fetch(function(err, articles){
        if(err) return next(err)

        shopModel.fetch(function(err, shops) {
            if(err) return next(err)
            res.render('article', {
                'articles': articles,
                'shops': shops,
            })
        })

    })
}

exports.add = function(req, res, next){
    var _article = req.body,
        shops = []
    
    _article.shops._id.forEach(function(item, i){
        shops.push({
            shop: item,
            des: _article.shops.des[i]
        })
    })
    _article.shops = shops
    if(!!req.body._id){
        articleModel.findById(_article._id, function(err, doc) {
            if(err) return next(err);

            doc.update(_article, function(err, doc) {
                if(err) return next(err);

                console.log(doc)
                return res.redirect('/admin/article')
            })
        })
    }else{

        var article = new articleModel(_article)

        article.save(function(err, doc) {
            if(err){
                console.log(err)
            }
            return res.redirect('/admin/article')
        })
    }


}
exports.del = function(req, res, next){
    var id = req.query._id
    
    articleModel.findById(id, function(err, doc) {
        if(err){
            return next(err)
        }

        doc.remove(function(err, doc) {
            if(err){
                return next(err)
            }

            res.redirect('/admin/article')
        })
    })
}
exports.showUpdate = function(req, res){
    var id = req.query._id;

    articleModel.fetch(function(err, articles){
        if(err) return next(err);

        shopModel.fetch(function(err, shops) {
            if(err) return next(err);

            articleModel.findOne({_id: id}, function(err, article){
                if(err) return next(err);
                res.render('article', {
                    btn: '#update',
                    article: article,
                    articles: articles,
                    shops: shops
                })
            })
        })
    })
}

exports.getArticles = function(req, res, next) {
    var _id = req.params._id

    if(_id) {
        articleModel.findOne({'_id': _id})
                    .populate('shops.shop')
                    .exec(function(err, doc) {
                        if(err) return next(err);
                        res.send(doc)
                    })
    }else{
        articleModel.fetch(function(err, doc, next) {
            if(err) return next(err);

            res.send(doc)
        })
    }

}
