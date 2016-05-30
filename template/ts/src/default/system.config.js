/**
 * Configure javascript files lazy loading
 */
var root = "";
 
System.config({
    baseURL: '/',
    defaultJSExtensions: true,
    paths: {
        '*': './' + root + 'node_modules/*',
        'src/*': root + 'src/*'
    },
    packageConfigPaths: ['./' + root + 'node_modules/*/package.json'],
});
Promise.all([
    System.import('src/default/components/app')
]).then(null, console.error.bind(console));