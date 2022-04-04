<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col md-6 form-group">
                        <label for="firstname">Firstname</label>
                        <input type="text" id="firstname" class="form-control" v-model="customer.first_name">
                    </div>
                    <div class="col md-6 form-group">
                        <label for="lastname">Lastname</label>
                        <input type="text" class="form-control" id="lastname" v-model="customer.last_name">
                    </div>
                </div>
                <div class="row">
                    <div class="col md-12 form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" id="email" v-model="customer.email">
                    </div>
                </div>
                <div class="row">
                    <div class="col md-6 form-group">
                        <label for="street">Street</label>
                        <input type="text" class="form-control" id="street" v-model="customer.street">
                    </div>
                    <div class="col md-6 form-group">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" v-model="customer.city">
                    </div>
                </div>
                <div class="row">
                    <div class="col md-6 form-group">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" v-model="customer.country">
                    </div>
                    <div class="col md-4 form-group">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" v-model="customer.state">
                    </div>
                    <div class="col md-2 form-group">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" v-model="customer.zip">
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <button type="submit" class="btn btn-lg btn-primary btn-block w-100">
                            Book now!
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase gris">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>

                <div v-for="item in basket" :key="item.bookable.id">
                    <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                        <span>
                            <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">{{item.bookable.title}}</router-link>
                        </span>
                        <span class="font-weight-bold">${{item.price.total}}</span>
                    </div>
                    <div class="pt-2 pb-2 d-flex justify-content-between">
                        <span>
                            From {{ item.dates.from }}
                        </span>
                        <span>
                            To {{ item.dates.to }}
                        </span>
                    </div>

                    <div class="pt-2 pb-2 d-flex justify-content-end">
                        <button @click="$store.dispatch('removeFromBasket', item.bookable.id)" class="btn btn-sm btn-outline-secondary">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex"

export default {
    data() {
        return {
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null,
            }
        }
    },
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

    a {
        color: black;
    }
</style>
