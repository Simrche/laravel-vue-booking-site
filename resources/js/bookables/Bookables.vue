<template>
    <div>
        <div v-if="loading">
            <p>Data is Loading ...</p>
        </div>
        <div v-else>
            <div
                class="row mb-4"
                v-for="row in rows"
                :key="'row' + row"
            >
                <div
                    class="col d-flex align-items-stretch"
                    v-for="(bookable, column) in bookablesInRow(row)"
                >
                    <BookableListItem
                        :title="bookable.title"
                        :content="bookable.description"
                        :price="1000"
                    ></BookableListItem>
                </div>
                <div class="col" v-for="p in placeholdersInRow(row)" :key="'placeholder' + row + p">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem"

export default {

    components: {
        BookableListItem,
    },
    data: () => {
        return {
            bookables: null,
            loading: false,
            columns: 3,
        }
    },
    computed: {
        rows() {
            return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns)
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns)
        },
        placeholdersInRow(row) {
            return this.columns - this.bookablesInRow(row).length
        }
    },
    created() {
        this.loading = true

        const request = axios.get("/api/bookables").then(response => {
            this.bookables = response.data
            this.loading = false
        })
    },
}
</script>
