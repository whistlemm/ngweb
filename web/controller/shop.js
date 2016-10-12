var shopModel = require('../models/shop'),
    goodsModel = require('../models/goods')

exports.index = function(req, res, next) {
    shopModel.fetch(function(err, shops) {
        if(err) return next(err);

        res.render('shop', {
            shops: shops
        })
    })
}

exports.showUpdate = function(req, res, next) {
    var id = req.query._id

    shopModel.fetch(function(err, shops) {
        if(err) return next(err);
        
        shopModel.findById(id, function(err, shop){
            if(err) return next(err);

            res.render('shop', {
                shop: shop,
                shops: shops,
                btn: '#update'
            })
        })
        
    })
}

exports.detail = function(req, res, next) {
    var id = req.query._id

    shopModel.findById(id, function(err, doc){
        if(err) return next(err);
        
        res.render('articleDetail', {
            shop: doc
        })    
    })
}

exports.add = function(req, res, next) {
    var id = req.body._id;

    if (id) {
        shopModel.findById(id, function(err, doc) {
            if(err) return next(err);
            
            doc.update(req.body, function(err, doc) {
                if(err) return next(err);

                res.send('success')
            })
        })
    }else {
        console.log(req.body)
        var newShop = new shopModel(req.body)

        newShop.save(function(err, doc) {
            if(err) return next(err);

            res.send('success')
        })
    }
}

exports.del = function(req, res, next) {
    var id = req.query._id

    shopModel.findById(id, function(err, doc){
        if(err) return next(err);

        doc.remove(function(err) {
            if(err) return next(err);
            
            res.redirect('/admin/shop')
        })
    })
}

exports.getShops = function(req, res, next) {
    var id = req.params._id

    if(id) {
        shopModel.findById(id, function(err, shop) {
            if(err) return next(err);

            goodsModel.find({shop: id}, function(err, goodsList) {
                if(err) return next(err);

                var ret = {
                    shop: shop,
                    goodsList: goodsList
                }
                res.send(ret)
            })
        })
    }else{
        shopModel.fetch(function(err, shops) {
            if(err) return next(err);

            res.send(shops)
        })
    }
}