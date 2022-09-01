import { createApp } from 'vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppTemplate from "@layouts/AppTemplate.vue";
import router from '@src/router';
import axios from '@src/plugin/axios.js';
import mitt from 'mitt';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';

// Global Components
import SubmitButton from "@components/SubmitButton.vue";
import ResetButton from "@components/ResetButton.vue";
import SaveButton from "@components/SaveButton.vue";
import Loader from "@components/LoaderSpinner.vue";

const app = createApp(AppTemplate);
const emitter = mitt();
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Registering Global Component
app.component("SubmitButton", SubmitButton)
    .component("SaveButton", SaveButton)
    .component("ResetButton", ResetButton)
    .component("Loader", Loader);

// Registering App Plugin
app.config.globalProperties.$event = emitter;
app.config.globalProperties.$axios = axios;
app.provide('axios', app.config.globalProperties.axios);
app.use(router);
app.use(pinia);

// Mounting app
app.mount('#app');
