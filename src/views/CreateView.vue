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
          <div id="tiutlo_e_cancel_btn">

            <div id="titulo">
              <h2>Cadastrar empresas</h2>
            </div>

              <div id="cancel_btn_div">

                  <v-btn
                      to="/home"
                      id="cancel_btn"
                      color="error"
                      prepend-icon="mdi-cancel"
                  >
                    Cancelar
                  </v-btn>

              </div>
          </div>


          <br><v-divider></v-divider><br>



          <div id="empresa_foto_titulo">

            <v-card id="adc_nome_empresa">
              <v-text-field
                  label="Nome Fantasia"
                  :rules="rules"
                  hide-details="auto"
                  v-model="nomeEmpresa"
              ></v-text-field>
            </v-card>

            <br>

            <v-card id="card_empresa">

              <div id="nome_empresa">
                <p>{{nomeEmpresa}}</p>
              </div>

              <v-divider></v-divider><br>

              <v-card-actions>
                  <v-file-input
                      label="File input"
                      filled
                      prepend-icon="mdi-camera">
                  </v-file-input>
              </v-card-actions>
            </v-card>

          </div>
          <br>
          <div id="options">
            <v-card>
              <div id="outras_info">
                    <div id="selectCadastroDir">
                      <v-select
                          :items="tiposCadastro"
                          filled
                          label="Responsável"
                      ></v-select>

                      <v-select
                          :items="tiposCadastro"
                          filled
                          label="Tipo de contrato"
                      ></v-select>

                    </div>
                  <div id="selectCadastro">

                    <v-select
                        :items="estados"
                        filled
                        label="Estado"
                    ></v-select>

                   <v-select
                      :items="estados"
                      filled
                      label="Cidade"
                    ></v-select>

                  </div>
                </div>

              <div id="apenas_inputs">

                  <div id="input_field">
                    <div id="input_cnpj">
                      <v-text-field
                          label="CNPJ"
                          :rules="rules"
                          hide-details="auto"
                          v-model="cnpj"
                      ></v-text-field>
                    </div>
                    <div id="input_inscriEstadual">
                      <v-text-field
                          label="Inscrição estadual"
                          :rules="rules"
                          hide-details="auto"
                          v-model="inscri_estadual"
                      ></v-text-field>
                    </div>
                  </div>

                </div>
            </v-card>
            <br>
            <v-divider></v-divider>
              <div id="titulo_user"><h2>Usuário</h2></div>
            <v-divider></v-divider>
            <br>
            <v-card id="user_info">
              <div id="apenas_inputs_user">

                <div id="input_field_user">
                  <div id="input_nomeSobrenome">
                    <v-text-field
                        label="Nome e Sobrenome"
                        :rules="rules"
                        hide-details="auto"
                        v-model="nome_sobrenome"
                    ></v-text-field>
                  </div>
                  <div id="input_email">
                    <v-text-field
                        label="E-mail"
                        :rules="rules"
                        hide-details="auto"
                        v-model="emailAcesso"
                    ></v-text-field>
                  </div>
                </div>
                <div id="input_field_user">
                  <div id="input_telefone">
                    <v-text-field
                        label="Telefone"
                        :rules="rules"
                        hide-details="auto"
                        v-model="telefone"
                    ></v-text-field>
                  </div>
                  <div id="input_email">
                    <v-text-field
                        label="Email"
                        :rules="rules"
                        hide-details="auto"
                        v-model="email"
                    ></v-text-field>
                  </div>
                  <div id="input_password">
                    <v-text-field
                        :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.emailMatch]"
                        :type="show4 ? 'text' : 'password'"
                        name="input-10-2"
                        label="Error"
                        hint="At least 8 characters"
                        value="Pa"
                        error
                        @click:append="show4 = !show4"
                    ></v-text-field>
                  </div>
                </div>

              </div>
            </v-card>
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
    rules: [
      value => !!value || 'Obrigatório',
      value => (value && value.length >= 3) || 'Minino 3 caractéres',
    ],
    tiposCadastro: ['Aprovado', 'Pendente', 'Rejeitado'],
    estados: ['Acre (AC)', 'Alagoas (AL)', 'Amapá (AP)', 'Amazonas (AM)', 'Bahia (BA)', 'Ceará (CE)', 'Distrito Federal (DF)',
      'Espírito Santo (ES)', 'Goiás (GO)', 'Maranhão (MA)', 'Mato Grosso (MT)', 'Mato Grosso do Sul (MS)', 'Minas Gerais (MG)',
      'Pará (PA)', 'Paraíba (PB)', 'Paraná (PR)', 'Pernambuco (PE)', 'Piauí (PI)', 'Rio de Janeiro (RJ)',
      'Rio Grande do Norte (RN)', 'Rio Grande do Sul (RS)', 'Rondônia (RO)', 'Roraima (RR)', 'Santa Catarina (SC)',
      'São Paulo (SP)', 'Sergipe (SE)', 'Tocantins (TO)'],
    imgPreview: '',
    nomeEmpresa: '',
    cnpj: '',
    inscri_estadual: '',
    drawer: null,
    ex11:'primary'}),
  methods : {
    async logout() {
      const url = "https://solicitasol.cordeiro.com.br/graphql"
      const query = "mutation Deslogar {\n deslogar\n}\n"
      const headers = {
        "Authorization": `Bearer ${this.token}`,
        "content-type": "application/json"
      }
      const queryGraphql = {
        "operationName": "Deslogar",
        "query": query,
        "variables": {}
      }
      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: queryGraphql
      })
          .then(
              router.push('/')
          )
    }
  }
}
</script>
<style>
#formularioGerar {
  padding: 2.5rem;
  width: 100%;
}
#tiutlo_e_cancel_btn{
  display: flex;
  width: 100%;
  align-items: center;
}
#titulo{
  width: 50%;
  display: inline-block;
}
#cancel_btn_div{
  width: 50%;
  display: inline-block;
  text-align: right;
}
#card_empresa{
  padding: 2.5rem;
}
#outras_info{
  padding: 2.5rem 2.5rem 0.5rem 2.5rem;
  display: flex;
  width: 100%;
}
#apenas_inputs{
  padding: 0.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  width: 100%;
}
#apenas_inputs_user{
  padding: 2.5rem;
}
#input_field,#input_field_user{
  width: 100%;
}
#adc_nome_empresa{
  padding: 1rem;
}
#nome_empresa{
  text-align: center;
  font-size: 18pt;
  font-style: italic;
}
#selectCadastro,#selectCadastroDir{
  display: inline-block;
  width: 48%;
  margin: auto;
}
#input_cnpj,#input_inscriEstadual,#input_nomeSobrenome,#input_email{
  display: inline-block;
  width: 100%;
  margin: auto;
}
@media screen and (max-width: 720px) {
  #formularioGerar {
    padding: 1rem;
  }
  #card_empresa{
    padding: 1rem;
  }
  #outras_info, #apenas_inputs{
    padding: 1rem;
    display: inline-block;
    width: 100%;
  }
  #adc_nome_empresa{
    padding: 0.5rem;
    text-align: center;
  }
  #selectCadastro,#selectCadastroDir,#input_field{
    width: 100%;
    display: inline-block;
  }
}
</style>