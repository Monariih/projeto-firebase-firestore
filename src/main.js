import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from "firebase/compat";
import { loadFonts } from './plugins/webfontloader'


const firebaseConfig = {
    apiKey: "AIzaSyDPKy7IF9dhj5tuKULF8-rYuJzO7J1W4hE",
    authDomain: "teste-consumir-api.firebaseapp.com",
    projectId: "teste-consumir-api",
    storageBucket: "teste-consumir-api.appspot.com",
    messagingSenderId: "887346278600",
    appId: "1:887346278600:web:d9bceb92fd4fc1233f75fd",
    measurementId: "G-D1CCP1RD03"
};

firebase.initializeApp(firebaseConfig);

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
