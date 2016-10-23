define(function(require, exports, module){

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