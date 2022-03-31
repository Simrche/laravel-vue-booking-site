<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Laravel Booking</router-link>

            <router-link class="btn nav-button" :to="{name: 'basket'}">
                Basket
                <span class="badge badge-secondary gris">{{itemsInBasket}}</span>
            </router-link>
        </nav>

        <div class="container mt-4 mb-4 pr-4 p1-4">
            <router-view></router-view>
        </div>

    </div>
</template>

<style scoped>
    .gris {
        background-color: grey;
    }
</style>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch
        }
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch"
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    }
}
</script>
