<template>
  <div class="p-4 w-full h-full overflow-scroll">
    <div class="p-4 bg-blue-100 w-full rounded-md">
      <p class="mb-2">What decks do you want to pick?</p>
      <div class="flex">
        <div v-for="(filter, index) in filters" class="flex items-center mx-2">
          <input
            @change="setFilter(filter)"
            :id="'filter_'+index"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            :for="'filter_'+index"
            class="ml-2 text-md font-medium text-gray-900"
            >{{ filter }}</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "randomizer",
    props: ["decks"],
    data() {
      return {
        activeFilters: [],
      };
    },
    methods: {
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
