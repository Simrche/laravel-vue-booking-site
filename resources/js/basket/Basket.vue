<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                Checkout form
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase gris">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex"

export default {
    computed: {
        ...mapGetters(['itemsInBasket']),
        ...mapState({
            basket: state => state.basket.items
        })
    }
}
</script>

<style scoped>
    h6.badge {
        background-color: grey;
        font-size: 100%
    }
</style>
