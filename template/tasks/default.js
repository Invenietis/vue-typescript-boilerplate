var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    merge = require('merge2'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('./tsconfig.json'),
    runSequence = require('run-sequence'),
    webpack = require('webpack-stream'),
    rename = require('gulp-rename'),
    extract = require("gulp-html-extract"),
    inject = require('gulp-inject'),
    tpl2js = require('gulp-vue-template2js'),
    rimraf = require('gulp-rimraf'),
    lib = require('../library.config.js');
    
function register(nameSpace, fileName, appRoot){
    
    gulp.task('inject:dev:' + nameSpace, function () {
        var target = gulp.src('./'+ fileName +'.html');
    
        // It's not necessary to read the files (will speed up things), we're only after their paths: 
        var sources = gulp.src(
            lib.css[nameSpace]
            .concat([ './src/**/*.css'])
            .concat(lib.js[nameSpace].concat([
                './node_modules/systemjs/dist/system.src.js', 
                './ts/src/' + nameSpace +  '/system.config.js'
            ])), { read: false});
        
        return target.pipe(inject(sources, {
                addPrefix:appRoot
            }))
            .pipe(gulp.dest('.'));
    });

    gulp.task('inject:prod:' + nameSpace, function () {
        var target = gulp.src('./' + fileName + '.html');
        
        // It's not necessary to read the files (will speed up things), we're only after their paths: 
        var sources = gulp.src([ './dist/'+ nameSpace +'.min.*' ], { read: false });
        
        return target.pipe(inject(sources, {
                addPrefix:appRoot
            }))
            .pipe(gulp.dest('.'));
    });

    gulp.task('bundle:js:app:'+ nameSpace, ['compile:ts'], function() {
        return gulp.src('./src/'+ nameSpace +'/components/app.js')
                .pipe(webpack( require('../webpack.config.js') ))
                .pipe(gulp.dest('./dist/'+ nameSpace ));
    });

    gulp.task('bundle:js:'+ nameSpace, ['bundle:js:app:'+ nameSpace], function() {
        return gulp.src(lib.js[nameSpace].concat(['./dist/'+ nameSpace +'/bundle.js']))
                .pipe(concat( nameSpace +'.js'))
                .pipe(gulp.dest('./dist'));
    });

    gulp.task('bundle:css:'+ nameSpace, ['compile:less'],function(){
        return gulp.src(lib.css[nameSpace].concat(['./src/common/**/*.css', './src/'+ nameSpace +'//**/*.css']))
            .pipe(concat( nameSpace +'.css'))
            .pipe(gulp.dest('./dist/'));
    });

    gulp.task('min:css:'+ nameSpace, ['bundle:css:'+ nameSpace], function(){
        return gulp.src('./dist/'+ nameSpace +'.css')
            .pipe(cssmin())
            .pipe(concat(nameSpace +'.min.css'))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('min:js:'+ nameSpace, ['bundle:js:'+ nameSpace],function(){
        return gulp.src('./dist/'+ nameSpace +'.js')
            .pipe(uglify())
            .pipe(concat(nameSpace +'.min.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('clean:'+ nameSpace, function(cb) {
        return gulp.src([
            './dist/'+ nameSpace,
            './dist/'+ nameSpace +'.*',
            '!./dist/'+ nameSpace +'.min.*'
        ]).pipe(rimraf());
    });

    gulp.task('build:'+ nameSpace, function(cb){
        runSequence(['min:js:'+ nameSpace, 'min:css:'+ nameSpace], ['inject:prod:'+ nameSpace, 'clean:'+ nameSpace]);
    });   
}
module.exports.register = register;