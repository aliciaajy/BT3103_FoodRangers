<template>
  <div class="body1">
    <img src="../../assets/earth.png" class="image1" />
    <div>
      <form class="vertical-center inner-block" @submit.prevent="register">
        <h1><img src="../../assets/foodranger.png" class="image2" /></h1>

        <div class="form-group">
          <label> Name: </label>
          <input
            type="text"
            class="form-control"
            v-model="name"
          />
        </div>

        <div class="form-group">
          <label> Gender: </label>
          <select v-model="gender" class="form-control half">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label> Date Of Birth: </label>
          <input
            type="date"
            class="form-control half"
            v-model="dob"
          />
        </div>

        <div class="form-group">
          <label> Phone Number: </label>
          <input
            type="text"
            class="form-control"
            v-model="hp"
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

export default {
  name: "Register",
  data() {
    return {
      name: "",
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
            this.$router.push("/");
            return database.collection("users").doc(cred.user.uid).set({
              Email: cred.user.email,
              userid: cred.user.uid,
              name: this.name,
              gender: this.gender,
              hp: this.hp,
              dob: this.dob,
              profile_pic: "",
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