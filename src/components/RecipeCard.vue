<template>
  <div>
    <div v-if="popUpVisible">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container-recipe">
              <div class="modal-body-recipe">
                <div class="popUpMsg">
                  <p>Are you sure you want to delete this recipe?</p>
                </div>
                <div class="modal-footer popUp">
                <button class="btn btn-secondary" @click="closePopUp()">No</button>
                <button class="action-button" @click="removeFromMyRec()">Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="col" style="padding:10px">
      <div style="width:325px" class="card text-center">
        <div class="card-header row">
          <div class="col-12">
            <strong>{{ info.name }}</strong>
            <button
              class="delete-button"
              v-if="$route.name == 'MyRecipes'"
              @click="openPopUp()"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
        <a v-on:click="$emit('click')" style="cursor: pointer">
          <div
            style="height:350px; overflow: hidden; display: flex; justify-content: center;"
          >
            <img :src="info.url" class="card-img recipe-img" />
          </div>
        </a>
        <div class="card-body p-0">
          <div class="card-footer">{{ postedFromNow }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import moment from "moment";

export default {
  props: ["info"],
  name: "RecipeCard",
  data() {
    return {
      popUpVisible: false,
    };
  },
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
  methods: {
    removeFromMyRec() {
      var delitepost = db.collection("posts");
      delitepost
        .doc(this.info.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.$root.$emit("MyRecipes");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    openPopUp() {
      this.popUpVisible = true;
    },
    closePopUp() {
      this.popUpVisible = false;
    },
  },
};
</script>

<style>
.recipe-img {
  transition: transform 0.5s ease;
}

.recipe-img:hover {
  transform: scale(1.05);
}

.card {
  border-radius: 15px !important;
  overflow: hidden !important;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card-header {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  max-height: 41px !important;
}

.card-footer {
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}

.delete-button {
  position: absolute;
  right: 7px;
  top: 7px;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  font-weight: bold;
  color: #999999;
  border-radius: 20px;
}

.delete-button:focus {
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  background-color: rgba(0, 0, 0, 0.03);
}

.delete-button:hover {
  color: #2c3e50;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 20px;
}

.popUp {
  height: 40px;
}

.popUpMsg {
  font-size: 22px;
  text-align: center;
}

</style>
