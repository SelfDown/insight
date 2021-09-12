<template>
  <v-jdesign v-model="demo.value" :profile="demo.profile"></v-jdesign>
</template>

<script>
import demo from '../mixins/demo'

export default {
  mixins: [demo],
  mounted() {
    this.load('data/element/demo-profile.json', 'data/element/default.json')
  }
}
</script>
