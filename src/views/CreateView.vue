<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        temporary
    >
      <v-list-item link to="/home">
        <v-list-item-title>
          Home
        </v-list-item-title>
      </v-list-item>
      <v-list-item link to="/create">
        <v-list-item-title>
          Cadastramento Empresarial
        </v-list-item-title>
      </v-list-item>
      <v-divider class="my-2"></v-divider>
      <v-list-item link>
        <v-list-item-title @click="logout">
          Logout <v-icon icon="mdi-logout"></v-icon>
        </v-list-item-title>
      </v-list-item>

    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
        <v-form @submit.prevent="generate" id="formularioGerar">
          <div id="title">
            <h3>Cadastrar empresa</h3>
            <v-divider></v-divider><br>
            <h4>Empresa:</h4><br>
          </div>

            <div id="colocarFoto">
              <v-btn id="img">
                <span>Adicinar imagen<v-icon x-large>mdi-image</v-icon></span>

              </v-btn>



            </div><br>
          <v-divider>divi</v-divider><br>
          <div id="div">
            <div id="nomeFantasia" class="divis">
              Nome Fanatsia:<br>
              <input id="inp04" type="text" v-model="nome">
            </div>
            <div id="tipoCadastro" class="divis">
              Tipo do cadastro:<br>
              <select v-model="tipoCadastro" id="escolha">
                <option v-for="n in 9" :key="n"> Cadastro {{ n }}</option>
              </select>
            </div>
          </div>
          <div id="div">
            <div id="nomeFantasia" class="divis">
              CPF / CPNJ:<br>
              <input id="inp03" type="tel" v-model="nome">
            </div>
            <div id="tipoCadastro" class="divis">
              Responsável:<br>
              <select v-model="tipoCadastro" id="escolha">
                <option v-for="n in 9" :key="n">Opção {{ n }}</option>
              </select>
            </div>
          </div>
          <div id="div">
            <div id="ie_esta" class="divis">
              <div id="suitch">
                Inscrição estadual
                <div id="ie">
                <v-switch
                    v-model="ex11"
                    color="primary"
                    value="primary"
                    hide-details
                ></v-switch>
                </div>
              </div>
              <input id="inp02" type="tel" v-model="nome">
            </div>
            <div id="tipoCadastro" class="divis">
              Telefone<br>
              <input id="inp01" type="tel" v-model="nome">
            </div>
          </div>
          <div id="div">
            <div id="tipoCadastro" class="divis">
              Cidade<br>
              <select v-model="tipoCadastro" id="escolha">
                <option v-for="n in 9" :key="n">Opção {{ n }}</option>
              </select>
            </div>
            <div id="tipoCadastro" class="divis">
              Estado<br>
              <select v-model="tipoCadastro" id="escolha">
                <option v-for="n in 9" :key="n">Opção {{ n }}</option>
              </select>
            </div>
          </div>
        </v-form>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  data: () => ({
    drawer: null,
    ex11:'primary'}),
  methods :{
    async logout() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"
      const query = "mutation Deslogar {\n deslogar\n}\n"
      const headers = {
        "Authorization":`Bearer ${this.token}`,
        "content-type":"application/json"
      }
      const queryGraphql = {
        "operationName":"Deslogar",
        "query":query,
        "variables":{}
      }
      const response = await axios({
        url:url,
        method:'post',
        headers:headers,
        data:queryGraphql
      })
          .then(
              router.push('/')
          )
    }
  }
}
</script>
<style>
input,#escolha{
  text-align: center;
  width: 95%;
  background-color: #ffffff;
  border-radius: 0.3rem;
  height: 2rem;
  margin: 0;
}
#div{
  display: flex;
}
#colocarFoto{
  width: 90%;
  height: 6rem;
  margin: auto;
}
#formularioGerar{
  padding: 2.5rem;
  width: 100%;
}
#nomeFantasia,#tipoCadastro,#img{
  width: 100%;
  height: 5rem;
}
#ie{
  margin-top: -2.8%;
  margin-left: 50%;
}
#suitch{
  display: flex;
}
#ie_esta{
  width: 100%;
}
@media screen and (max-width: 720px) {
  #formularioGerar {
    padding: 1rem;
  }
}
</style>
