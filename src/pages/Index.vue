<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-pa-xl">
      <q-select
        outlined v-model="voiceSelect"
        :options="optionsVoice"
        :label="$t('languages')"
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
      <div class="col-12 text-center">
        <q-toggle
        v-model="continuous"
        :label="$t('continuous')"
        left-label
      />
      </div>
      <div class="col-12">
        <q-input
          filled
          v-model="text"
          outlined
          :label="$t('textLabel')"
          @blur="n++"
        >
          <template v-if="text" v-slot:append>
            <q-icon name="cancel" @click.stop="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div class="col-12 text-center">
         <img
          alt="Quasar logo"
          src="statics/podcast.svg"
          style="width: 190px"
        >
      </div>
      <div class="col-12 q-pa-lg text-caption">
          <div class="text-bold" v-text="$t('instructionsTitle')" />
          <div v-text="$t('instructionsLangDesc01')" />
          <div>
            {{ $t('instructionsLangDesc02') }}
            <q-btn dense color="primary" round size="xs" icon="keyboard_voice" />
            {{ $t('instructionsLangDesc03') }}
          </div>
          <div>
            {{ $t('instructionsLangDesc04') }}<br>
            {{ $t('instructionsLangDesc05') }}
          </div>
          <div>{{ $t('instructionsLangDesc06') }} <q-btn dense color="primary" round size="xs" icon="play_arrow" />.</div>
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
      voiceSelect: this.$t('langValue'),
      optionsVoice: [],
      continuous: false,
      btnStop: false,
      n: 1
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
      if (!this.$q.platform.is.chrome) {
        this.$q.notify({
          message: this.$t('unsupportedBrowserDesc'),
          color: 'negative',
          icon: 'sentiment_very_dissatisfied'
        })
        return false
      }
      this.btnStop = true
      this.$speechToText.start(this.voiceSelect, this.$t('waitingAudioDesc'), this.continuous)
        .then((suc) => {
          this.text += ' ' + suc
          if (this.continuous) {
            this.record()
          } else {
            this.btnStop = false
          }
        })
        .catch(() => {
          this.btnStop = false
        })
    },
    stop () {
      this.$speechToText.stop()
      this.btnStop = false
    }
  }
}
</script>
