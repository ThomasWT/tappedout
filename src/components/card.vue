<template>
  <div class="modal-overlay z-70 relative">
    <div class="modal mt-2 max-h-[80vh] flex items-center justify-start p-8 flex-col overflow-scroll relative">
        <button @click="$emit('close')" class="absolute right-4 top-2 font-bold text-blue-500">Close</button>
      <div class="w-[80%]">
        <img class="rounded-md shadow-md" :src="card.image" />
      </div>
      <div>
        <p class="font-bold text-xl mt-2">{{ card.name }}</p>

        <p class="mb-4 text-left" v-html="desc"></p>
        <p class="mb-2">Current price (TCG): ${{ card.price  }}</p>
        <a class="text-blue-500" target="_blank" :href="card.link">See on Tappedout</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios'
  export default {
    props: ["card"],
    data() {
        return {
            desc: '',
        }
    },
    mounted() {
        axios.get('https://thomaswt.dk/api/carddesc/'+this.card.slug).then(res => {
            this.desc = res.data
        })
    }
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index:1000;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  height:calc(100% - 80px);
}

.modal {
  display:flex;
  text-align: center;
  background-color: white;
  width: 90%;
  border-radius: 20px;
}
</style>