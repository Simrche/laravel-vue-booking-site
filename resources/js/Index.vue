<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto ml-4" :to="{name: 'home'}">Laravel Booking</router-link>
            <router-link class="btn nav-button" :to="{name: 'bookable'}">Bookable</router-link>
        </nav>

        <div class="container mt-4 mb-4 pr-4 p1-4">
            <router-view></router-view>
        </div>

    </div>
</template>
