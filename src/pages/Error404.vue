<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">{{ $t('error404Desc') }}<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      :label="$t('error404BackButton')"
      @click="$router.push('/')"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
