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
            v-model="username"
            @keyup.enter="submit, signup()"
          />
          <span v-if="msg.email" class="span">{{ msg.email }}</span>
        </div>
        <div class="form-group mb-3">
          <input
            type="text"
            name="Full name"
            id="fullname"
            class="form-control"
            placeholder="Full Name"
            maxlength="25"
            v-model="fullname"
            @keyup.enter="submit, signup()"
          />
        </div>
        <div class="form-group mb-3">
          <input
            :type="visability"
            name="Password"
            class="form-control"
            placeholder="Password"
            v-model="password"
            required
            @keyup.enter="submit, signup()"
          />
          <a
            @click="showpassword()"
            v-if="visability == 'password'"
            class="eye-signup"
          >
            <img src="@/assets/visibility.png" class="eye-signup" />
          </a>
          <a @click="hidepassword()" v-if="visability == 'text'" class="eye-signup">
            <img src="@/assets/invisible.png" class="eye-signup" />
          </a>
          <br />
          <span v-if="msg.password" class="span">{{ msg.password }}</span>
        </div>
        <button
          type="button"
          class="action-button-signup"
          @click="signup(), submit"
        >
          Sign Up
        </button>
        <div class="signup-link">
          Already have an account? <a href="Login">Log in</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      visability: "password",
      username: "",
      msg: [],
      fullname: "",
      password: "",
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

    signup() {
      console.log("signup... " + this.username);

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.fullname,
              id: user.user.uid,
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          alert("Uspješna registracija", user);
        })
        .catch(function (error) {
          console.log("Došlo je do greške", error);
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            if (errorCode == "auth/email-already-in-use") {
              alert("This email is already in use");
            } else {
              alert(errorMessage);
            }
          }
          console.log(error);
        });
      console.log("Nastavak");
    },
  },
};
</script>

<style lang="scss">
#signup {
  width: 380px;
  margin: 5% auto 0;
  background: #fff;
  border-radius: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 30px 25px 30px;
}

.btn {
  border-radius: 10px !important;
}

.action-button-signup {
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

.container .tittle {
  color: #425387;
  //font-size: 40px;
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
.span {
  padding-top: 0px;
  margin-top: 0px;
  font-size: 14px;
  color: red;
}

.eye-signup {
  position: absolute;
  height: 25px;
  width: 25px;
  right: 20px;
  top: 124.5px;
}
</style>
