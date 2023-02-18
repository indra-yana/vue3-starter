import axios from "@src/plugin/axios";
import { responseFormat } from "@src/plugin/helper";
import get from "lodash/get";

const baseURL = import.meta.env.VITE_APP_BE_URL || 'http://127.0.0.1:3000/api';

const endPointProvider = {
    auth: {
        login: {
            method: 'POST',
            url: '/v1/auth/login'
        },
        logout: {
            method: 'POST',
            url: '/v1/auth/logout'
        },
        register: {
            method: 'POST',
            url: '/v1/auth/register'
        },
        sendVerificationLink: {
            method: 'POST',
            url: '/v1/auth/verify/resend'
        }
    },
    user: {
        show: {
            method: 'GET',
            url: '/v1/user/show'
        },
        whoami: {
            method: 'GET',
            url: '/v1/auth/whoami'
        }
    }
}

const sendApi = async ({ 
    key, 
    data = {}, 
    params = {}, 
    path = null, 
    headers = {} 
}) => {
    let prop = get(endPointProvider, key);

    if (path) {
        prop.url = prop.url.concat(path);
    }

    const config = {
        ...prop,
        data,
        params,
        headers,
    }

    const res = await axios(config)
        .then(({ data }) => data)
        .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

export {
    baseURL,
    sendApi,
}