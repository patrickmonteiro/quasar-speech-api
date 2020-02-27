<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-pt-md">
      <q-select
        outlined v-model="voiceSelect"
        :options="optionsVoice"
        label="Idiomas"
        class="col-8"
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
      <div class="col-8 text-center">
        <q-toggle
        v-model="continuous"
        label="Contínuo"
        left-label
      />
      </div>
      <div class="col-10 q-pa-xl">
        <q-input filled v-model="text" outlined label="Label" @blur="n++">
          <template v-if="text" v-slot:append>
            <q-icon name="cancel" @click.stop="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <div ref="vlibras-ref" id="teste">
            {{ text }}
        </div>
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
      <q-page-sticky v-if="btnStop" position="bottom-right" :offset="[15, 18]" style="z-index: 10000">
        <q-btn fab icon="stop" color="negative" @click="stop()" />
      </q-page-sticky>
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
      optionsVoice: [],
      continuous: false,
      btnStop: false,
      n: 1
    }
  },
  mounted () {
    this.setVoices()
    setTimeout(() => {
      document.getElementById('btn-acess').click()
    }, 500)
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
      this.btnStop = true
      this.$speechToText.start(this.voiceSelect, this.continuous)
        .then((suc) => {
          // console.log('retornou', suc)
          this.text += ' ' + suc
          if (this.continuous) {
            this.record()
          } else {
            this.btnStop = false
            this.setVlibra()
            // setTimeout(() => {
            //   this.$refs.vlibras.click()
            // }, 1500)
          }
        })
        .catch(() => {
          console.log('erro no retorno')
          this.btnStop = false
        })
    },
    stop () {
      this.$speechToText.stop()
      this.btnStop = false
    },
    setVlibra () {
      document.getElementsByClassName('vpw-settings-btn-close')[0].click()
      setTimeout(() => {
        document.getElementById('btn-acess').click()
      }, 500)
      setTimeout(() => {
        // this.$refs.vlibras.click()
        console.log('widget', document.getElementById('teste').getElementsByClassName('vw-text'))
        document.getElementById('teste').getElementsByClassName('vw-text')[0].click()
        // console.log('texto', this.$refs.vlibras)
      }, 1500)
    }
  }
}
</script>
