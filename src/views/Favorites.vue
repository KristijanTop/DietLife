<template>
  <div>
    <span class="message">{{ message }}</span>
    <modal
      v-if="modalVisible"
      @close="modalVisible = false"
      :data="modalData"
    />
    <div
      style="margin-top:15px"
      class="row row-cols-auto g-4 justify-content-center"
    >
      <recipe-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
        @click="openModal(card)"
      />
    </div>
    
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import RecipeCard from "@/components/RecipeCard.vue";
import store from "@/store";
import { db } from "@/firebase";

export default {
  name: "Favorites",
  data: function() {
    return {
      store,
      cards: [],
      modalVisible: false,
      modalData: null,
      message: "",
    };
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm.toLowerCase();
      let selectedDiet = this.store.selectedDiet;

      if (selectedDiet == "All diets"){
        return this.cards.filter((card) => card.name.toLowerCase().includes(termin));
      }
      
      return this.cards.filter((card) => card.name.toLowerCase().includes(termin) && card.diets.includes(selectedDiet));
    },
  },
  mounted() {
  this.$root.$on('Favorites', () => {
            this.getPosts()
        })
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("pokazuje prazni array!", this.cards);
      console.log("pokazuje korisnika!", store.currentUser.name);
      db.collection("Favoriteposts")
        .where("userId", "==", store.currentUser.id)
        .orderBy("time", "desc")
        .get()
        .then((query) => {
          this.cards = [];
          if (query.empty) {
            console.log("empty");
            this.message =
              "You didn't favorite any recipes yet!";
          }
          query.forEach((doc) => {
            const data = doc.data();

            this.cards.push({
              userId: store.currentUser.id,
              id: data.id,
              favId: doc.id,
              calories: data.calories,
              fat: data.fat,
              url: data.url,
              name: data.name,
              proteins: data.proteins,
              carbohydrates: data.carbohydrates,
              authorName: data.authorName,
              description: data.description,
              time: data.time,
              diets: data.diets,
              ingredients: data.ingredients,
            });
          });
        });
    },
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
  },
  components: {
    RecipeCard,
    Modal,
  },
};
</script>
<style scoped>
.message {
  text-align: center;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
