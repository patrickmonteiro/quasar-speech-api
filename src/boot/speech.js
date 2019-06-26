import { Loading, QSpinnerAudio, QSpinnerBars } from 'quasar'
export default async ({ Vue }) => {
  Vue.prototype.$speechTalk = (lang = 'pt-BR', text) => {
    return new Promise((resolve, reject) => {
      let speech = new SpeechSynthesisUtterance()
      // Set the text and voice attributes.
      speech.lang = lang
      speech.text = text
      speech.volume = 1
      speech.rate = 1
      speech.pitch = 1
      setTimeout(() => {
        window.speechSynthesis.speak(speech)
      }, 200)

      speech.addEventListener('start', () => {
        Loading.show({
          delay: 0,
          spinner: QSpinnerAudio, // ms,
          backgroundColor: 'primary'
        })
      })

      speech.addEventListener('end', () => {
        Loading.hide()
        resolve(true)
      })
    })
  }
  Vue.prototype.$speechToText = (lang = 'pt-BR') => {
    return new Promise((resolve, reject) => {
      let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      let recognition = SpeechRecognition ? new SpeechRecognition() : false
      let text = ''

      setTimeout(() => {
        Loading.show({
          // delay: 400,
          spinner: QSpinnerBars, // ms,
          backgroundColor: 'primary',
          message: 'Aguardando áudio',
          messageColor: 'white'
        })
        recognition.lang = lang // this.voiceSelect
        recognition.start()
      }, 400)

      recognition.onresult = (event) => {
        let current = event.resultIndex
        // Get a transcript of what was said.
        let transcript = event.results[current][0].transcript
        // Add the current transcript to the contents of our Note.
        // var noteContent += transcript
        text += transcript
        resolve(text)
      }
      recognition.onend = () => {
        text = ''
        Loading.hide()
      }
    })
  }
}
