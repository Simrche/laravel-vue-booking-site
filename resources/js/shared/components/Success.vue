<template>

    <div class="text-center error">
        <i class="fas fa-thumbs-up success"></i>
        <h1>Success!</h1>
        <h2><slot></slot></h2>
    </div>

</template>

<style scoped>

    .success {
        color: #999;
        font-size: 10rem;
    }

</style>
