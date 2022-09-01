// Base layout
import AuthTemplate from "@layouts/AuthTemplate.vue";

// Landing Pages
import Landing from "@pages/landing/Landing.vue";

/*
* Front Page Routes
*/
const routes = {
    path: "/",
    name: 'home',
    component: AuthTemplate,
    children: [
        {
            name: 'landing',
            path: '',
            alias: ['/home', '/landing'],
            component: Landing,
            meta:{
                requiresAuth: false,
                title: `Landing Page`
            }
        },
    ],
};

export default routes;