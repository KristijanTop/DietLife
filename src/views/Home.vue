<template>
  <div
    style="margin-top:0px"
    class="row row-cols-auto g-4 justify-content-center"
  >
    <recipe-card v-for="card in cards" :key="card" :info="card"/>

  </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue';

let cards = [];

cards = [
  "https://picsum.photos/id/1/200/300",
  "https://picsum.photos/id/2/200/300",
  "https://picsum.photos/id/3/200/300",
  "https://picsum.photos/id/4/200/300",
  "https://picsum.photos/id/5/200/300",
  "https://picsum.photos/id/6/200/300",
  "https://picsum.photos/id/7/200/300",
  "https://picsum.photos/id/8/200/300",
  "https://picsum.photos/id/9/200/300",
  "https://picsum.photos/id/10/200/300",
  "https://picsum.photos/id/11/200/300",
  "https://picsum.photos/id/12/200/300",
];

export default {
  name: 'home',
  data: function() {
    return {
        cards: cards,
    }
  },
  components: {
    RecipeCard
  },
};
</script>
