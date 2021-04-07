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
              required
              @keyup.enter="submit, login()"
            />
            <span v-if="msg.email">{{ msg.email }}</span>
          </div>
          <div class="form-group mb-3">
            <input
              :type="showpassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              @keyup.enter="submit, login()"
            />
            <v-btn @click="showpassword = !showpassword">
              <img
              src="@/assets/eye.png"
              />
            </v-btn>
            <span v-if="msg.password">{{ msg.password }}</span>
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
      showpassword : true,
      username: "",
      password: "",
      msg: [],
    };
  },

  watch: {
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
    username(value) {
      this.email = value;
      this.validateEmail(value);
    },
  },

  methods: {

validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Invalid Email Address";
      }
    },

    validatePassword(value) {
      let difference = 6 - value.length;
      if (value.length < 6) {
        this.msg["password"] =
          "Must be 6 characters! " + difference + " characters left";
      } else {
        this.msg["password"] = "";
      }
    },

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
.container .icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.container .icon-base {
  width: 22;
  height: 22;
}
</style>
