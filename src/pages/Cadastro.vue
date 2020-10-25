<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-pt-md q-px-md">
      <q-select
        outlined v-model="voiceSelect"
        :options="optionsVoice"
        :label="$t('languages')"
        class="col-12"
        emit-value
        map-options/>
        <div class="col-12 q-pt-md text-center">
          <q-btn
          push color="primary"
           size="lg" icon="play_arrow" :label="$t('startRegistrationButton')"
          @click="iniciarCadastroAudio()"/>
        </div>
    </div>
    <div class="row q-pt-md q-px-md q-col-gutter-md">
      <q-input
        outlined
        v-model="form.nome"
        :label="$t('fullNameLabel')"
        class="col-12"
        ref="nome"
      />
      <q-input
        outlined
        v-model="form.idade"
        :label="$t('ageLabel')"
        class="col-12"
        ref="idade"
        type="tek"
      />
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
      voiceSelect: this.$t('langValue'),
      optionsVoice: []
    }
  },
  mounted () {
    this.setVoices()
  },
  methods: {
    setVoices () {
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
    record (passo, callback = null) {
      this.$speechToText.start(this.voiceSelect, false)
        .then((suc) => {
          passo(suc)
          if (callback) {
            callback()
          }
        })
    },
    iniciarCadastroAudio () {
      this.$speechTalk(this.voiceSelect, this.$t('stepRegistrationLangDesc01'))
        .then(() => {
          this.segundoPasso()
        })
    },
    segundoPasso () {
      this.$speechTalk(this.voiceSelect, this.$t('stepRegistrationLangDesc02'))
        .then(() => {
          this.record(this.setFormNome, this.terceiroPasso)
        })
    },
    terceiroPasso () {
      this.$speechTalk(this.voiceSelect, this.$t('stepRegistrationLangDesc03'))
        .then(() => {
          this.record(this.setFormIdade, this.finalizar)
        })
    },
    finalizar () {
      this.$speechTalk(this.voiceSelect, this.$t('stepRegistrationLangDesc04'))
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
