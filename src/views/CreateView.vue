<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><img id="logo_corsol_header" src="https://uploads-ssl.webflow.com/63235e08d659e25502559daf/63235e44d40246d10737645b_logo-corsolar-negativo.svg"></v-toolbar-title>
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

    <v-main id="principal">
        <v-form @submit.prevent="criaUsuarioEmpresarial" id="formularioGerar">
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


          <br><v-divider><!-- Linha divisória horizontal --></v-divider><br>

          <!-- Pedaços do formulário que solicitam a entrada
           tanto do noe quanto o de uma imagem.-->

          <div id="empresa_foto_titulo">

            <v-card id="adc_nome_empresa">
              <v-text-field
                  variant="outlined"
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

              <v-divider><!-- Linha divisória horizontal --></v-divider><br>

              <v-card-actions>
                <v-file-input
                    v-model="fotoEmpresa"
                    color="deep-purple-accent-4"
                    counter
                    label="Foto"
                    multiple
                    placeholder="Select your files"
                    prepend-icon="mdi-camera"
                    variant="outlined"
                    :show-size="1000"
                ></v-file-input>
              </v-card-actions>
            </v-card>

          </div>
          <br>

          <!--Entradas opicionais que devem conectar com
          o banco de dados para receberem as informações
          a serem preenchidas.-->

          <div id="options">
            <v-card>
              <div id="outras_info">
                    <div id="selectCadastroDir">
                      <v-select
                          variant="outlined"
                          :items="tiposCadastro"
                          filled
                          label="Responsável"
                      ></v-select>

                      <v-select
                          variant="outlined"
                          :items="tiposCadastro"
                          filled
                          label="Tipo de contrato"
                      ></v-select>



                    </div>
                  <div id="selectCadastro">

                    <v-select
                        variant="outlined"
                        filled
                        v-model="selectedState"
                        :items="states"
                        label="Selecione um estado"
                    />
                    <v-select
                        variant="outlined"
                        filled
                        v-model="selectedCity"
                        :items="cities[selectedState]"
                        label="Selecione uma cidade"
                    />

                  </div>
                </div>

              <!-- A partir deste ponto todas as entradas são
               manuais e terão de ser guardadas como strings e
               postadas por envio deste formulário.-->

              <div id="apenas_inputs">

                  <div id="input_field">
                    <div id="input_cnpj">
                      <v-text-field
                          variant="outlined"
                          label="CNPJ"
                          :rules="rules"
                          hide-details="auto"
                          v-model="cnpj"
                      ></v-text-field>
                    </div>
                    <div id="input_inscriEstadual">
                      <v-text-field
                          variant="outlined"
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
            <v-divider><!-- Linha divisória horizontal --></v-divider>
              <div id="titulo_user"><h2>Usuário</h2></div>
            <v-divider><!-- Linha divisória horizontal --></v-divider>
            <br>
            <v-card id="user_info">
              <div id="apenas_inputs_user">

                <div id="input_field_user">
                  <div id="input_nomeSobrenome">
                    <v-text-field
                        variant="outlined"
                        label="Nome e Sobrenome"
                        :rules="rules"
                        hide-details="auto"
                        v-model="nome_sobrenome"
                    ></v-text-field>
                  </div>
                  <div id="input_email">
                    <v-text-field
                        variant="outlined"
                        label="E-mail"
                        :rules="rules"
                        hide-details="auto"
                        v-model="emailAcesso"
                    ></v-text-field>
                  </div>

                  <div id="input_telefone">
                    <v-text-field
                        variant="outlined"
                        label="Telefone"
                        :rules="rules"
                        hide-details="auto"
                        v-model="telefone"
                    ></v-text-field>
                  </div>


                  <div id="input_password">
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                      >
                        <v-text-field
                            variant="outlined"
                            v-model="cadastraPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            label="Senha"
                            hint="Minimo 8 caracteres"
                            counter
                            @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                      >
                        <v-text-field
                            variant="outlined"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-2"
                            label="confirmar senha"
                            hint="Minimo 8 caracteres"
                            class="input-group--focused"
                            @click:append="show2 = !show2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-card>

            <br><v-divider><!-- Linha divisória horizontal --></v-divider><br>

            <!-- Botão responsável por realizar o submit do
             formulário e acionar a função "Cadastrar()"-->

            <div id="btn_agree">
              <v-btn
                  type="submit"
                  value="Post"
                  color="success">
                Cadastrar
                <v-icon
                    icon="mdi-checkbox-marked-circle">
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-form>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import router from "../router";
import statesCities from "../assets/statesCities.json"

