<template>
  <v-main>
    <v-card id="card_home">
      <h1> Bem vindo, {{ name }}</h1><br><br>

      <router-link to="/about">About</router-link>

      <br><br>

      <v-btn class="logout" @click="Logout"> Logout</v-btn>
    </v-card>
  </v-main>
</template>
<script>
import { ref, onBeforeMount } from 'vue';
import firebase from "firebase/compat";

export default {
  setup(){
    const name = ref("")
    onBeforeMount(() => {
      const user = firebase.auth().currentUser
      if (user){
        name.value = user.email.split('@')[0]
      }
    })
    const Logout = () => {
      firebase
          .auth()
          .signOut()
          .then(() => console.log("Signed Out"))
          .catch(err => alert(err.message))
    }

    return{
      name,
      Logout
    }
  }
}

</script>
<style>
v-main{
  background-color: #A2AF9F;
  display: flex;
}
#card_home{
  width: 50vw;
  text-align: center;
  color: #3F4A3C;
  margin: auto;
  padding: 4.5%;
  box-shadow: 0 4px 8px 0 #3F4A3C;
  transition: 0.8s;
}
#card_home:hover{
  box-shadow: 0 8px 10px 0 #3F4A3C;
}
@media screen and (max-width: 500px){
  #card_home{
    margin-top: 5%;
    width: 80%;
    padding: 8%;
    box-shadow: 0 4px 8px 0 #3F4A3C;
    transition: 0.8s;
  }
  #card_home:hover {
    box-shadow: 0 8px 10px 0 #3F4A3C;
  }
}
</style>