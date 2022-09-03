<template>
    <div class="row align-items-md-stretch">
        <div class="col-md-6 mb-4">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
                <h2>Overview</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button class="btn btn-outline-light" type="button">Get Started</button>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="h-100 p-5 bg-light border rounded-3">
                <h2>Visitors Summary</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button class="btn btn-outline-secondary" type="button">See Details</button>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="h-100 p-5 bg-primary-soft border rounded-3">
                <h2>Active Users</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <button class="btn btn-outline-secondary" type="button">See Details</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { whoami } from '@src/api/auth';

    export default {
        data() {
            return {
               routeName: this.$route.meta.title, 
            }
        },
        created() {
            this.getUser();
            this.$event.emit('breadcrumbs', { 
                title: this.routeName, 
                breadcrumbs: {
                    '#': this.routeName,
                } 
            });
        },
        methods: {
            async getUser() {
                // Testing API call
                const { success, failure } = await whoami();

                if (success) {
                    const { message, data } = success;

                    this.$event.emit('flash-message', { message: `Welcome back! ${data.name}`, type: "info" });
                } else if (failure) {
                    const { message, error = {} } = failure;

                    this.$event.emit('flash-message', { message, type: "error", withToast: true });
                } else {
                    this.$event.emit('flash-message', { message: "An error occured :( unknown response.", type: "error" });
                }

                
            }
        },
    }
</script>