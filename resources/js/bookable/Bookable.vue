<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{bookable.title}}</h2>
                        <hr />
                        <article>{{bookable.description}}</article>
                    </div>
                    <div v-else>Loading ...</div>
                </div>
            </div>
            <ReviewList :bookableId="this.$route.params.id"/>
        </div>
        <div class="col-md-4 pb-4">
            <Availability :bookableId="this.$route.params.id" v-on:availability='checkPrice($event)'/>
        </div>
    </div>
</template>

<script>

import Availability from "./Availability.vue"
import ReviewList from "./ReviewList.vue"
import { mapState } from "vuex"

export default {
    components: {
        Availability,
        ReviewList
    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null,
        }
    },
    created() {
        this.loading = true
        axios.get(`/api/bookables/${this.$route.params.id}`)
        .then(response => {
            this.bookable = response.data.data
            this.loading = false
        })
    },
    computed: mapState({
        lastSearch: "lastSearch"
    }),
    methods: {
        async checkPrice(hasAvailability) {
            if(!hasAvailability) {
                this.price = null
                return
            }

            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data
            } catch (error) {
                this.price = null
            }
        }
    }
}
</script>
