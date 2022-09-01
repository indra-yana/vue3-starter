import { createWebHistory, createRouter } from "vue-router";

import authRoute from "./pages/auth";
import landingRoute from "./pages/landing";
import manageAccountRoute from "./pages/manage-account";
import dashboardRoute from "./pages/dashboard";
import notfoundRoute from "./pages/notfound";

// Data Store
import { authState } from '@src/stores/authState.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        notfoundRoute,
        authRoute, 
        landingRoute, 
        dashboardRoute,
        manageAccountRoute,
    ],
});

router.beforeEach((to, from, next) => {
    // Show progress page loader
    // NProgress.start();

    document.title = `${to.meta.title}`;
    const store = authState();
    
    // Route that required authenticated
    if (to.meta.requiresAuth && !store.isLoggedIn) {
        return next({name: "login"});
    }

    // Route do not visit after login
    if (store.isLoggedIn && ['login', 'register'].includes(to.name)) {
        return next({name: "dashboard"});
    }
    
    // Route that user need verify their account
    if (store.isLoggedIn && !store.auth.hasVerifiedEmail && to.name == 'verification.verify') {
        return next();
    }

    // Route if user not verified
    if (store.isLoggedIn && !store.auth.hasVerifiedEmail && !['verification.notice'].includes(to.name)) {
        return next({name: "verification.notice"});
    }

    return next();
});

router.afterEach((to, from) => {
    // Hide progress page loader
    // NProgress.done();
});

export default router;