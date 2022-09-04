import axios from "@src/plugin/axios";
import { responseFormat } from "@src/plugin/helper";

const csrfCookie = async () => {
    const res = await axios.get(`/csrf-cookie`)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const login = async (payloads) => {
    const res = await axios.post(`/v1/auth/login`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const logout = async (payloads) => {
    const res = await axios.post(`/v1/auth/logout`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const register = async (payloads) => {
    const res = await axios.post(`/v1/auth/register`, payloads, { headers: {'Content-Type': 'multipart/form-data' }})
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const sendVerificationLink = async (payloads) => {
    const res = await axios.post(`/v1/auth/verify/resend`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const verify = async (payloads) => {
    const res = await axios.put(`/v1/auth/verify`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const checkIfHasVerified = async () => {
    const res = await axios.get(`/v1/auth/checkIfHasVerified`)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);

    return responseFormat(res);
}

const sendResetLink = async (payloads) => {
    const res = await axios.post(`/v1/auth/password/email`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);
    
    return responseFormat(res);
}

const resetPassword = async (payloads) => {
    const res = await axios.post(`/v1/auth/password/reset`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);
    
    return responseFormat(res);
}

const whoami = async () => {
    const res = await axios.get(`/v1/auth/whoami`)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);
    
    return responseFormat(res);
}

const refreshToken = async (payloads) => {
    const res = await axios.post(`/v1/auth/refreshToken`, payloads)
                    .then(({ data }) => data)
                    .catch(({ response: { data } }) => data);
    
    return responseFormat(res);
}

export {
    csrfCookie,
    login,
    logout,
    register,
    sendVerificationLink,
    verify,
    checkIfHasVerified,
    sendResetLink,
    resetPassword,
    whoami,
    refreshToken,
}