export default {
  props:{
    token :{
      type: String,
    }
  },
  data: () => {
    return ({
      selectedState: null,
      selectedCity: null,
      states: Object.keys(statesCities),
      cities: statesCities,

      /* Rules é a sequencia de regras que deve seguir o input
      de nome fantasia.*/

      rules: [
        value => !!value || 'Obrigatório',
        value => (value && value.length >= 3) || 'Minino 3 caractéres',
      ],

      /* Arrays feitos para substituir momentaneamente as
       informações a serem extraidas da API*/

      tiposCadastro: ['Aprovado', 'Pendente', 'Rejeitado'],

      /* Variavei responsáveis por guardas os v-models dos inputs */

      imgPreview: '',
      nomeEmpresa: '',
      fotoempresa: '',
      cnpj: '',
      inscri_estadual: '',
      nome_sobrenome: '',
      emailAcesso: '',
      telefone: '',
      cadastraPassword: '',
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Minimo 8 caracteres',

      /*--------------------------------------------------------*/
      /* Apenas dados responsáveis pelas estilizações,
      tais como o deslize da barra de menu lateral.*/

      drawer: null,
      ex11: 'primary',
      show1: false,
      show2: true
    });
  },
  created() {
    console.log(this.token)
  },
  methods: {
    async criaUsuarioEmpresarial() {
      const url = "https://cordeiro.solarview.com.br/graphql"
      const query = "mutation CriarUsuarioEmpresarial($input: UserCreateInput!," +
          " $empresaInput: EmpresaCreateInput!)" +
          " {\n  criarUsuarioEmpresarial(input:" +
          " $input, empresaInput: $empresaInput)" +
          " {\n    nome\n    empresa {\n      nome\n" +
          "    }\n  }\n}\n"

      const headers = {
        "Authorization": `Bearer ${this.token}`,
        "content-type": "application/json"
      }
      const queryGraphql = {
        "operationName":"CriarUsuarioEmpresarial",
        "query":query,
        "variables":{
          'empresaInput':{'nome': `${this.nomeEmpresa}`,
          'cidade': `${this.selectedCity}`,
          'cnpjCpf': `${this.cnpj}`,
          'estado': `${this.selectedState}`,
          'inscricaoEstadual': `${this.inscri_estadual}`},
          'input':{'email':`${this.emailAcesso}`,
          'senha':`${this.cadastraPassword}`,
          'nome':`${this.nomeEmpresa}`,
          'telefone':`${this.telefone}`},
          'nome_sobrenome': `${this.nome_sobrenome}`
        }
      }
      const response = await axios({
        url:url,
        method:'post',
        headers:headers,
        data:queryGraphql
      })

          .then(console.log(response))


            alert(`${this.nomeEmpresa} Criado com sucesso`),
            router.push('/home')


    },


    async logout() {
      const url = "https://cordeiro.solarview.com.br/graphql"
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
              console.log(response),
              router.push('/')
          )

    }
  }
}
</script>
<style>
#principal{
  background-color: #324B4D;
  color: #f2f2f2;
}
#logo_corsol_header{
  width: 11rem;
}
#formularioGerar {
  padding: 3rem;
  width: 100%;
}
#user_info,
#outras_info,
#card_empresa,
#adc_nome_empresa,
#apenas_inputs{
  background-color: #004600;
  color: #ffffff;
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
#apenas_inputs_user,
#adc_nome_empresa,
#card_empresa{
  padding: 2.5rem;
}
#input_field,#input_field_user{
  width: 100%;
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
#input_password{
  margin-top: 1.3%;
}
#input_cnpj,
#input_inscriEstadual,
#input_nomeSobrenome,
#input_email,
#input_password,
#input_telefone{
  display: inline-block;
  width: 100%;
  margin: 1% 1% 1% 1%;
}
#btn_agree{
  text-align: right;
}
@media screen and (max-width: 720px) {
  #formularioGerar,
  #apenas_inputs_user,
  #adc_nome_empresa,
  #card_empresa,
  #formularioGerar{
    padding: 1rem;
  }
  #outras_info,
  #apenas_inputs{
    padding: 1rem;
    display: inline-block;
    width: 100%;
  }
  #adc_nome_empresa{
    padding: 0.5rem;
    text-align: center;
  }
  #selectCadastro,
  #selectCadastroDir,
  #input_field{
    width: 100%;
    display: inline-block;
  }
}
</style>