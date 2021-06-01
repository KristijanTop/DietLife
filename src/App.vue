<template>
  <div id="app">
    <new-recipe v-if="modalVisible" @close="modalVisible = false" />

    <nav id="nav" class="navbar navbar-expand-lg navbar-light sticky-top">
      <!-- Image and text -->
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand" href="#">
          <img
            src="@/assets/logo-antic.png"
            alt="DietLife-logo"
            height="50"
            class="d-inline-block align-top"
          />
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse nav-buttons"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-if="store.currentUser" class="nav-item">
              <router-link
                to="/"
                class="nav-link active"
                aria-current="page"
                href="#"
                >Home</router-link
              >
            </li>

            <li
              v-if="store.currentUser"
              class="nav-item"
              style="margin-right: 5px;"
            >
              <button @click="openModal()" class="nav-link new-recipe-button">
                New Recipe
              </button>
            </li>

            <li v-if="store.currentUser" class="nav-item diet-select">
              <select class="form-select" aria-label="Default select example">
                <option selected>All diets</option>
                <option value="1">Ketogenic diet</option>
                <option value="2">Paleo diet</option>
                <option value="3">Vegan diet</option>
                <option value="4">GI diet</option>
                <option value="5">Low fat</option>
                <option value="6">Mediterranean</option>
                <option value="7">Raw food</option>
                <option value="8">Flexible</option>
              </select>
            </li>

            <li class="nav-item search-recipe">
              <form v-if="store.currentUser">
                <input
                  v-model="store.searchTerm"
                  class="form-control me-2"
                  type="search"
                  placeholder="Search recipes"
                  aria-label="Search"
                />
              </form>
            </li>

            <li v-if="!store.currentUser" class="nav-item">
              <router-link
                to="/Signup"
                class="nav-link"
                href="@/views/Signup.vue"
                >Sign up</router-link
              >
            </li>

            <li v-if="!store.currentUser" class="nav-item">
              <router-link to="/Login" class="nav-link" href="@/views/Login.vue"
                >Login</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav">
            <li v-if="store.currentUser" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ store.currentUser.name }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <router-link
                    to="/MyRecipes"
                    class="dropdown-item"
                    href="@/views/MyRecipes.vue"
                    >My Recipes</router-link>
                </li>
                <li>
                  <router-link
                    to="/Favorites"
                    class="dropdown-item"
                    href="@/views/Favorites.vue"
                    >Favorites</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a href="#" @click.prevent="logout()" class="dropdown-item"
                    >Log out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from "@/store";
import { firebase, db } from "@/firebase";
import router from "@/router";
import NewRecipe from "@/components/NewRecipe";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;
  if (user) {
    // User is signed in.
    console.log("...", user.email);
    var docRef = db.collection("profiles").doc(user.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data().name);
          store.currentUser = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    store.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    console.log("No user!");
    store.currentUser = null;
    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
      modalVisible: false,
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
    openModal() {
      this.modalVisible = true;
    },
  },

  components: {
    NewRecipe,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  padding: 10px;
  background-color: white;
  min-width: 400px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .nav-buttons {
    padding: 12px;
  }

  .new-recipe-button {
    appearance: none;
    outline: none;
    border: none;
    background: none;
    font-weight: bold;
    color: #2c3e50;
  }

  .search-recipe {
    margin-right: 15px;
    max-width: 50%;
  }

  .diet-select {
    margin-right: 15px;
    margin-bottom: 5px;
    max-width: 50%;
  }

  .dropdown-menu {
    max-width:20%;
  }
}
</style>
