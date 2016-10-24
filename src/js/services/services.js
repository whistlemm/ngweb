define(function(require, exports, module){
    module.exports = function(app){
        app.factory('articlesServices', function($http) {
            var articles;
            return {
                getArticles: function(){
                    if(!articles){
                        articles = fetchArticles($http);
                    }
                    return articles;
                },
                getArticleById: function(id) {
                    return fetchArticleById($http, id);
                }
            }
        });

        app.factory('shopServices', function($http){
            return {
                getShopById: function(id){
                    return $http({
                        method: 'get',
                        url: '/api/shop/' + id
                    });
                }
            }
        });

        app.factory('goodsServices', function($http) {
            var goodsPromise;
            return {
                getGoods: function() {
                    if(!goodsPromise) {
                        goodsPromise = fetchGoods($http);
                    }
                    return goodsPromise;
                },
                getGoodsById: function(id) {
                    return $http({
                        method: 'get',
                        url: '/api/goods/' + id
                    })
                }
            }
        })
    }

    function fetchArticles($http){
        return $http({
            method: 'get',
            url: '/api/article'
        })
    }

    function fetchArticleById($http, id) {
        return $http({
            method: 'get',
            url: '/api/article/' + id
        });
    }

    function fetchGoods($http) {
        return $http({
            method: 'get',
            url: '/api/goods'
        })
    }

});