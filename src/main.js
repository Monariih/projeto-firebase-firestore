import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from "firebase/compat";
import { loadFonts } from './plugins/webfontloader'

const firebaseConfig = {
    apiKey: "AIzaSyDPKy7IF9dhj5tuKULF8-rYuJzO7J1W4hE",
};

firebase.initializeApp(firebaseConfig);

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
