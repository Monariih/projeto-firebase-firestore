<template>
  <v-card id="card_login">
    <h2>Registro</h2><br>

    <hr><br>
    <v-img id="logo_corsol" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-img>
    <br><hr><br>


    <form @submit.prevent="Register">
      <input type="text" placeholder="Email" v-model="email"/><br><br>
      <input type="password" placeholder="Senha" v-model="password"/><br><br>
      <v-btn type="submit" value="Register">Ingressar</v-btn>
    </form>

    <br><br>
      <v-spacer>Ou retornar ao <router-link to="/">Login</router-link> </v-spacer>


  </v-card>
</template>

<script>
import firebase from "firebase/compat";
import { ref } from "vue";
export default {
  setup() {
    const email = ref("")
    const password = ref("")

    const Register = () => {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(user => {
            alert(user);
          })
          .catch(err => alert(err.message))
    }
    return {
      Register,
      email,
      password
    }
  }


}

</script>
