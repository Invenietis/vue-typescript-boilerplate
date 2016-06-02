# {{ name }}
> vue project using [typescript](http://www.typescriptlang.org), [webpack](https://webpack.github.io) and [systemjs](https://github.com/systemjs/systemjs)

## Build Setup

``` bash

# install gulp globally
npm install -g gulp

# install dependencies
npm install

# build dev file and watch for changes
gulp watch

# build for production with minification
gulp build
```
## Content

### Webpack
[webpack](https://webpack.github.io) is used to bundle all the project dependencies for production.
You can change its configuration with ```weback.config.js```.

### Gulp inject
This project use [gulp inject](https://github.com/klei/gulp-inject) that allow you to inject your Javascript and CSS into your HTML files.
To configure the files to inject, use the ```library.config.js``` file. 

### SystemJS

[systemjs](https://github.com/systemjs/systemjs) is used to lazy load your Javascript dependencies.
You can change its configuration with ```ts/src/default/weback.config.js```.