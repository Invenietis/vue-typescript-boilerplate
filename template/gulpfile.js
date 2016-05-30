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
    lib = require('./library.config.js'),
    plumber = require('gulp-plumber');
    
var tasks = require('./tasks/default')
const nameSpace = "default"
tasks.register(nameSpace, "index");

gulp.task('compile:less', function(){
    return merge( 
            gulp.src(['./ts/src/**/*.less', '!./ts/src/**/*.var.less']),
            gulp.src('./ts/src/**/*.html')
                .pipe(extract({
                    sel: 'style[type="less"]'
                }))
        )
        .pipe(plumber())
        .pipe(sourcemaps.init())       
        .pipe(less())
        .pipe(rename(function (path) {
            if(path.dirname.indexOf('ts\\src\\') == 0){
                path.dirname = path.dirname.substring(7);
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/'));
});

gulp.task('compile:ts', function(){
    var tsResult = gulp.src(['./ts/**/*.ts', './typings/index.d.ts'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        
        return merge([
            tsResult.dts.pipe(gulp.dest('.')),
            tsResult.js
                .pipe(sourcemaps.write('.'))
                .pipe(tpl2js({
                    sourceRoot: __dirname +  '/ts'
                }))
                .pipe(gulp.dest('.'))
        ]);
});  

gulp.task('push', function (params) {
    var tasks = [];
    for(dest in lib.assets){
        tasks.push(gulp.src(lib.assets[dest]).pipe(gulp.dest(dest)));
    }
    
    return merge(tasks);
});

gulp.task('inject:dev', ['inject:dev:'+ nameSpace]);
gulp.task('inject:prod', ['inject:prod:'+ nameSpace]);

gulp.task('watch:less',['compile:less'], function(){
    return gulp.watch(['./ts/**/*.less', './ts/**/*.html'], function(){
        runSequence('compile:less', 'inject:dev')
    });
});

gulp.task('watch:inject', ['inject:dev'], function(){
    return gulp.watch('./library.config.js', ['inject:dev']);
});

gulp.task('watch', ['compile:ts', 'watch:less', 'watch:inject'], function(){
    return gulp.watch(['./ts/**/*.ts', './ts/**/*.html'], ['compile:ts']);
});

gulp.task('build', ['build:' + nameSpace, 'push']);