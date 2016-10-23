var fs = require('fs'),
    path = require('path')

var Admin = require('./controller/admin'),
    Article = require('./controller/article'),
    Shop = require('./controller/shop'),
    Goods = require('./controller/goods');

module.exports = function(app) {


    /**
     * API 获取所有文章
     */
    app.get('/api/article', Article.getArticles)
    app.get('/api/article/:_id', Article.getArticles)

    /**
     * API 获取商家
     */
    app.get('/api/shop', Shop.getShops)
    app.get('/api/shop/:_id', Shop.getShops)

    app.get('/api/goods', Goods.getGoods)
    app.get('/api/goods/:_id', Goods.getGoods)
    /**
     * 登录登出逻辑
     */
    app.get('/admin/login', Admin.login)
    app.post('/admin/login', Admin.doLogin)
    app.get('/admin/logout', Admin.logout)

    /**
     * 首页
     */
    app.get('/admin/index',Admin.requireLogin, Admin.index)

    /**
     * 文章相关处理逻辑
     */
    app.post('/admin/article', Admin.requireLogin, Article.add)
    app.get('/admin/article/del', Admin.requireLogin, Article.del)
    app.get('/admin/article/update', Admin.requireLogin, Article.showUpdate)
    app.get('/admin/article/', Admin.requireLogin, Article.index)

    /**
     * 商店管理
     */
    app.get('/admin/shop', Admin.requireLogin, Shop.index)
    app.post('/admin/shop', Admin.requireLogin, Shop.saveUpload, Shop.add)
    app.get('/admin/shop/del', Admin.requireLogin, Shop.del)
    app.get('/admin/shop/update', Admin.requireLogin, Shop.showUpdate)

    /**
     * 商品管理
     */
    app.get('/admin/goods', Admin.requireLogin, Goods.index)
    app.post('/admin/goods', Admin.requireLogin, Goods.uploadImages, Goods.add)
    app.get('/admin/goods/del', Admin.requireLogin, Goods.del)
}
