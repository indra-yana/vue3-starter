import axios from "@src/plugin/axios";
import { responseFormat } from "@src/plugin/helper";

export default {
    csrfCookie: async () => {
        let success, failure = null;

        await axios.get(`/csrf-cookie`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    login: async (payloads) => {
        const response = await axios.post(`/v1/auth/login`, payloads)
                                    .then(({ data }) => data)
                                    .catch(({ response: { data } }) => data);

        return responseFormat(response);
    },
    logout: async (payloads) => {
        let success, failure = null;

        await axios.post(`/v1/auth/logout`, payloads)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    register: async (payloads) => {
        let success, failure = null;

        await axios.post(`/v1/auth/register`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    sendVerificationLink: async (payloads) => {
        let success, failure = null;

        await axios.post(`/v1/auth/email/resend`, payloads)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    verify: async (verifyUrl) => {
        let success, failure = null;

        await axios.get(`${verifyUrl}`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    checkIfHasVerified: async () => {
        let success, failure = null;

        await axios.get(`/v1/auth/checkIfHasVerified`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);

        return { success, failure }
    },
    sendResetLink: async (payloads) => {
        let success, failure = null;

        await axios.post(`/v1/auth/password/email`, payloads)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);
        
        return { success, failure }
    },
    resetPassword: async (payloads) => {
        let success, failure = null;

        await axios.post(`/v1/auth/password/reset`, payloads)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);
        
        return { success, failure }
    },
    whoami: async () => {
        let success, failure = null;

        await axios.get(`/v1/auth/whoami`)
                    .then(({ data }) => success = data)
                    .catch(({ response: { data } }) => failure = data);
        
        return { success, failure }
    },
}