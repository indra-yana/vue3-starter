<template>
    <div class="d-flex flex-column min-vh-100">

        <Loader/>

        <MainNavigation/>

        <div class="container mt-5 mb-5 pt-5">
            <main class="row justify-content-center mb-3">
                <div class="col-md-12 mb-3">
                    <Alert/>
                </div>
                <div class="col-md-12 mb-3">
                    <router-view/>
                </div>
            </main>
        </div>

        <Footer/>

    </div>
</template>

<script>
    import MainNavigation from '@layouts/MainNavigation.vue'
    import Footer from '@layouts/Footer.vue';
    import Alert from '@components/Alert.vue';
    import { authState } from '@src/stores/authState.js';
  
    export default {
        components: {
            MainNavigation,
            Footer,
            Alert,
        },
        data() {
            return {
                
            };
        },
        created() {
            authState().$subscribe((mutation, state) => {
                const { loggedIn } = state.authData;
                if (!loggedIn) {
                    this.$event.emit('session-inactive', { 
                        message: 'Your session has expired. Please refresh this page to start new session. <a href="javascript:window.location.reload(true)">Refresh!</a>' 
                    });
                }
            });
        },
        methods: {

        },  
    };
</script>