import { defineStore } from 'pinia'
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });
const authState = defineStore('authState', {
    state: () => ({
        authData: {
            loggedIn: false,
            hasVerifiedEmail: false,
            user: null,
            token: {
                accessToken: '',
                refreshToken: '',
            },
        },
    }),
    getters: {
        isLoggedIn() {
            return this.authData.loggedIn;
        },
        auth() {
            return this.authData;
        },
    },
    actions:{
        loggedIn(user, token) {
            this.authData.loggedIn = true;
            this.authData.hasVerifiedEmail = user.emailVerifiedAt != null ? true : false;
            this.authData.user = user;
            this.authData.token.accessToken = token.accessToken;
            this.authData.token.refreshToken = token.refreshToken;
        },
        refreshToken(token) {
            this.authData.token.accessToken = token.accessToken;
            this.authData.token.refreshToken = token.refreshToken;
        },
        logout() {
            this.$reset();
        },
        hasVerifiedEmail(emailVerifiedAt) {
            this.authData.hasVerifiedEmail = true;
            this.authData.user.emailVerifiedAt = emailVerifiedAt; 
        },
    },
    persist: {
        key: 'auth-state',
        paths: ['authData'],
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key)
        },
    },
});

export { authState };