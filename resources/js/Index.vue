<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Laravel Booking</router-link>

            <ul class="navbar-nav flex-row">
                <li class="nav-item">
                    <router-link class="btn nav-button" :to="{name: 'basket'}">
                        Basket
                        <span class="badge badge-secondary gris">{{itemsInBasket}}</span>
                    </router-link>
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'register'}" class="nav-link space">Register</router-link>
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'login'}" class="nav-link space">Login</router-link>
                </li>

                <li class="nav-item" v-if="isLoggedIn">
                    <a href="#" class="nav-link space" @click.prevent="logout">Logout</a>
                </li>
            </ul>


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

    .space {
        margin-right: 12px;
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
            lastSearchComputed: "lastSearch",
            isLoggedIn: 'isLoggedIn'
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    },
    methods: {
        async logout() {
            try {
                axios.post('/logout')
                this.$store.dispatch('logout')
            } catch(error) {
                this.$store.dispatch('logout')
            }
        }
    }
}
</script>
