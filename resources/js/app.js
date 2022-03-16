require('./bootstrap');

import router from "./routes"
import VueRouter from "vue-router/dist/vue-router"
import Vue from "vue";

window.Vue = require('vue').default;

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
});
