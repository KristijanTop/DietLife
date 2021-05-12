<template>
<a v-on:click="$emit('click')" style="cursor: pointer">
  <div class="col" style="padding:10px">
    <div style="width:325px" class="card text-center">
      <div class="card-header text-muted">
        <strong>{{ info.name }}</strong>
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
import moment from "moment";

export default {
  props: ["info"],
  name: "RecipeCard", 
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
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
