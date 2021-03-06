define('services',function(require, exports, module){
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
define('index_gulp-cmd_3',function(require, exports, module){

    module.exports = function(app) {
        /**
         *  文章列表页面
         */
        app.directive('articleList', function(){
            return {
                templateUrl: '/public/pages/Index/articlePanel.html',
                restrict: "AE",
                replace: true,
                scope: true,
            };
        });

        app.directive('tabbar', function(){
            return {
                templateUrl: '/public/pages/components/tabbar.html',
                restrict: 'AE',
                scope: true
            }
        })

        app.directive('goodsList', function(){
            return {
                templateUrl: '/public/pages/Index/goodsList.html',
                restrict: 'AE',
                replace: true,
                scope: true
            }
        })
    }
})
define('resize',function(){
    document.addEventListener('DOMContentLoaded', function(){
        var designWidth = 7.5;
        var reEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'

        window.addEventListener(reEvent, rescale, false);
        rescale();
        function rescale(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        };
    }, false);
})
define('index',['resize','index_gulp-cmd_3','services'],function(require, exports) {
    // resize
    require('resize')

    var app = angular.module('App', ['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: '/public/pages/Index/index.html',
            controller: 'homeController'
        }).when('/articles/:id', {
            controller: 'articleController',
            templateUrl: '/public/pages/Index/article.html'
        }).when('/friend', {
            templateUrl: '/public/pages/Friend/friend.html',
            controller: 'friendController'
        }).when('/user', {
            templateUrl: '/public/pages/User/user.html',
            controller: 'userController'
        }).when('/shop/:id', {
            controller: 'shopController',
            templateUrl: '/public/pages/Shop/shop.html'
        }).when('/goods/:id', {
            controller: 'goodsController',
            templateUrl: '/public/pages/Goods/goods.html'
        })
    });

    // 这是首页的指令
    require('index_gulp-cmd_3')(app);
    // services
    require('services')(app);


    app.run(function($rootScope){
        console.log('run')
    })
    /**
     * 首页控制器
     */
    app.controller('homeController', ['$scope', 'articlesServices', 'goodsServices', function($scope, articlesServices, goodsServices){
        articlesServices.getArticles().success(function(data, status, header){
            $scope.articles = data;
        });
        goodsServices.getGoods().success(function(data, status, header) {
            $scope.goodsList = data;
        });
    }]);
    /**
     * 好友去哪儿控制器
     */
    app.controller('friendController', function($scope, articlesServices){
    })
    /**
     * 个人中心控制器
     */
    app.controller('userController', function($scope){
        $scope.articles = [
        ]
    })
    /**
     * 文章页控制器
     */
    app.controller('articleController', function($scope, $routeParams, articlesServices){
        articlesServices.getArticleById($routeParams.id).success(function(data){
            $scope.article = data;
        })
    });

    app.controller('shopController', ['$scope','$routeParams', 'shopServices', function($scope, $routeParams, shopServices){
        var shopId = $routeParams.id;
        shopServices.getShopById(shopId).success(function(data){
            $scope.shop = data.shop;
            $scope.goodsList = data.goodsList;
        })
    }])

    app.controller('goodsController', ['$scope', '$routeParams', 'goodsServices', function($scope, $routeParams, goodsServices) {
        var goodsId = $routeParams.id;
        goodsServices.getGoodsById(goodsId).success(function(data){
            $scope.goods = data;
        })
    }])







})
seajs.use('index')
