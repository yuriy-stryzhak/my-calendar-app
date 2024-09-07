/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'


// Composables
import { createApp } from 'vue'

import Toast from "vue-toastification"
// Import the CSS or use your own!
import "vue-toastification/dist/index.css"

import "./styles/main.scss"


const app = createApp(App)

app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true,
    toastClassName: "my-toast",
});

registerPlugins(app)

app.mount('#app')
