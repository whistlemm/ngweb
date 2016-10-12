define(function(){
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