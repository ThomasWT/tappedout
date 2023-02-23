<template>
  <div class="w-full">
      <router-link class="mb-4 p-2 py-4 font-bold flex items-center text-blue-500 bg-blue-100" to="/"><svg class="w-4 h-4 mr-2" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg> Back</router-link>
    <div class="px-4">
      <p class="font-bold text-2xl">{{ deck.name }}</p>
      <p>{{ deck.type }}</p>
    </div>

    <div class="px-4" v-for="cardType in deck.cards">
      <div
        class="p-4 border border-1 border-blue-500 rounded-md shadow-lg my-4"
      >
        <p class="font-bold">{{ cardType.type }}</p>
        <ul>
          <li class="flex items-center my-2" v-for="card in cardType.cards">
            <div class="mr-2"><img class="w-4 h-4 rounded-full" :src="card.image"></div>
            <div><span class="font-bold">{{ card.quantity }}x</span> {{ card.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deck",
    props: ["decks"],
    mounted() {
      console.log(this.$route.params);
    },
    computed: {
      deck() {
        return this.decks.filter((x) => x.link == this.$route.query.deck)[0];
      },
    },
  };
</script>
