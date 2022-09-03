import axios from 'axios';
import router from '@src/router';
import { authState } from '@src/stores/authState.js';
import { loaderState } from '@src/stores/loaderState.js';

const refreshToken= () => {
    // TODO: get new access token
}

const requestHandler = (request) => { 
    // Show the loader
    NProgress.start();
    loaderState().setProcessing(true);

    request.headers['Authorization'] = `Bearer ${authState().auth.token.accessToken}`;
    request.headers['X-Requested-With'] = 'XMLHttpRequest';
    request.headers['Accept'] = 'application/json';
    request.headers['Accept-Language'] = 'id'; // TODO: Change this from local storage or state

    return request; 
}

const requestErrorHandler = (error) => {
    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return Promise.reject(error);
}

const responseHandler = (response) => { 
    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return response; 
}

const responseErrorHandler = (error) => {
    // Do something with response error before they thrown to catch block.
    if (error) {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                authState().logout();

                // TODO: get new refresh token if access token has expired

                // const message = 'Your session has expired. Please refresh this page to start new session. <a href="javascript:window.location.reload(true)">Refresh!</a>';
                // error.response.data.message = message;
    
                // return router.push({name: 'login'});
            }
        }
    }

    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return Promise.reject(error);
}

axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
// axios.defaults.headers.common['Authorization'] = `Bearer ${useAuthState.auth().token.accessToken}`;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['Accept-Language'] = 'id';                        // TODO: Change this from local storage or state
axios.defaults.withCredentials = true;
axios.interceptors.request.use(requestHandler, requestErrorHandler);
axios.interceptors.response.use(responseHandler, responseErrorHandler);

export default axios;