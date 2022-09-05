import axios from 'axios';
import router from '@src/router';
import { authState } from '@src/stores/authState.js';
import { loaderState } from '@src/stores/loaderState.js';
import { refreshToken } from '@src/api/auth';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BE_URL || 'http://127.0.0.1:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
    },
});

const renewToken = async () => {
    const { success, failure } = await refreshToken({
        refreshToken: authState().auth.token.refreshToken,
    });

    if (success) {
        const { message, data } = success;
        console.log(message);

        const { token: { accessToken, refreshToken } } = data;
        authState().refreshToken({ accessToken, refreshToken });
    } else {
        console.log(failure);
        authState().logout();

        router.push({name: 'login'});
        return false;
    }

    return true;
}

const requestHandler = (request) => { 
    // Show the loader
    NProgress.start();
    loaderState().setProcessing(true);

    request.headers['Authorization'] = `Bearer ${authState().auth.token.accessToken}`;
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

const responseErrorHandler = async (error) => {
    // Do something with response error before they thrown to catch block.
    if (error) {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const result = await renewToken();
                if (result) {
                    return instance(originalRequest);
                }
            }
        }
    }

    // Close the loader
    NProgress.done();
    loaderState().setProcessing(false);

    return Promise.reject(error);
}

// axios.defaults.withCredentials = true;
instance.interceptors.request.use(requestHandler, requestErrorHandler);
instance.interceptors.response.use(responseHandler, responseErrorHandler);

export default instance;