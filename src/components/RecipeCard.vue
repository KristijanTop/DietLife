<template>
<a v-on:click="$emit('click')" style="cursor: pointer">
  <div class="col" style="padding:10px">
    <div style="width:325px" class="card text-center">
      <div class="card-header text-muted">
        <strong>{{ info.name }}</strong>
    <li>
        <button v-if="$route.name == 'MyRecipes'" @click="removeFromMyRec()"> Delete Recipe
        </button>
    </li> 
      </div>
      <div style="height:350px; overflow: hidden; display: flex; justify-content: center;">
        <img :src="info.url" class="card-img recipe-img" />
      </div>
      <div class="card-body p-0">
        <div class="card-footer text-muted">{{ postedFromNow }}</div>
    </div>
  </div>
  </div>
</a>
</template>

<script>
import { db } from "@/firebase";
import moment from "moment";

export default {
  props: ["info"],
  name: "RecipeCard", 
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();

    },
  },
methods:
{
  removeFromMyRec() {
      var delitepost = db.collection("posts");
      delitepost
        .doc(this.info.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          
          if (this.$route.name == "MyRecipes") {
            this.$emit("close");
          }
          this.$root.$emit("MyRecipes");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    
  },
};

</script>

<style>
.recipe-img {
  transition: transform .5s ease;
}

.recipe-img:hover {
  transform: scale(1.05);
}

</style>
