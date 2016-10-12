var goodsModel = require('../models/goods'),
    shopModel = require('../models/shop')


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

exports.add = function(req, res, next) {
    var id = req.body._id

    if (id) {
        goodsModel.findById(id, function(err, doc) {
            if(err) return next(err);
            
            doc.update(req.body, function(err, doc) {
                if(err) return next(err);

                res.redirect('/admin/goods')
            })
        })
    }else {
        var newGoods = new goodsModel(req.body)
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
