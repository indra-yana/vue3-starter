// NotFound Pages
import NotFound from "@pages/error/NotFound.vue";

/*
* Notfound Routes
*/
const routes = { 
    path: '/:pathMatch(.*)*', 
    name: 'notfound', 
    component: NotFound, 
    meta:{
        requiresAuth: false,
        title: `404 Not Found`
    }
};

export default routes;