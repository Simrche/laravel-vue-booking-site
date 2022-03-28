require('./bootstrap');

import router from "./routes"
import VueRouter from "vue-router/dist/vue-router"
import Vue from "vue";
import Index from "./Index"
import moment from "moment";
import StarRating from "./shared/components/StarRating"
import FatalError from "./shared/components/FatalError"
import Success from "./shared/components/Success"
import ValidationErrors from "./shared/components/ValidationErrors"
import Vuex from 'vuex'

window.Vue = require('vue').default;

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => {
    return moment(value).fromNow()
})

Vue.component("StarRating", StarRating)
Vue.component('FatalError', FatalError)
Vue.component('Success', Success)
Vue.component('v-errors', ValidationErrors)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": Index
    }
});
