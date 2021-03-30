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
        />
      </div>
      <div class="form-box">
        <textarea
          v-model="newImageDescription"
          id="imageDescription"
          cols="30"
          rows="5"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="form">
        <input
          v-model="newImageUrL"
          id="imageUrl"
          type="text"
          placeholder="Image URL"
        />
        <span><b> or </b></span>
        <input type="file" accept="image/*" />
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
  height: 80vh;
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
  color:#fff;
}
.form-container .form-wrap .form-box {
  margin: 0px 0px 20px;
}
.form-container .form-wrap .form-box input[type="text"] {
  padding: 4px 9px;
  width: 100%;
  border: 1px solid #b389eb;
  border-radius: 7px;
}
.form-container .form-wrap .form input[type="text"] {
  padding: 4px 9px;
  width: 50%;
  border: 1px solid #b389eb;
  border-radius: 7px;
}

.form-container .form-wrap .form-box textarea {
  width: 100%;
  height: 100px;
  padding: 4px 9px;
  border: 1px solid #b389eb;
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
span{
  color: #3d3a3a;
}
</style>
