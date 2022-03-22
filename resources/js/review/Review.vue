<template>
    <div>
        <div class="form-group mt-2">
            <label for="" class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
            <StarRating :rating="review.rating" class="fa-3x" v-on:rating:changed="review.rating = $event"/>
        </div>
        <div class="form-group mt-2">
            <label for="content" class="text-muted">Describe your experience with</label>
            <textarea name="content" id="content" cols="30" rows="10" class="form-control"></textarea>
        </div>

        <button class="btn btn-lg btn-primary btn-block w-100 mt-2">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: 5,
                content: null,
            }
        }
    }
}
</script>
