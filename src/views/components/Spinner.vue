<template>
    <div class="d-flex justify-content-center mb-4 mt-2" v-if="processing">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            processing: {
                default: false
            },
        },
        methods: {

        },
    }
</script>