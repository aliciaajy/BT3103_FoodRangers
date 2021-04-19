<template>
  <div class="body1">
    <img src="../../assets/earth.png" class="image1" />
    <div>
      <form class="vertical-center inner-block" @submit.prevent="register">
        <h1><img src="../../assets/foodranger.png" class="image2" /></h1>

        <div> 
          <router-link to="/signup" id="fav-tab">User Signup</router-link> 
          <p id="search-tab"> Admin Signup </p>
        </div>

        <div class="form-group">
          <label> Mart ID: </label>
          <input
            type="text"
            class="form-control"
            v-model="martId"
          />
        </div>

        
        <div class="form-group">
          <label> Email Address: </label>
          <input
            type="email"
            class="form-control"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label> Password: </label>
          <input
            type="password"
            class="form-control"
            v-model="password"
          />
        </div>

        <div class="form-group">
          <label> Confirm Password: </label>
          <input
            type="password"
            class="form-control"
            v-model="confirm"
          />
        </div>

        <button type="submit" class="btn btn-dark btn-block">
          Sign Up
        </button>

        <p class="forgot-password text-right mt-2 mb-4">
          Already registered?
          <router-link to="/">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import database from "../../firebase.js";
var admin = require('firebase-admin');
admin.initializeApp();

export default {
  name: "Register",
  data() {
    return {
      martId: "",
      gender: "",
      hp: "",
      dob: "",
      email: "",
      password: "",
      confirm: "",
    };
  },
  methods: {
    register() {
      if (this.password != this.confirm) {
        alert("Password do not match. Please try again");
      } else {
        
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((cred) => {

            /*admin.auth().setCustomUserClaims(cred.user.uid, { supermarketAdmin: true }).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued
          });*/
            alert("adminSignup");
            database.collection("roles").doc(cred.user.id).set({
              email: cred.user.email,
              role: {supermarketAdmin: true},
            })
            this.$router.push("/");
            return database.collection("martAdmin").doc(cred.user.uid).set({
              Email: cred.user.email,
              userid: cred.user.uid,
              martId: this.martId,
            });
          })
          .catch((error) => {
            alert(error);
          });
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.header {
  background: var(--dark-color-a);
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  margin: 0px 3px;
}
.half {
  width: 126px;
  display: inline;
}
.vertical-center {
  height: 95%;
}

.image1 {
  width: 640px;
  height: 630px;
  position: absolute;
  left: 100px;
  display: inline-block;
  padding-top: 40px;
}

.image2 {
  width: 200px;
  position: flexi;
  padding-top: 30px;
}
</style>