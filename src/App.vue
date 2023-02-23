<template>
  <div v-if="!loading" class="mainscreen w-full z-0 fixed top-0 overflow-scroll">
    <router-view class="fixed top-0" v-slot="{ Component, route }">
      <!-- Use any custom transition and  to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :decks="decks" :is="Component" />
      </transition>
    </router-view>
  </div>
  <div class="fixed bottom-0 w-full h-20 z-100">
    <menuBar></menuBar>
  </div>
</template>

<script>
  import axios from "redaxios";
  import menuBar from './components/menu.vue'
  export default {
    name: "app",
    components: {
      menuBar
    },
    data() {
      return {
        decks: [],
        loading: true,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        this.loading = true;
        let res = await axios.get("/test.json");
     /*    let res = await axios.get("https://thomaswt.dk/api/tappedout/doomberg"); */
        this.decks = res.data.filter(x => x.cards.length);
        this.loading = false;
      },
    },
  };
</script>

<style>
.mainscreen {
  height: calc(100% - 80px);
  width:100%;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>