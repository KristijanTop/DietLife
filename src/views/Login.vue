<template>
  <div class="container">
    <div id="login">
      <div class="row">
        <div class="tittle">Login</div>
        <form>
          <div class="form-group mb-3">
            <input
              type="email"
              v-model="username"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="E-mail"
              @keyup.enter="submit, login()"
            />
          </div>
          <div class="form-group mb-3">
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              @keyup.enter="submit, login()"
            />
          </div>
          <input
            type="button"
            @click="login()"
            class="btn btn-primary btn-lg"
            value="Login"
          />
          <div class="signup-link">
            Don't have an account? <a href="Signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
    },
      
      login() {
      console.log("login... " + this.username);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("Uspiješna prijava!", result);
        })
        .catch(function(e) {
          console.error("Neuspiješna prijava!", e);
        });
    },
  },
};
</script>

<style lang="scss">
#login {
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
</style>
