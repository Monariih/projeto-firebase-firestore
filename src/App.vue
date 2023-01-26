<template>
  <v-app>
    <v-main>

      <router-view/>

    </v-main>
  </v-app>
</template>

<script>
import { onBeforeMount} from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/compat";
export default {

  //Função que não deixa burlar o login e entrar em alguma função
  //sem a devida autenticação.


  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) =>{
        if (!user) {
          router.replace('/')
        } else if (route.path == '/' || route.path == '/signUp'){
            router.replace('/home')
        }
      })
    })
  }
}
</script>