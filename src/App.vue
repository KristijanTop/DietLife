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
                class="nav-link home active"
                aria-current="page"
                href="#"
                >Home</router-link
              >
            </li>

            <li v-if="!store.currentUser" class="nav-item">
              <router-link
                to="/Login"
                class="nav-link login"
                href="@/views/Login.vue"
                >Login</router-link
              >
            </li>

            <li v-if="!store.currentUser" class="nav-item">
              <router-link
                to="/Signup"
                class="nav-link signup"
                href="@/views/Signup.vue"
                >Sign up</router-link
              >
            </li>

            <li
              v-if="store.currentUser"
              class="nav-item"
              style="margin-right: 7px;"
            >
              <button @click="openModal()" class="nav-link new-recipe-button">
                New Recipe
              </button>
            </li>

            <li v-if="store.currentUser" class="nav-item diet-select">
              <select
                v-model="store.selectedDiet"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="All diets">All diets</option>
                <option value=" Ketogenic">Ketogenic diet</option>
                <option value=" Paleo">Paleo diet</option>
                <option value=" Vegan">Vegan diet</option>
                <option value=" GI diet">GI diet</option>
                <option value=" Low fat">Low fat</option>
                <option value=" Mediterranean">Mediterranean</option>
                <option value=" Raw food">Raw food</option>
                <option value=" Flexible">Flexible</option>
              </select>
            </li>

            <li class="nav-item search-recipe">
              <form v-if="store.currentUser">
                <input
                  v-model="store.searchTerm"
                  class="form-control me-2"
                  type="search"
                  placeholder="What would you like to eat?"
                  aria-label="Search"
                />
              </form>
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
                <i class="bi bi-person-circle"></i> {{ store.currentUser.name }}
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
                    >My Recipes <i class="bi bi-book-half"></i>
                  </router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/Favorites"
                    class="dropdown-item"
                    href="@/views/Favorites.vue"
                    >Favorites <i class="bi bi-suit-heart-fill"></i></router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a href="#" @click.prevent="logout()" class="dropdown-item log-out-btn"
                    >Log out <i class="bi bi-box-arrow-left"></i></a>
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
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Ubuntu";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background-color: white;
  min-width: 325px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.0125);

  .navbar-brand {
    margin-left: 5px;
  }

  a.home,
  a.login {
    max-width: 60px;
    text-align: center;
    margin-right: 2px;
    margin-bottom: 5px;
  }

  a.signup {
    max-width: 70px;
    text-align: center;
  }

  a:hover:not(.navbar-brand) {
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 20px;
  }

  a.dropdown-toggle {
    margin-right: 10px;
  }

  a.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    background-color: rgba(0, 0, 0, 0.03);
    margin-right: 10px;
  }

  a.dropdown-toggle:hover {
    margin-right: 10px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    border-radius: 20px;

    &.router-link-exact-active.home {
      max-width: 60px;
      text-align: center;
    }

    &.router-link-exact-active:not(.navbar-brand) {
      color: white;
      background-color: #425387;
      border-radius: 20px;
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
    border-radius: 20px;
    padding: 8px;
    margin-bottom: 5px;
  }

  .new-recipe-button:focus {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    background-color: rgba(0, 0, 0, 0.03);
  }

  .new-recipe-button:hover {
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 20px;
  }

  .search-recipe {
    margin-right: 10px;
  }

  .diet-select {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .dropdown-menu {
    max-width: 20%;
    border-radius: 10px;
    margin-right: 10px;
  }

  .dropdown-item:focus,
  .dropdown-item:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  .form-select {
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.03);
  }

  .input-select {
    border-radius: 10px !important;
  }

  .form-control {
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.03);
    border-color: rgba(0, 0, 0, 0.03);
  }

  .bi-person-circle::before {
    font-size: 16px;
    color: #2c3e50;
    margin-right: 2px;
  }

  .bi-book-half::before {
    margin-left: 15px;
  }

  .bi-suit-heart-fill::before {
    margin-left: 30px;
  }

  .bi-box-arrow-left::before {
    margin-left: 38px;
  }

  .bi-book-half:active::before, .bi-suit-heart-fill:active::before {
    color: white !important;
  }

  .log-out-btn:focus {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
  
}
</style>
