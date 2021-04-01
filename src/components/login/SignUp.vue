<template>
  <div class="body1">
    <img src="../../assets/earth.png" class="image1" />
    <div>
      <form class="vertical-center inner-block" @submit.prevent="register">
        <h1><img src="../../assets/foodranger.png" class="image2" /></h1>

        <div class="form-group">
          <label> Email Address: </label>
          <input
            type="email"
            class="form-control form-control-lg"
            v-model="email"
          />
        </div>

        <div class="form-group">
          <label> Password: </label>
          <input
            type="password"
            class="form-control form-control-lg"
            v-model="password"
          />
        </div>

        <div class="form-group">
          <label> Confirm Password: </label>
          <input
            type="password"
            class="form-control form-control-lg"
            v-model="confirm"
          />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
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

export default {
  name: "Register",
  data() {
    return {
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
            this.$router.push("/login");
            return database.collection("users").doc(cred.user.uid).set({
              Email: cred.user.email,
              userid: cred.user.uid,
            });
          })
          .catch((error) => {
            alert(error);
          });
        this.$router.push("/login");
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
  height: 200px;
  position: flexi;
}
</style>