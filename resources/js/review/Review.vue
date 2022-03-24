<template>
    <div>
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
                    <textarea v-model="review.content" name="content" id="content" cols="30" rows="10" class="form-control"></textarea>
                </div>
                <button class="btn btn-lg btn-primary btn-block w-100 mt-2">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: 5,
                content: null,
            },
            existingReview: null,
            loading: false,
        }
    },
    created() {
        this.loading = true
        axios.get(`/api/reviews/${this.$route.params.id}`)
        .then((response) => {
            this.existingReview = response.data.data
        }).catch(err => {
            console.log(err)
        })
        .then(() => {
            this.loading = false
        })
    },
    computed: {
        alreadyReviewed() {
            return this.existingReview !== null
        }
    }
}
</script>
