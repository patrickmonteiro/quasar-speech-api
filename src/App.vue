<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      version_qspeech: process.env.VERSION_QSPEECH
    }
  },
  mounted () {
    this.verificaVersaoNoCache()
  },
  methods: {
    verificaVersaoNoCache () {
      if (localStorage.getItem('version_qspeech') !== this.version_qspeech) {
        localStorage.setItem('version_qspeech', this.version_qspeech)
        setTimeout(() => {
          window.location.reload(true)
        }, 200)
      }
    }
  }
}
</script>

<style>
</style>
