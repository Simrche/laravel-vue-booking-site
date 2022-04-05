<template>
    <div class="w-50 m-auto">
        <div class="card card-body">
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="Enter your email" class="form-control" v-model="email">
                </div>
                <div class="form-group mt-2">
                    <label for="password">Password</label>
                    <input type="text" name="password" id="password" placeholder="Enter your password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary btn-md btn-block w-100 mt-4">Log in</button>

                <hr>

                <div>
                    No account yet ?
                    <router-link :to="{name: 'home'}">Register</router-link>
                </div>

                <div>
                    Forgotten password ?
                    <router-link :to="{name: 'home'}">Reset password</router-link>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
