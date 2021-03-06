<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <transition name="fade">
                <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
                <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
            </transition>
        </h6>

        <div class="form-row d-flex justify-content-between">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input @keyup.enter="check" v-model="from" type="text" name="from" id="from" class="form-control form-control-sm" placeholder="Start date" :class="[{'is-invalid': errorFor('from')}]">
                <v-errors :errors="errorFor('from')"/>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input @keyup.enter="check" v-model="to" type="text" name="to" id="to" class="form-control form-control-sm" placeholder="End date" :class="[{'is-invalid': errorFor('to')}]">
                <v-errors :errors="errorFor('to')"/>
            </div>
        </div>

        <div class="form-row mt-3">
            <button class="btn btn-secondary btn-block col-md-12" @click="check" :disabled='loading'>
                <span v-if="!loading">
                    Check!
                </span>
                <span v-if="loading" class="flex">
                    <i class="fas fa-circle-notch fa-spin"></i> Checking ...
                </span>
            </button>
        </div>


    </div>
</template>

<script>

import {is422} from "./../shared/utils/response"
import validationErrors from "./../shared/mixins/validationErrors"

export default {
    mixins: [validationErrors],
    props: ['bookableId'],
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null,
            buttonMessage: "Check!"
        }
    },
    methods: {
        async check() {
            this.loading = true
            this.buttonMessage = "Loading ..."
            this.errors = null

            this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to
            })

            try {
                this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status
                this.$emit("availability", this.hasAvailability)
            } catch (err) {
                if (is422(err)){
                        this.errors = err.response.data.errors
                    }
                this.status = err.response.status
                this.$emit("availability", this.hasAvailability)
            }

            this.loading = false

            // axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
            //     .then(response => {
            //         this.status = response.status
            //     }).catch(error => {
            //         if (is422(error)){
            //             this.errors = error.response.data.errors
            //         }
            //         this.status = error.response.status
            //     }).then(() => {
            //         this.loading = false
            //         this.buttonMessage = "Check!"
            //     })
        },
    },
    computed: {
        hasErrors() {
            return 422 === this.status && this.errors != null
        },
        hasAvailability() {
            return 200 === this.status
        },
        noAvailability() {
            return 404 === this.status
        }
    }
}
</script>

<style scoped>
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: grey;
        font-weight: bolder;
    }

    .is-invalid {
        border-color: #b22222;
        background-image: none;
    }

    .invalid-feedback {
        color: #b22222;
    }
</style>
