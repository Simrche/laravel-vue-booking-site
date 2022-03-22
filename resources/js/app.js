require('./bootstrap');

import router from "./routes"
import VueRouter from "vue-router/dist/vue-router"
import Vue from "vue";
import Index from "./Index"
import moment from "moment";

window.Vue = require('vue').default;

Vue.use(VueRouter);

Vue.filter("fromNow", value => {
    return moment(value).fromNow()
})

const app = new Vue({
    el: '#app',
    router,
    components: {
        "index": Index
    }
});
