// Base layout
import DashboardTemplate from "@layouts/DashboardTemplate.vue";

// Dashboard Pages
import Dashboard from "@pages/dashboard/Dashboard.vue";

/*
* Dashboard Routes
*/
const routes = {
    path: "/dashboard",
    redirect: { name: 'dashboard' },
    component: DashboardTemplate,
    children: [
        {
            name: 'dashboard',
            path: 'index',
            component: Dashboard,
            meta:{
                requiresAuth: true,
                title: `Dashboard`
            }
        }, 
    ],
   
};

export default routes;