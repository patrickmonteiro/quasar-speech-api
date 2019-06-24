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
      let speech = new SpeechSynthesisUtterance()
      // Set the text and voice attributes.
      speech.lang = this.voiceSelect
      speech.text = this.text
      speech.volume = 1
      speech.rate = 1
      speech.pitch = 1
      window.speechSynthesis.speak(speech)
    },
    record () {
      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      let recognition = SpeechRecognition ? new SpeechRecognition() : false
      recognition.lang = this.voiceSelect
      recognition.start()

      recognition.onresult = (event) => {
        let current = event.resultIndex

        // Get a transcript of what was said.
        let transcript = event.results[current][0].transcript

        // Add the current transcript to the contents of our Note.
        // var noteContent += transcript
        this.text += transcript
      }

      recognition.onend = () => {
        this.noteContent = ''
      }
    }
  },
  start () {
    this.recognition.start()
    // this.recognition.lang = 'en-US'
  }
}
</script>
