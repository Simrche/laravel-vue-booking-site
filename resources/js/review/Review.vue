<template>
    <div>
        <Success v-if="success">You left a review, thank you very much !</Success>
        <FatalError v-if="error" />
        <div v-if="!success && !error" class="row">
            <div :class="[{'col-md-4' : twoColumn}, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading ...
                        </div>
                        <div v-if="hasBooking">
                            <p>Stayed at <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">{{booking.bookable.title}}</router-link></p>
                            <p>From {{booking.from}} to {{booking.to}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'col-md-8': twoColumn}, {'col-md-12': oneColumn}]">
                <div v-if="loading">
                    <p>Loading ...</p>
                </div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking!</h3>
                    </div>
                    <div v-else>
                        <div class="form-group mt-2">
                            <label for="" class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                            <StarRating class="fa-3x" v-model="review.rating"/>
                        </div>
                        <div class="form-group mt-2">
                            <label for="content" class="text-muted">Describe your experience with</label>
                            <textarea v-model="review.content" name="content" id="content" cols="30" rows="10" class="form-control" :class="[{'is-invalid': this.errorFor('content')}]"></textarea>
                            <v-errors :errors="errorFor('content')"/>
                        </div>
                        <button class="btn btn-lg btn-primary btn-block w-100 mt-2" @click.prevent="submit" :disabled="sending">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {is404, is422} from "./../shared/utils/response"
import validationErrors from "./../shared/mixins/validationErrors"
import Success from '../shared/components/Success.vue'

export default {
    mixins: [validationErrors],
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
            sending: false,
            success: false,
        }
    },
    async created() {
        this.review.id = this.$route.params.id
        this.loading = true

        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data.data
        } catch(err) {
            if(is404(err)) {
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data.data
                } catch(err) {
                    this.error = true
                }
            } else {
                this.error = true
            }
        }

        this.loading = false

        // axios.get(`/api/reviews/${this.review.id}`)
        // .then((response) => {
        //     this.existingReview = response.data.data
        // }).catch(err => {
        //     if(is404(err)) {
        //         return axios.get(`/api/booking-by-review/${this.review.id}`)
        //             .then((response) => {
        //                 this.booking = response.data.data
        //             }).catch((err) => {
        //                 // is404(err) ? {} : (this.error = true) Équivalent à en dessous

        //                 // if(!is404(err)) {
        //                 //     this.error = true
        //                 // } Équivalent à en dessous

        //                 this.error = true
        //             })
        //     }
        // })
        // .then(() => {
        //     this.loading = false
        // })
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking
        },
        hasReview() {
            return this.existingReview !== null
        },
        hasBooking() {
            return this.booking !== null
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed
        },
        twoColumn() {
            return this.loading || !this.alreadyReviewed
        }
    },
    methods: {
        submit() {
            this.errors = null
            this.sending = true
            this.success = false
            axios.post(`/api/reviews`, this.review).then((response) => {
                this.success = 201 === response.status
            }).catch((err) => {
                if(is422(err)) {
                    const errors = err.response.data.errors;

                    if(errors['content'] && 1 === _.size(errors)) {
                        this.errors = errors
                        return
                    }

                    this.error = true
                }
            }).then(() => {
                this.sending = false
            })
        },
    }
}
</script>
