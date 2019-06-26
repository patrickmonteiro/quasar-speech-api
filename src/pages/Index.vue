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
            filled
            type="textarea"
          />
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
      console.log(teste.getVoices())
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
