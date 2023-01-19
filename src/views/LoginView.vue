<template>
  <main>
    <v-card id="card_login">
      <hr><br>
        <v-img id="logo_corsol" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-img>
      <br><hr><br>

      <form @submit.prevent="Login">
        <input type="text" placeholder="Email" v-model="email"/><br><br>
        <input type="password" placeholder="Senha" v-model="password"/><br><br>
        <v-btn type="submit" value="Login">Login</v-btn>
      </form>

        <br><br>
        Ainda Não registrado?<br><br>
        <router-link to="/signUp">Criar Conta</router-link>


    </v-card>
  </main>
</template>

<script>
import {ref} from "vue";
import firebase from "firebase/compat";
import {useRouter} from "vue-router";


export default {
  setup() {
    const email = ref("")
    const password = ref("")
    const router = useRouter()

    const Login = () => {
      firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then((data) => {
            router.push('/home')
          })
          .catch(err => alert(err.message))
    }
    return {
      Login,
      email,
      password
    }
  }
}
</script>

<style>
main{
  background-color: #A2AF9F;
  display: flex;
}
#card_login{
  background-image: linear-gradient(to right bottom, #447dfd, #00a4ff, #00c2ff, #00d9db, #00eaad, #19f28c, #4df860, #7cfc00, #a1fd00, #c0fe00, #dcff00, #f5ff0d);
  width: 50vw;
  text-align: center;
  color: #3F4A3C;
  margin: auto;

  padding: 4.5%;
  box-shadow: 0 4px 8px 0 #3F4A3C;
  transition: 0.8s;
}
#card_login:hover{
  box-shadow: 0 8px 10px 0 #3F4A3C;
}
input{
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.4rem;
}
@media screen and (max-width: 500px){
  #card_login{
    margin-top: 5%;
    width: 80%;
    padding: 8%;
    background-image: linear-gradient(to right bottom, #447dfd, #00a4ff, #00c2ff, #00d9db, #00eaad, #19f28c, #4df860, #7cfc00, #a1fd00, #c0fe00, #dcff00, #f5ff0d);
    box-shadow: 0 4px 8px 0 #3F4A3C;
    transition: 0.8s;
  }
  #card_login:hover{
    box-shadow: 0 8px 10px 0 #3F4A3C;
  }
  #logo_corsol{
    width: 15rem;
    margin: auto;
  }
}
</style>