<template>
  <div class="mainscreen w-full z-0 fixed top-0 overflow-scroll overflow-x-hidden">
    <router-view class="fixed top-0" v-slot="{ Component, route }">
      <!-- Use any custom transition and  to `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :decks="decks" :is="Component" />
      </transition>
    </router-view>

  </div>

    <div class="fixed top-0 w-full h-[88%] p-8 flex flex-col items-center justify-center" v-if="noData && $route.path == '/'">
      <p class="text-2xl text-blue-500 text-center">Seems like you're new!<br> Go to <router-link
      to="/settings"
      class="font-bold"
      >Settings</router-link
    > to get started!</p>
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
    watch:{
    $route (to, from){
       if(to.path == '/') {
        this.getData()
       }
      }
    },
    data() {
      return {
        decks: [],
        noData: false,
      };
    },
    mounted() {
      this.getData();
    },
    
    methods: {
      async getData() {
        if(localStorage.getItem("decks")) {
           this.noData = false;
          this.decks = JSON.parse(localStorage.getItem("decks")).filter(x => x.cards.length);
        } else {
          this.decks = [];
          this.noData = true;
        }
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