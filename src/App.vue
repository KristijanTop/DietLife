<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light sticky-top">
      <!-- Image and text -->
      
        <a class="navbar-brand" href="#">
          <img
            src="@/assets/logo-antic.png"
            alt="DietLife-logo"
            height="50"
            class="d-inline-block align-top"
          />
        </a>

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

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="nav-buttons">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link active"
                aria-current="page"
                href="#"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#"
                >About</router-link
              >
            </li>
          </ul>
          </div>
          
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search recipes"
              aria-label="Search"
            />
          </form>
        </div>
          
    </nav>
    <router-view />
    
  </div>
</template>

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
  
}
</style>
