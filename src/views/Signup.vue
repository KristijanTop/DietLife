<template>
  <div class="container">
    <div id="signup">
      <div class="tittle">Sign Up</div>
      <form>
        <div class="form-group mb-3">
          <input
            type="email"
            name="Email"
            id="email"
            class="form-control"
            placeholder="E-mail"
            required
          />
        </div>
        <div class="form-group mb-3">
          <input
            type="text"
            name="Full name"
            id="fullname"
            class="form-control"
            placeholder="Full Name"
          />
        </div>
        <div class="form-group mb-3">
          <input
            type="password"
            name="Password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <input
          type="button"
          class="btn btn-primary btn-lg"
          @click="signup"
          value="Sign Up"
        />
        <div class="signup-link">
          Already have an account? <a href="#">Log in</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
#signup {
  width: 380px;
  margin: 5% auto 0;
  background: #fff;
  border-radius: 15px;
  box-shadow: 10px 15px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.container form {
  padding: 10px 30px 25px 30px;
}
.container .tittle {
  color: rgba(10, 95, 253, 0.959);
  font-size: 40px;
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  line-height: 100px;
}
.container input {
  font-size: 17px;
  border: 1px double rgb(102, 97, 96);
  border-radius: 4px;
  text-align: center;
}
.container form .signup-link {
  text-align: center;
  margin-top: 20px;
  color: #262626;
}
.container form .signup-link a {
  color: #233ec7;
  text-decoration: none;
}
.container form .signup-link a:hover {
  text-decoration: underline;
}
</style>
