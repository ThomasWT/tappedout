<template>
  <div class="deckContainer w-full">
    <div v-for="deck in decks" class="flex my-4 h-16">
      <div
        @click="goTo(deck.link)"
        class="deckContainer w-[90%] mx-auto border rounded-md border-blue-500 overflow-hidden shadow-lg relative flex items-center justify-center"
      >
        <div
          class="bg z-0 absolute overflow-hidden w-[103%] h-[103%] -ml-2"
          :style="{ background: `url(${deck?.cards[0]?.cards[0].image})` }"
        ></div>
        <div class="absolute overlay w-full h-full bg-black opacity-30"></div>
        <div
          class="text-white z-10 w-full h-full p-2 relative flex items-center font-bold text-2xl"
        >
          <p>{{ truncate(deck.name, 25) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["decks"],
    methods: {
      truncate(str, length) {
        var dots = str.length > length ? "..." : "";
        return str.substring(0, length) + dots;
      },
      goTo(link) {
        this.$router.push({ path: "/deck", query: { deck: link }});
      },
    },
  };
</script>

<style lang="scss">
  .bg {
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    transform: scale(1.2);
    filter: blur(2px) !important;
  }
</style>
