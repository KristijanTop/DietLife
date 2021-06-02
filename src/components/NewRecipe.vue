<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div class="title">
              <h1>New Recipe</h1>
            </div>
          </div>
          <form>
            <div class="modal-body">
              <slot name="body">
                <span class="error">{{ errorMessageName }}</span>
                <input
                  type="text"
                  id="imageRecipe"
                  v-model="newImageRecipe"
                  class="form-control mb-3"
                  placeholder="Recipe Name"
                  maxlength="40"
                />

                <span class="error">{{ errorMessageDesc }}</span>
                <textarea
                  type="text"
                  id="imageDescription"
                  v-model="newImageDescription"
                  class="form-control mb-3"
                  placeholder="Description"
                ></textarea>

                <span class="error">{{ errorMessageMacros }}</span>
                <div class="row justify-content-center">
                  <div class="col-4">
                    <div class="form">
                      <input
                        type="number"
                        id="imageCarbohydrates"
                        v-model="newImageCarbohydrates"
                        class="form-control mb-3"
                        placeholder="Carbs (g)"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form">
                      <input
                        id="imageProteins"
                        v-model="newImageProteins"
                        type="number"
                        class="form-control"
                        placeholder="Protein (g)"
                      />
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form">
                      <input
                        type="number"
                        id="imageFat"
                        v-model="newImageFat"
                        class="form-control"
                        placeholder="Fats (g)"
                      />
                    </div>
                  </div>
                </div>

                <p>Select diets:</p>
                <p class="error">{{ errorMessageDiets }}</p>

                <div class="container" style="margin-bottom:15px;">
                  <div class="row align-items-start">
                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Ketogenic"
                          id="Ketogenic"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          Ketogenic
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Paleo"
                          id="Paleo"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Paleo
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Vegan"
                          id="Vegan"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Vegan
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" GI diet"
                          id="GI Diet"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          GI diet
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Low fat"
                          id="Low fat"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Low fat
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Mediterranean"
                          id="Mediterranean"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Mediterranean
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Raw food"
                          id="Raw food"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Raw food
                        </label>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-check">
                        <input
                          v-model="checkedDiets"
                          class="form-check-input"
                          type="checkbox"
                          value=" Flexible"
                          id="Flexible"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Flexible
                        </label>
                      </div>
                    </div>
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
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  class="btn btn-secondary"
                  id="closeBtn"
                  @click.prevent="$emit('close')"
                >
                  Close
                </button>

                <button
                  @click.prevent="postNewImage()"
                  id="submBtn"
                  class="btn btn-primary ml-2"
                >
                  Add Recipe
                </button>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "@/store.js";
import { db, storage } from "@/firebase";
export default {
  name: "NewRecipe",
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
      checkedDiets: [],
      errorMessageDiets: "",
      errorMessageName: "",
      errorMessageDesc: "",
      errorMessageMacros: "",
    };
  },

  methods: {
    postNewImage() {
      var valid = false;

      if (
        this.newImageRecipe.length > 0 &&
        this.newImageDescription.length > 0 &&
        this.newImageCarbohydrates > 0 &&
        this.newImageProteins > 0 &&
        this.newImageFat > 0 &&
        this.checkedDiets.length > 0
      ) {
        valid = true;
      } if (this.newImageRecipe.length < 1) {
        this.errorMessageName = "Please enter recipe name!";
      } if (this.newImageDescription.length < 1) {
        this.errorMessageDesc = "Please enter recipe description!";
      } if (
        this.newImageCarbohydrates < 1 &&
        this.newImageProteins < 1 &&
        this.newImageFat < 1
      ) {
        this.errorMessageMacros = "Please enter recipe macronutrients!";
      } if (this.checkedDiets.length < 1) {
        this.errorMessageDiets = "Please select at least one diet!";
      }

      if (valid) {
        this.imageReference.generateBlob((blobData) => {
          console.log(blobData);
          let imageName = store.currentUser + "/" + Date.now() + ".png";

          storage
            .ref(imageName)
            .put(blobData)
            .then((result) => {
              //uspješno spremanje
              result.ref
                .getDownloadURL()
                .then((url) => {
                  console.log("Link", url);

                  const imageFat = this.newImageFat;
                  const imageCarbohydrates = this.newImageCarbohydrates;
                  const imageProteins = this.newImageProteins;
                  const imageRecipe = this.newImageRecipe;
                  const imageDescription = this.newImageDescription;
                  const diets = this.checkedDiets;

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
                      diets: diets,
                    })
                    .then((doc) => {
                      console.log("Spremljeno", doc);
                      this.imageFat = "";
                      this.newImageProteins = "";
                      this.newImageCarbohydrates = "";
                      this.newImageRecipe = "";
                      this.newImageDescription = "";
                      this.newImageUrL = "";
                      this.imageReference.remove();
                      this.$emit("close");
                      this.$root.$emit("home");
                      this.$root.$emit("MyRecipes");
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
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  color: red;
  font-size: 14px;
}

.container-form {
  margin-top: 1%;
}
#croppa {
  text-align: center;
  margin: 0%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  max-width: 550px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  display: block !important;
}

.modal-body {
  margin: 20px 0;
  height: 90%;
  max-height: 375px;
  overflow: auto;
  text-align: justify;
}

.modal-default-button {
  float: right;
}

.title {
  padding: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
