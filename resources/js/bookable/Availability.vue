<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <span v-if="noAvailability" class="text-danger">(NOT AVAILABLE)</span>
            <span v-if="hasAvailability" class="text-success">(AVAILABLE)</span>
        </h6>

        <div class="form-row d-flex justify-content-between">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input @keyup.enter="check" v-model="from" type="text" name="from" id="from" class="form-control form-control-sm" placeholder="Start date" :class="[{'is-invalid': this.errorFor('from')}]">
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('from')" :key="'from' + index">
                    {{error}}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input @keyup.enter="check" v-model="to" type="text" name="to" id="to" class="form-control form-control-sm" placeholder="End date" :class="[{'is-invalid': this.errorFor('to')}]">
                <div class="invalid-feedback" v-for="(error, index) in this.errorFor('to')" :key="'to' + index">
                    {{error}}
                </div>
            </div>
        </div>

        <div class="form-row mt-3">
            <button class="btn btn-secondary btn-block col-md-12" @click="check" :disabled='loading'>{{buttonMessage}}</button>
        </div>


    </div>
</template>

<script>
export default {
    props: {
        bookableId: String
    },
    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null,
            buttonMessage: "Check!"
        }
    },
    methods: {
        check() {
            this.loading = true
            this.buttonMessage = "Loading ..."
            this.errors = null

            axios.get(`/api/bookables/${this.$route.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(response => {
                    this.status = response.status
                }).catch(error => {
                    if (422 === error.response.status){
                        this.errors = error.response.data.errors
                    }
                    this.status = error.response.status
                }).then(() => {
                    this.loading = false
                    this.buttonMessage = "Check!"
                })
        },
        errorFor(field) {
            return this.hasErrors && this.errors[field] ? this.errors[field] : null
        }
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
