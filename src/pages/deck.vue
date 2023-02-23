<template>
    <div class="w-full h-full overflow-scroll relative">
<div class="bg-white w-full h-full opacity-70 z-0 fixed"></div>
        <div v-if="deck.cards[0].cards[0].image" class="fixed w-full h-full -z-10 !bg-cover bgDeck" :style="{'background': `url(${deck.cards[0].cards[0].image})`}"></div>
      
  <div class="w-full relative z-10">

    <router-link
      class=" fixed top-0 z-30 w-full mb-4 p-2 py-4 font-bold flex items-center text-blue-500 bg-white shadow-md"
      to="/"
      ><span v-html="backicon"></span> Back</router-link
    >
    <div class="px-4 relative mt-20">
      <p class="font-bold text-2xl">{{ deck.name }}</p>
      <div class="flex items-start flex-col">  <p class="mr-2">{{ deck.type }}</p> <p class="text-xs">Worth: ${{value.toFixed(2)}}</p></div>
    </div>

    <div class="px-4 " v-for="cardType in deck.cards">
      <div
        class="p-4 border border-1 border-blue-500 rounded-md shadow-lg my-4  bg-white"
      >
        <p class="font-bold">{{ cardType.type }}</p>
        <ul>
          <li
            @click="setCard(card)"
            class="flex items-center my-2"
            v-for="card in cardType.cards"
          >
            <div class="mr-2">
              <img class="w-4 h-4 rounded-full" :src="card.image" />
            </div>
            <div>
              <span class="font-bold">{{ card.quantity }}x</span>
              {{ card.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <card :card="card" @close="close" v-if="show"></card>
  </div>
    </div>
  
</template>
<script>
  import card from "../components/card.vue";
  import { ModalsContainer, useModal } from "vue-final-modal";
  export default {
    name: "deck",
    props: ["decks"],
    components: {
        card,
        ModalsContainer
    },
    mounted() {
     var myDiv = document.querySelectorAll('.mainscreen')[0];
        myDiv.scrollTop = 0;
    },
    data() {
      return {
        card: {},
        show: false,
        backicon: `<svg class="w-4 h-4 mr-2" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" > <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/> </svg>`,
      };
    },
    methods: {
      setCard(card) {
        this.card = card;
        this.show = true;
      },
      close() {
        this.card = null;
        this.show = false;
      }
    },
    computed: {
      deck() {
        return this.decks.filter((x) => x.link == this.$route.query.deck)[0];
      },
      value() {
        let val = 0;
        this.deck.cards.forEach((cardtype) => {
            cardtype.cards.forEach(card => {
                val += Number(card.price)
            })
        })
        return val
      }
    },
  };
</script>


<style>
.bgDeck {
        background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    transform: scale(1.2);
    filter: blur(2px) !important;
}
</style>