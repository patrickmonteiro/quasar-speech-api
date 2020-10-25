<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar Speech
        </q-toolbar-title>

        <div class="q-mx-md">
          <q-select
            v-model="lang"
            :options="langOptions"
            color="grey-1"
            label-color="grey-1"
            dark
            :label="$t('langSelect')"
            standout
            dense
            emit-value
            borderless
            map-options
            options-dense
            style="min-width: 150px"
          />
        </div>

        <div>
          {{ $t('version') }}: {{ version_qspeech }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      :breakpoint="400"
      show-if-above
    >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list>
        <q-item-label header v-text="$t('essentialLinksDesc')" />
        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-text="$t('menuHomeText')" />
            <q-item-label v-text="$t('menuHomeDesc')" caption />
          </q-item-section>
        </q-item>
        <q-item clickable to="/cadastro">
          <q-item-section avatar>
            <q-icon name="settings_voice" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-text="$t('menuRegistrationText')" />
            <q-item-label v-text="$t('menuRegistrationDesc')" caption />
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-text="$t('menuQuasarText')" />
            <q-item-label v-text="$t('menuQuasarDesc')" caption />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
       <q-img class="absolute-top" src="statics/fundo-menu.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="statics/patrick.jpg">
            </q-avatar>
            <div class="text-weight-bold">Patrick Monteiro</div>
            <div class="q-gutter-sm">
              <q-btn dense color="white" text-color="primary" round size="sm" icon="fab fa-github"
              type="a" href="https://github.com/patrickmonteiro/quasar-speech-api" target="_blank" />
              <q-btn dense color="white" text-color="primary" round size="sm" icon="fab fa-linkedin-in"
              type="a" href="https://www.linkedin.com/in/engpatrickmonteiro/" target="_blank" />
              <q-btn dense color="white" text-color="primary" round size="sm" icon="fab fa-twitter"
              type="a" href="https://twitter.com/monteiropatrick" target="_blank" />
            </div>
          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      version_qspeech: process.env.VERSION_QSPEECH,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-US', label: 'English (United States)' },
        { value: 'pt-BR', label: 'Português (Brasil)' }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
