<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-pt-md">
      <q-select
        outlined v-model="voiceSelect"
        :options="optionsVoice"
        label="Idiomas"
        class="col-12"
        emit-value
        map-options/>
       <!-- <div class="col-6 q-pt-md">
       <q-btn
          push color="primary"
          round size="lg" icon="keyboard_voice"
          class="float-right"
          @click="record()"/>
      </div> -->
        <div class="col-12 q-pt-md text-center">
          <q-btn
          push color="primary"
           size="lg" icon="play_arrow" label="Iniciar Cadastro"
          @click="iniciarCadastroAudio()"/>
        </div>
    </div>
    <div class="row q-pt-md q-px-md q-col-gutter-md">
      <q-input outlined v-model="form.nome" label="Nome Completo" class="col-12"
        ref="nome"/>
      <q-input outlined v-model="form.idade" label="Idade" class="col-12"
        ref="idade" type="tek"/>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      form: {
        nome: '',
        idade: ''
      },
      voiceSelect: 'pt-BR',
      optionsVoice: []
    }
  },
  mounted () {
    this.setVoices()
  },
  methods: {
    setVoices () {
      console.log(this.optionsVoice.length)
      let id = setInterval(() => {
        if (this.optionsVoice.length === 0) {
          this.voicesList()
        } else {
          clearInterval(id)
        }
      }, 50)
    },
    voicesList () {
      let teste = window.speechSynthesis
      this.optionsVoice = teste.getVoices().map(voice => ({
        label: voice.name, value: voice.lang
      }))
    },
    // playAudio () {
    //   this.$speechTalk(this.voiceSelect, this.text)
    // },
    record (passo, callback = null) {
      this.$speechToText()
        .then((suc) => {
          passo(suc)
          if (callback) {
            callback()
          }
        })
    },
    iniciarCadastroAudio () {
      this.$speechTalk(this.voiceSelect, 'Olá, iniciaremos seu cadastro.')
        .then(() => {
          this.segundoPasso()
        })
    },
    segundoPasso () {
      this.$speechTalk(this.voiceSelect, 'Qual o seu nome ?.')
        .then(() => {
          this.record(this.setFormNome, this.terceiroPasso)
        })
    },
    terceiroPasso () {
      this.$speechTalk(this.voiceSelect, 'Qual sua idade ?.')
        .then(() => {
          this.record(this.setFormIdade, this.finalizar)
        })
    },
    finalizar () {
      this.$speechTalk(this.voiceSelect, 'Obrigado por realizar seu cadastro!')
    },
    setFormNome (nome) {
      this.form.nome = nome
      this.$refs.nome.focus()
    },
    setFormIdade (nome) {
      this.form.idade = nome
      this.$refs.idade.focus()
    }
  }
}
</script>
