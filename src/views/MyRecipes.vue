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
  name: "MyRecipes",
  data: function() {
    return {
      cards: [],
      store,
      modalVisible: false,
      modalData: null,
      message: "",
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
        db.collection("posts")
          .where("authorId", "==", store.currentUser.id)
          .orderBy("posted_at", "desc")
          .get()
          .then((query) => {
            this.cards = [];
            if (query.empty) {
              console.log("empty");
              this.message = "You didn't add any recipes yet!";
            }
            query.forEach((doc) => {
              const data = doc.data();

              this.cards.push({
                id: doc.id,
                authorId: data.authorId,
                carbohydrates: data.carbohydrates,
                fat: data.fat,
                proteins: data.proteins,
                name: data.name,
                time: data.posted_at,
                description: data.desc,
                url: data.url,
                authorName: data.authorName,
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

<style>
.message {
  text-align: center;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
