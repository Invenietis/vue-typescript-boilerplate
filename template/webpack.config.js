var lib = require('./library.config.js');

module.exports = {  
    target: 'node',
    output: {
        filename: 'bundle.js'
    },
    // devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js'],
    }
}