// Base layout
import AuthTemplate from "@layouts/AuthTemplate.vue";

// Auth Pages
import Login from "@pages/auth/Login.vue";
import Register from "@pages/auth/Register.vue";
import Verify from "@pages/auth/Verify.vue";
import Email from "@pages/auth/password/Email.vue";
import Reset from "@pages/auth/password/Reset.vue";
import Confirm from "@pages/auth/password/Confirm.vue";

/*
* Auth Routes
*/
const routes = {
    path: "/auth",
    component: AuthTemplate,
    redirect: { name: 'login' },
    children: [
        {
            name: 'login',
            path: 'login',
            component: Login,
            meta: {
                requiresAuth: false,
                title: `Login`
            }
        }, {
            name: 'register',
            path: 'register',
            component: Register,
            meta: {
                requiresAuth: false,
                title: `Register`
            }
        }, {
            name: 'password.request',
            path: 'password/request',
            component: Email,
            meta: {
                requiresAuth: false,
                title: `Forgot Password`
            }
        }, {
            name: 'password.reset',
            path: 'password/reset/:token/:email',
            component: Reset,
            meta: {
                requiresAuth: false,
                title: `Reset Password`
            }
        }, {
            name: 'password.confirm',
            path: 'confirm',
            component: Confirm,
            meta: {
                requiresAuth: true,
                title: `Confirm Password`
            }
        }, {
            name: 'verification.notice',
            path: 'email/verify',
            component: Verify,
            meta: {
                requiresAuth: true,
                title: `Email Verification`
            }
        }, {
            name: 'verification.verify',
            path: 'email/verify/confirm',
            component: Verify,
            meta: {
                requiresAuth: true,
                title: `Email Verification`
            }
        },
    ],
};

export default routes;