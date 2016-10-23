var goodsModel = require('../models/goods'),
    shopModel = require('../models/shop'),

    utils = require('../lib/utils'),

    multiparty = require('multiparty'),
    fs = require('fs'),
    path = require('path')

var uploadPath = path.resolve(__dirname, '../upload/goods')

exports.index = function(req, res, next) {
    var shopId = req.query.shopId
    
    goodsModel.fetch(function(err, goodsList) {
        var goodsId = req.query._id
        if(err) return next(err);
        var ret = {
            goodsList: goodsList
        }

        if(shopId){
            // add
            shopModel.findById(shopId, function(err, shop) {
                if(err) return next(err);

                
                ret.btn = '#add'
                ret.shop = shop

                res.render('goods', ret)
            })
        }else if (goodsId) {
            // update
            // goodsModel.findById(goodsId, function(err, goods) {
            //     if(err) return next(err);
                
            //     ret.btn = '#update'
            //     ret.goods = goods
            //     res.render('goods', ret)
            // });
            goodsModel
                .findOne({_id: goodsId})
                .populate('shop', 'title')
                .exec(function(err, goods) {
                    if(err) return next(err);

                    ret.btn = '#update'
                    ret.goods = goods
                    console.log('ret----------------', ret)
                    res.render('goods', ret)
                })
        }else{
            
            res.render('goods', ret)
        }
    })

}

exports.uploadImages = function(req, res, next) {

    var newUpload = new multiparty.Form();
    newUpload.parse(req, function(err, fields, files) {
        if(err) return next(err);
        var images = files.images
        
        var pathList = []
        var promiseArr = images.map(function(image) {

            var timestamp = (new Date()).getTime(),
                filename = timestamp + '.' + image.originalFilename.split('.')[1],
                filepath = path.join(uploadPath, filename)

            pathList.push(filepath)

            return utils.readFilePromise(image.path).then(function(data){
                utils.writeFilePromise(filepath, data)
            })
        })

        Promise.all(promiseArr).then(function(data){
            req.fields = fields,
            req.files = pathList
            next();
        }).catch(function(err) {
            return next(err);
        })
    })
}


exports.add = function(req, res, next) {
    req.fields.images = req.files

    var fields = req.fields

    var id = req.body._id

    if (id) {
        goodsModel.findById(id, function(err, doc) {
            if(err) return next(err);
            
            doc.update(fields, function(err, doc) {
                if(err) return next(err);

                res.redirect('/admin/goods')
            })
        })
    }else {
        var newGoods = new goodsModel(fields)
        newGoods.save(function(err, doc) {
            if(err) return next(err);

            res.redirect('/admin/goods')
        })
    }
}

exports.del = function(req, res, next) {
    console.log('del')
    goodsModel.findById(req.query._id, function(err, doc){
        if(err) return next(err);

        doc.remove(function(err) {
            if(err) return next(err);
            
            res.send('success')
        })
    })
}

exports.getGoods = function(req, res, next) {
    var _id = req.params._id;

    if (_id) {
        goodsModel.findById(_id, function(err, doc) {
            if(err) return next(err);

            res.send(doc)
        })
    } else {
        goodsModel.fetch(function(err, docs) {
            if(err) return next(err);

            res.send(docs)
        })
    }
}
