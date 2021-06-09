<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container-recipe">
          <div class="modal-header">
            <div class="row">
              <div class="col col-10">
                <div class="title">
                  <h1>{{ data.name }}</h1>
                </div>
              </div>
              <div class="col-2">
                <button
                  class="favorite-btn"
                  v-if="remove"
                  @click="removeFromFav()"
                >
                  <i class="bi bi-heart-fill"></i>
                </button>
                <button
                  class="favorite-btn"
                  v-if="save"
                  @click="addToFavorites()"
                >
                  <i class="bi bi-heart"></i>
                </button>
              </div>
            </div>
            <div class="title">
              Author: <strong>{{ data.authorName }}</strong>
            </div>
            <div class="title">
              Diets: <strong>{{ data.diets.toString() }}</strong>
            </div>
          </div>
          <div class="modal-body-recipe">
            <slot name="body">
              <p>
                Per portion: kcal: <strong>{{ data.calories }}</strong> | Carbs:
                <strong>{{ data.carbohydrates }}</strong> | Fat:
                <strong>{{ data.fat }}</strong> | Protein:
                <strong>{{ data.proteins }}</strong>
              </p>
              <p><strong>Ingredients:</strong> {{ data.ingredients }}</p>
              <p><strong>Description:</strong> {{ data.description }}</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-secondary" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { db } from "@/firebase";
import store from "@/store.js";

export default {
  name: "Modal",
  props: ["data"],
  data() {
    return {
      store,
      save: false,
      remove: false,
      delitingId: "",
    };
  },
  mounted() {
    this.favbutton();
    
  },
  methods: {
    favbutton() {
      var checkpost = db.collection("Favoriteposts");
      checkpost
        .where("userId", "==", store.currentUser.id)
        .where("id", "==", this.data.id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            this.save = true;
            console.log("This recipe is not on your favorite list.");
          }
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            this.remove = true;
            this.delitingId = doc.id;
          });
        });
    },

    
    addToFavorites() {
      db.collection("Favoriteposts")
        .add({
          userId: store.currentUser.id,
          id: this.data.id,
          fat: this.data.fat,
          url: this.data.url,
          name: this.data.name,
          calories: this.data.calories,
          proteins: this.data.proteins,
          carbohydrates: this.data.carbohydrates,
          authorName: this.data.authorName,
          description: this.data.description,
          time: this.data.time,
          diets: this.data.diets,
          ingredients: this.data.ingredients,
        })
        .then((doc) => {
          console.log("Spremljeno", doc.id);
          this.save = false;
          this.favbutton();
        })
        .catch((e) => {
          console.error(e);
        });
    },

    
    removeFromFav() {
      var delitepost = db.collection("Favoriteposts");
      delitepost
        .doc(this.delitingId)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.remove = false;
          this.favbutton();
          if (this.$route.name == "Favorites") {
            this.$emit("close");
          }
          this.$root.$emit("Favorites");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container-recipe {
  width: 90% !important;
  max-width: 550px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 15px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: "Ubuntu" !important;
}

.modal-header {
  margin-top: 0;
  display: block !important;
  max-height: 203px !important;
  overflow: auto;
}

.modal-body-recipe {
  margin: 20px 0;
  padding: 15px;
  height: 90%;
  max-height: 275px;
  overflow: auto;
  text-align: justify;
}

.title {
  padding: 5px;
}

h1 {
  font-size: 2.2em !important;
}

.favorite-btn {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  height: 100%;
}

.bi-heart-fill::before,
.bi-heart::before {
  font-size: 2.5em;
  text-align: center;
  color: #425387;
}

.bi-heart-fill:hover::before,
.bi-heart:hover::before {
  color: #3b4978;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
