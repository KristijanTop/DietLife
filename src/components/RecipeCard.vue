<template>
  <div class="col">
    <div style="width:325px" class="card text-center">
      <div class="card-header text-muted">
        {{ info.name }}</div>
      <div style="height:485px">
      <img :src="info.url" class="card-img center" />
      </div>
      <div class="card-body p-0">
        <div class="card-footer text-muted">{{ postedFromNow }}</div>
        <div class="card-footer">{{ info.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ["info"],
  name: "RecipeCard",
  computed: {
    postedFromNow() {
      return  moment(this.info.time).fromNow();
    },
  },
};
</script>

<style>

.center {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

</style>