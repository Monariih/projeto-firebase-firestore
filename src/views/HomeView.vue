 <template>

   <!-- Navbar é o cabeçalho onde segura o logo corsol,
    e aonde começa o navigation drawer é onde habita o
    menu lateral e todas as suas configurações.-->

   <v-app id="inspire">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title id="header"><img id="logo_corsol_header" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-toolbar-title>

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
        <v-container>
          <v-row>
            <template v-for="n in 4" :key="n">
              <v-col
                  class="mt-2"
                  cols="12"
              >
                <strong>Category {{ n }}</strong>
              </v-col>

              <v-col
                  v-for="j in 6"
                  :key="`${n}${j}`"
                  cols="6"
                  md="2"
              >
                <v-sheet height="150"></v-sheet>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
<script>
import axios from "axios";
import router from "../router";

export default {

  //Exerce o papel de "guardar o token" de autorização para
  //autoexplicativo com o nome logout()

  data: () => ({ drawer: null }),
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
#logo_corsol_header {
  width: 11rem;
}
v-main{
  background-color: #A2AF9F;
  display: flex;
}
</style>