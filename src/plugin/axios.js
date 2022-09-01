import axios from 'axios';
import router from '@src/router';
import { authState } from '@src/stores/authState.js';
import { loaderState } from '@src/stores/loaderState.js';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((request) => { 
    // Show the loader
    NProgress.start();
    loaderState().setProcessing(true);

    return request; 
}, (error) => {
    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return Promise.reject(error);
});

axios.interceptors.response.use((response) => { 
    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return response; 
}, (error) => {
    // Do something with response error before they thrown to catch block.
    if (error) {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const useAuthState = authState();
                const message = 'Your session has expired. Please refresh this page to start new session. <a href="javascript:window.location.reload(true)">Refresh!</a>';
                error.response.data.message = message;

                useAuthState.logout();
                useAuthState.$patch((state) => {
                    state.session.active = false;
                    state.session.message = message;
                });
    
                // return router.push({name: 'login'});
            }
        }
    }

    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return Promise.reject(error);
});

export default axios;