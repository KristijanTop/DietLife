<template>
  <div class="col">
    <div style="width:325px" class="card text-center">
      <div class="card-header text-muted">
        {{ info.name }}</div>
      <img :src="info.url" class="card-img-top" />
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
