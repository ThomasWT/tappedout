<template>
  {{ decks }}
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      decks: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await axios.get('https://thomaswt.dk/api/tappedout/doomberg');
      this.decks = res.data
    }
  }
}
</script>