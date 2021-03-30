<template>
  <div class="col">
    <div style="width:325px" class="card text-center">
      <div class="card-header text-muted">{{ info.time}}</div>
      <img :src="info.url" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <div class="card-footer"> {{ info.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "RecipeCard",
};
</script>
