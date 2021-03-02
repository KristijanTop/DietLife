<template>
  <div
    style="margin-top:0px"
    class="row row-cols-auto g-4 justify-content-center"
  >
    
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>
      <recipe-card/>


      
    
  </div>
</template>

<script>
  import RecipeCard from '@/components/RecipeCard.vue';
  export default {
    name: 'home',
    components: {
      RecipeCard
    },
  };
</script>
