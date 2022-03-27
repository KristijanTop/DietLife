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
            <span v-if="msg.email" class="span">{{ msg.email }}</span>
          </div>
          <div class="form-group mb-3">
            <input
              :type="visability"
              v-model="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              @keyup.enter="submit, login()"
            />
            <a
              @click="showpassword()"
              v-if="visability == 'password'"
              class="eye-login"
            >
              <img src="@/assets/visibility.png" class="eye-login" />
            </a>
            <a @click="hidepassword()" v-if="visability == 'text'" class="eye-login">
              <img src="@/assets/invisible.png" class="eye-login" />
            </a>
            <br />
            <span v-if="msg.password" class="span">{{ msg.password }}</span>
          </div>
          <button type="button" @click="login()" class="action-button-login">
            Log in
          </button>
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
      visability: "password",
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
    showpassword() {
      this.visability = "text";
    },
    hidepassword() {
      this.visability = "password";
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
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password!");
            console.log("wrong password");
          } else {
            if (errorCode === "auth/user-not-found") {
              alert("User with given email is not found. Try to Sign up.");
            } else {
              if (errorCode === "auth/user-disabled") {
                alert("This account has been disabled!");
              } else {
                alert(errorMessage);
              }
            }
            console.log("error");
          }
          console.error("Neuspiješna prijava!", error);
        });
    },
  },
};
</script>

<style lang="scss">
#login {
  width: 380px;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 30px 25px 30px;
}

.btn {
  border-radius: 10px !important;
}

.action-button-login {
  font-size: 18px !important;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: #425387;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 10px;
  border: 1px solid transparent;
}

.action-button-login:hover {
  background-color: #3b4978;
}

.container .tittle {
  color: #425387;
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
.span {
  padding-top: 0px;
  margin-top: 0px;

  color: red;
}

.eye-login {
  position: absolute;
  height: 25px;
  width: 25px;
  right: 20px;
  top: 96.5px;
}
</style>
