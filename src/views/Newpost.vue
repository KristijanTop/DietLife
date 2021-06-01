<template>
  <div class="container-form">
    <form @submit.prevent="postNewImage">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="form">
            <input
              type="text"
              id="imageRecipe"
              v-model="newImageRecipe"
              class="form-control mb-3"
              placeholder="Recipe Name"
              maxlength="40"
              required
            />
            <div class="form">
              <textarea
                type="text"
                id="imageDescription"
                v-model="newImageDescription"
                class="form-control mb-3"
                placeholder="Description"
                required
              ></textarea>
              <div class="row justify-content-center">
                <div class="col-3">
                  <div class="form">
                    <input
                      type="number"
                      id="imageCarbohydrates"
                      v-model="newImageCarbohydrates"
                      class="form-control mb-3"
                      placeholder="Carbohydrates (g)"
                      required
                    />
                  </div>
                </div>
                <div class="col-3">
                  <div class="form">
                    <input
                      id="imageProteins"
                      v-model="newImageProteins"
                      type="number"
                      class="form-control"
                      placeholder="Proteins (g)"
                      required
                    />
                  </div>
                </div>
                <div class="col-3">
                  <div class="form">
                    <input
                      type="number"
                      id="imageFat"
                      v-model="newImageFat"
                      class="form-control"
                      placeholder="Fats (g)"
                      required
                    />
                  </div>
                </div>
                <div class="form">
                  <div id="croppa">
                    <croppa
                      :width="325"
                      :height="350"
                      accept="image/*"
                      placeholder="Upload Image..."
                      v-model="imageReference"
                    >
                    </croppa>
                  </div>
                </div>
                <div class="form text-center">
                  <button type="submit" class="btn btn-primary ml-2">
                    Add Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store.js";
import { db, storage } from "@/firebase";
export default {
  data() {
    return {
      store,
      newImageRecipe: "",
      newImageDescription: "",
      newImageUrL: "",
      imageReference: null,
      newImageCarbohydrates: "",
      newImageProteins: "",
      newImageFat: "",
    };
  },

  methods: {
    postNewImage() {
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);
        let imageName = store.currentUser.name + "/" + this.newImageRecipe + ".png";
        console.log(imageName)

        storage
          .ref(imageName)
          .put(blobData)
          .then((result) => {
            //uspješno spremanje
            result.ref
              .getDownloadURL()
              .then((url) => {
                console.log("Link", url);
                console.log(store.currentUser.id);

                const imageFat = this.newImageFat;
                const imageCarbohydrates = this.newImageCarbohydrates;
                const imageProteins = this.newImageProteins;
                const imageRecipe = this.newImageRecipe;
                const imageDescription = this.newImageDescription;

                db.collection("posts")
                  .add({
                    carbohydrates: imageCarbohydrates,
                    fat: imageFat,
                    proteins: imageProteins,
                    url: url,
                    desc: imageDescription,
                    name: imageRecipe,
                    authorName: store.currentUser.name,
                    authorId: store.currentUser.id,
                    posted_at: Date.now(),
                  })
                  .then((doc) => {
                    console.log("Spremljeno", doc);
                    (this.imageFat = ""), (this.newImageProteins = "");
                    this.newImageCarbohydrates = "";
                    this.newImageRecipe = "";
                    this.newImageDescription = "";
                    this.newImageUrL = "";
                    this.imageReference.remove();

                    this.$router.push({ name: "Home" });
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              })
              .catch((e) => {
                console.error(e);
              });
          })
          .catch((e) => {
            console.error(e);
          });
      });
    },
  },
};
</script>

<style lang="scss">
.container-form {
  margin-top: 1%;
}
#croppa {
  text-align: center;
  margin: 0%;
}
</style>
