<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability</h6>

        <div class="form-row d-flex justify-content-between">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input @keyup.enter="check" v-model="from" type="text" name="from" id="from" class="form-control form-control-sm" placeholder="Start date">
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input @keyup.enter="check" v-model="to" type="text" name="to" id="to" class="form-control form-control-sm" placeholder="End date">
            </div>
        </div>

        <div class="form-row mt-3">
            <button class="btn btn-secondary btn-block col-md-12" @click="check">Check!</button>
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            from: null,
            to: null,
        }
    },
    methods: {
        check() {
            alert('i will check something now')
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
</style>
