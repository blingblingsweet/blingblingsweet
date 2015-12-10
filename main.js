requirejs.config({
    baseUrl: 'public/javascripts/',
    paths: {
        index: './index',
        requestAnimationFrame: './requestAnimationFrame',
        jqParallax: './jquery.parallax',
        parallax: './parallax',
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