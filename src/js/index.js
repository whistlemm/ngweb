define(function(require, exports) {
    // resize
    require('./components/resize')

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
        })
    });

    // 这是首页的指令
    require('./directives/index')(app);
    // services
    require('./services/services')(app);


    app.run(function($rootScope){
        console.log('run')
    })
    /**
     * 首页控制器
     */
    app.controller('homeController', function($scope, articlesServices){
        articlesServices.getArticles().success(function(data, status, header){
            $scope.articles = data;
        })
    })
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
            console.log(data);
            $scope.article = data;
        })
    });

    app.controller('shopController', ['$scope','$routeParams', 'shopServices', function($scope, $routeParams, shopServices){
        var shopId = $routeParams.id;
        shopServices.getShopById(shopId).success(function(data){
            console.log(data)
            $scope.shop = data.shop;
            $scope.goodsList = data.goodsList;
        })
    }])
})