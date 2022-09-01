// Base layout
import DashboardTemplate from "@layouts/DashboardTemplate.vue";

// Manage Account Pages
import Profile from "@pages/account/Profile.vue";
import ChangePassword from "@pages/account/ChangePassword.vue";
import SocialLink from "@pages/account/SocialLink.vue";

/*
* Manage Account Routes
*/
const routes = {
    path: "/manage/account",
    name: 'account',
    component: DashboardTemplate,
    redirect: { name: 'account.profile' },
    children: [
        {
            name: 'account.profile',
            path: 'profile',
            component: Profile,
            meta:{
                requiresAuth: true,
                title: `Profile`
            }
        }, 
        {
            name: 'account.password',
            path: 'password',
            component: ChangePassword,
            meta:{
                requiresAuth: true,
                title: `Change Password`
            }
        }, 
        {
            name: 'account.social',
            path: 'social',
            component: SocialLink,
            meta:{
                requiresAuth: true,
                title: `Social Link`
            }
        }, 
    ],
};

export default routes;