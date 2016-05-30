import router from '../router.config';
require('../di.config');

var app = Vue.extend( {
    template: "@" //Means that the HTML is located at ./app.html
});

//bootstrap the application using the router on the app component
router.start(app, "app");