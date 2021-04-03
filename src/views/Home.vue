<template>
  <div
    style="margin-top:25px"
    class="row row-cols-auto g-4 justify-content-center"
  >
    <recipe-card v-for="card in filteredCards" :key="card.id" :info="card" />
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCard.vue";
import store from "@/store";
import { db } from "@/firebase";

//cards = [
//{ url: 'https://picsum.photos/id/1/200/300', description: 'My new recepie...', time: 'few minutes ago...'},

//"https://picsum.photos/id/2/200/300",
//"https://picsum.photos/id/3/200/300",
//"https://picsum.photos/id/4/200/300",
//"https://picsum.photos/id/5/200/300",
//"https://picsum.photos/id/6/200/300",
//"https://picsum.photos/id/7/200/300",
//"https://picsum.photos/id/8/200/300",
//"https://picsum.photos/id/9/200/300",
//"https://picsum.photos/id/10/200/300",
//"https://picsum.photos/id/11/200/300",
//"https://picsum.photos/id/12/200/300",
//];

export default {
  name: "home",
  data: function() {
    return {
      cards: [],
      store,
    };
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;

      return this.cards.filter((card) => card.name.includes(termin));
      
    },
  },
  mounted() {
    this.getPosts();
  },
  //firebase dohvat

  methods: {
    getPosts() {
      console.log("firebase dohvat...");

      db.collection("posts")
        .orderBy("posted_at", "desc")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();

            this.cards.push({
              id: doc.id,
              name: data.name,
              time: data.posted_at,
              description: data.desc,
              url: data.url,
            });
          });
        });
    },
  },
  components: {
    RecipeCard,
  },
};
</script>
