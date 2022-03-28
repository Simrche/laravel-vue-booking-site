<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Laravel Booking</router-link>
        </nav>

        <div class="container mt-4 mb-4 pr-4 p1-4">
            <router-view></router-view>
        </div>

    </div>
</template>
