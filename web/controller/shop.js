var shopModel = require('../models/shop'),
    goodsModel = require('../models/goods'),

    multiparty = require('multiparty'),
    path = require('path'),
    fs = require('fs')

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

exports.saveUpload = function(req, res, next) {

    var newUpload = new multiparty.Form();
    newUpload.parse(req, function(err, fields, files) {
        if(err) return next(err);

        req.fields = fields
        var file = files.logo[0]

        fs.readFile(file.path, function(err, data) {
            if(err) return next(err);

            var timestamp = (new Date()).getTime(),
                newFilename = timestamp + '.' + file.originalFilename.split('.')[1]

            fs.writeFile(path.resolve(__dirname, '../upload/' + newFilename), data, function(err) {
                if(err) return next(err);
                req.files = {
                    logo: newFilename
                }
                next()
            })

        })


    })
}

exports.add = function(req, res, next) {

    var fields = req.fields
    fields.logo = req.files.logo;

    var id = req.body._id;

    if (id) {
        shopModel.findById(id, function(err, doc) {
            if(err) return next(err);
            
            doc.update(fields, function(err, doc) {
                if(err) return next(err);

                res.redirect('/admin/shop')
            })
        })
    }else {
        console.log(req.body)
        var newShop = new shopModel(fields)

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