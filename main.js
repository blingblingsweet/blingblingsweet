requirejs.config({
    baseUrl: 'public/javascripts/',
    paths: {
        index: './index',
        requestAnimationFrame: './requestAnimationFrame',
        jqParallax: '../libs/parallax/deploy/jquery.parallax',
        requestAnimationFrame: './requestAnimationFrame',
        jquery: '../libs/jquery/dist/jquery',
        react: '../libs/react/react'
    },
    shim: {
        jqParallax: {
            deps: ['jquery']
        }
    }
});
requirejs(['jquery', 'index'], function($, index) {
    // console.log('ok', $);
});