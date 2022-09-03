import { defineStore } from 'pinia'
import SecureLS from "secure-ls";
import { postState } from '@src/stores/postState.js';
import { socialLinkState } from '@src/stores/socialLinkState.js';

const ls = new SecureLS({ isCompression: false });
const authState = defineStore('authState', {
    state: () => ({
        authData: {
            loggedIn: false,
            hasVerifiedEmail: false,
            user: null,
            session: {
                active: false,
                accessToken: '',
                refreshToken: '',
                message: '', 
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
        isSessionExpired() {
            return !this.session.active;
        }
    },
    actions:{
        loggedIn(user, token) {
            this.authData.loggedIn = true;
            this.authData.hasVerifiedEmail = user.emailVerifiedAt != null ? true : false;
            this.authData.user = user;

            this.authData.session.active = true;
            this.authData.session.accessToken = token.accessToken;
            this.authData.session.message = 'Session is currently active';
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