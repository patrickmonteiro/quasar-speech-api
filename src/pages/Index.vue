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
      <div class="col-6 q-pt-md">
        <q-btn
          push color="primary"
          round size="lg" icon="keyboard_voice"
          class="float-right"
          @click="record()"/>
      </div>
        <div class="col-6 q-pt-md">
          <q-btn
          push color="primary"
          round size="lg" icon="play_arrow"
          @click="playAudio()"/>
        </div>
        <div class="col-12 q-pa-xl">
          <q-input
            v-model="text"
            autogrow
            label="Texto"
            clearable
            outlined/>
        </div>
        <div class="col-12 q-pa-lg text-caption">
          <div class="text-bold">Instruções:</div>
          <div>Escolha seu idioma para que o assistente escreva corretamente sua fala.</div>
          <div>Aperte no botão microfone
             <q-btn dense color="primary" round size="xs" icon="keyboard_voice" />
             para iniciar a captura de fala, e autorize seu dispositivo a utilizar o microfone.
          </div>
          <div>
            Ao aparecer a tela com a mensagem "Aguardando Áudio" diga a frase que deseja que seja transcrita.<br>
            Ao finalizar, sua fala aparecerá no campo de Texto.
          </div>
          <div>Caso queira ouvir o texto, basta apertar no botão play <q-btn dense color="primary" round size="xs" icon="play_arrow" />. </div>
        </div>
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
      text: '',
      voiceSelect: 'pt-BR',
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
    playAudio () {
      this.$speechTalk(this.voiceSelect, this.text)
    },
    record () {
      this.$speechToText(this.voiceSelect)
        .then((suc) => {
          this.text = suc
        })
    }
  }
}
</script>
