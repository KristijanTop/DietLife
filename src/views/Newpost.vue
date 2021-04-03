<template>
  <div class="form-container">
    <form action="#" @submit.prevent="postNewImage" class="form-wrap">
      <h2>New Post</h2>
      <div class="form-box">
        <input
          v-model="newImageRecipe"
          id="imageRecipe"
          type="text"
          placeholder="Recipe Name"
          required
        />
      </div>
      <div class="form-box">
        <textarea
          v-model="newImageDescription"
          id="imageDescription"
          cols="25"
          rows="5"
          placeholder="Description"
          required
        ></textarea>
      </div>
      <div class="form-box">
        <input
          v-model="newImageUrL"
          id="imageUrl"
          type="text"
          placeholder="Please insert image URL or Upload image"
          required
        />
      </div>
      <div class="form-box">
         <croppa 
         :width="350" 
         :height="350" 
         placeholder='Upload Image...' 
         v-model="imageReference">
         </croppa>
      </div>
      <div class="form-submit">
        <input type="submit" value="Publish" />
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store.js";
import { db } from "@/firebase";
export default {
  data() {
    return {
      store,
      newImageRecipe: "",
      newImageDescription: "",
      newImageUrL: "",
      imageReference: null,
    };
  },

  methods: {
    postNewImage() {
      const imageRecipe = this.newImageRecipe;
      const imageDescription = this.newImageDescription;
      const imageUrl = this.newImageUrL;

      db.collection("posts")
        .add({
          url: imageUrl,
          desc: imageDescription,
          name: imageRecipe,
          email: store.currentUser,
          posted_at: Date.now(),
        })
        .then((doc) => {
          console.log("Spremljeno", doc);
          this.newImageRecipe = "";
          this.newImageDescription = "";
          this.newImageUrL = "";

          this.$router.push({ name: 'Home'});
          
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 133vh;
}
.form-container .form-wrap {
  width: 70%;
  background: rgba(98, 117, 138, 0.822);
  border-radius: 15px;
  padding: 10px 14px;
  box-shadow: 10px 15px 15px rgba(99, 99, 236, 0.925);
}
.form-container .form-wrap h2 {
  font-family: "Yatra One", serif;
  text-align: center;
  margin: 0px 0px 20px;
  font-size: 50px;
  color: #fff;
}
.form-container .form-wrap .form-box {
  margin: 0px 0px 15px;
}
.form-container .form-wrap .form-box input[type="text"] {
  padding: 4px 9px;
  width: 100%;
  border: 1px solid #000000;
  border-radius: 7px;
}
.form-container .form-wrap .form-box textarea {
  width: 100%;
  height: 100px;
  padding: 4px 9px;
  border: 1px solid #000000;
  border-radius: 7px;
}
.form-container .form-wrap .form-submit {
  display: flex;
  justify-content: center;
}
.form-container .form-wrap .form-submit input[type="submit"] {
  padding: 4px 10px;
  margin: 20px;
  background: #383634;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  color: #fff;
}
//span {
  //color: #3d3a3a;

</style>
