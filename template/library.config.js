var defaultJs = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/ms-signalr-client/jquery.signalr-2.2.0.js",
    './node_modules/es6-promise/dist/es6-promise.min.js',
    "./node_modules/vue/dist/vue.js",
    "./node_modules/vue-router/dist/vue-router.js",
    "./node_modules/ck-layout/dist/ck-layout-vue.js"
];

var defaultCss = [
    
];

module.exports = {
    js : {
        default: defaultJs,
    },
    css: {
        default: defaultCss,
    },
    //{ [target:string]: sources: string | string[] }
    assets: {
        
    }
};