<template>
<div class="wrapper">
      <div class="title">Sign Up</div>
<form action="#">
  <div class="field">
    <input type="text" v-model="username" required>
    <label>Email Address</label>
    </div>
 <div class="field">
   <input type="password" v-model="password"  required>
  <label>Password</label>
  
 </div>
 <div class="field">
   <input type="text" v-model="nickname"  required>
   <label>Nickname</label> 
   
 </div>
 <div class="field">
   <input type="button" @click="signup" value="Sign Up">
 </div>
 <div class="signup-link">Already have an account? <a href="#">Log in</a></div> 
  
    </form>
  </div>
</template>

<script>
import { firebase } from '@/firebase';

export default {
  name: "Signup",
  data() {
    return {
        username: '',
        password: '',
        nickname: '',
        
    } ;
  },
   methods: {
    signup() {
      firebase
      .auth().createUserWithEmailAndPassword(this.username, this.password)
      .then(function(){
          alert('Uspješna registracija');
        })
        .catch(function(error) {
          console.error("Došlo je do greške",error)
        });
      console.log('Nastavak');
      
      
      
    },
  },
  
};
</script>


<style scoped>
*{
  margin: 0%;
  padding: 0;
  box-sizing: border-box;
}
.wrapper{
  width: 380px;
  margin: 5% auto 0;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}
.wrapper .title{
  color: #fff;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  border-radius: 15px 15px 0px 0px;
  background: linear-gradient(-135deg, #c850c0, #4158d0);

}
.wrapper form{
  padding: 10px 30px 50px 30px;
}
.wrapper form .field{
  position: relative;
  height: 50px;
  width: 100%;
  margin-top: 20px;
}
.wrapper form .field input{
  height: 100%;
  width: 100%;
  padding-left: 20px;
  border-radius: 25px;
  outline: none;
  font-size: 17px;
  border: 1px solid lightgrey;
  
 
}
.wrapper form .field input:focus,
.wrapper form .field input:focus ~ label{
  border-color: #5f1fb3;
}
.wrapper form .field label{
  position: absolute;
  top: 50%;
  left: 20px;
  font-size: 17px;
  color: #999;
  transform: translateY(-50%);
  pointer-events: none;
  
}
.wrapper form .field input:focus ~ label,
.wrapper form .field input:valid ~ label{
  top: 0%;
  color: #4158d0;
  font-size: 16px;
  background: #fff;
  transform: translateY(-50%);
}
.wrapper form .field input[type="button"]{
  color: #fff;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
  font-size: 18px;
  font-weight: 500;
  border: none;
  padding-left: 0px;
  cursor: pointer;
  
}
.wrapper form .signup-link{
  text-align: center;
  margin-top: 20px;
  color: #262626;
}
.wrapper form .signup-link a{
  color: #233ec7;
  text-decoration: none;
}
.wrapper form .signup-link a:hover{
  text-decoration: underline;
}

</style>
