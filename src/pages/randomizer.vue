<template>
  <div class="p-4 w-full h-full overflow-scroll">
    <div class="p-4 bg-blue-100 w-full rounded-md">
      <p class="mb-2">What decks do you want to pick?</p>
      <div class="flex">
        <div v-for="(filter, index) in filters" class="flex items-center mx-2">
          <input
            @change="setFilter(filter)"
            :id="'filter_' + index"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            :for="'filter_' + index"
            class="ml-2 text-md font-medium text-gray-900"
            >{{ filter }}</label
          >
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-center my-4">
      <button
        @click="randomizeIt"
        type="button"
        :disabled="!filteredDecks.length || randomRunning"
        class="text-white w-auto bg-blue-700 hover:bg-blue-800 disabled:opacity-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Pick a deck for me
      </button>
    </div>
    <div>
      <carousel
        class="flex items-center mt-4"
        :items-to-show="1.5"
        :wrapAround="true"
        :autoplay="sliderSettings.autoplay"
        :transition="sliderSettings.transition"
      >
        <slide
          class="overflow-hidden p-4 m-2 relative"
          v-for="slide in filteredDecks"
          :key="slide"
        >
          <div
            class="p-4 relative h-full w-full flex items-center overflow-hidden rounded-lg"
          >
            <div
              class="h-full w-full absolute bg2 m-4 z-0 shadow-lg"
              :style="{ background: `url(${slide?.cards[0]?.cards[0].image})` }"
            ></div>
            <div
              class="absolute overlay top-0 w-full -ml-4 h-full bg-black opacity-30"
            ></div>

            <p class="text-white font-bold text-xl relative z-10">
              {{ slide.name }}
            </p>
          </div>

          <!--           <div>
 <div
          class="bg2 z-0 absolute -top-2 left-[-50px] overflow-hidden w-[113%] h-[113%] m-8"
          :style="{ background: `url(${slide?.cards[0]?.cards[0].image})` }"
        ></div>
          <div class="absolute overlay top-0 left-[-10px] w-full h-full bg-black opacity-30"></div>
        <div
          class="text-white z-10 w-full h-full p-2 relative flex items-center font-bold text-2xl"
        >
          <p>{{ slide.name}}</p>
        </div>
          </div> -->
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
  import "vue3-carousel/dist/carousel.css";
  import { Carousel, Slide } from "vue3-carousel";
  export default {
    name: "randomizer",
    props: ["decks"],
    components: {
      Carousel,
      Slide,
    },
    data() {
      return {
        activeFilters: [],
        randomRunning: false,
        sliderSettings: {
          autoplay: 0,
          transition: 0,
        },
      };
    },
    methods: {
      randomizeIt() {
        this.randomRunning = true;
        let max = 4000;
        let min = 1000;
        this.sliderSettings.autoplay = 1;
        this.sliderSettings.transition = 100;
        setTimeout(() => {
              this.sliderSettings.autoplay = 200;
          this.sliderSettings.transition = 500;
          setTimeout(() => {
              this.sliderSettings.autoplay = 300;
            this.sliderSettings.transition = 1000;
            setTimeout(() => {
              this.sliderSettings.transition = 0;
              this.sliderSettings.autoplay = 0;
              this.randomRunning = false;
            }, Math.floor(Math.random() * (max - min) + min));
          }, Math.floor(Math.random() * (max - min) + min));
        }, Math.floor(Math.random() * (max - min) + min));
      },
      setFilter(filter) {
        if (this.activeFilters.includes(filter)) {
          this.activeFilters.splice(
            this.activeFilters.findIndex((x) => x == filter),
            1
          );
        } else {
          this.activeFilters.push(filter);
        }
      },
    },
    computed: {
      filteredDecks() {
        return this.decks.filter((x) => this.activeFilters.includes(x.type));
      },
      filters() {
        let plep = this.decks.map((deck) => {
          return deck.type;
        });
        let uniqueChars = [];
        plep.forEach((element) => {
          if (!uniqueChars.includes(element)) {
            uniqueChars.push(element);
          }
        });
        return uniqueChars;
      },
    },
  };
</script>

<style>
  .carousel {
    height: 200px;
  }
  .carousel__slide {
    padding: 10px;
    height: 200px;
    overflow: hidden;
  }
  .bg2 {
    background-position: top !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    transform: scale(1.8);
    filter: blur(1.5px) !important;
  }
</style>
