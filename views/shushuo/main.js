requirejs.config({
    paths: {
        zepto: '../../public/libs/zepto/zepto',
        d3: '../../public/libs/d3/d3',
        fss: '../../public/libs/flat-surface-shader/deploy/fss',
        hammer: '../../public/libs/hammerjs/hammer',
        swiper: '../../public/libs/Swiper/dist/js/swiper.js'
    },
    shim: {
        zepto: {
          exports: '$'
        },
        fss: {
            exports: 'FSS'
        }
    }
});
requirejs(['./js/index'], function(app) {
    // console.log(fss);
    app.initialize();
});


// http://stackoverflow.com/questions/13425815/how-to-use-requirejs-with-zepto