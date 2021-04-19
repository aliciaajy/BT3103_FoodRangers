<template>
  <div class = "body1">
    <img src="../../assets/earth.png" class="image1" />

    <form class="inner-block vertical-center" @submit.prevent="login">
      <h1><img src="../../assets/foodranger.png" class="image2" /></h1>

        <div> 
          <router-link to="/" id="fav-tab">User Login </router-link> 
          <p id="search-tab"> Admin Login </p>
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

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign In
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
       
          Not registered?
          <router-link to="/signup">Sign up</router-link> <br><br>
            <router-link to="/forgot-password">Forgot password ?</router-link><br>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import db from "../../firebase.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      martId: "",
    };
  },

  methods: {
    created() {
        firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then(tokenResult => {
                        console.log(tokenResult.claims);
                    });
            }
        });
    },

    async login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          localStorage.setItem("login", true);
          alert("Successfully logged in");

          let uid = firebase.auth().currentUser["uid"];
          db.collection("martAdmin").doc(uid).get().then((snapshot) => {
            if (snapshot.exists) {
              alert("success 2x")
              //admin is an admin
              this.$router.push("/supermarketAdmin/supermarket");
            }
          })

        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.image1 {
  width: 640px;
  height: 630px;
  position:absolute;
  left: 100px;
  display: inline-block;
  padding-top: 40px;
}

.image2 {
  width: 300px;
  position: flexi;
  /* //right: 200px; */
  /* display: inline-block; */
}

.div2 {
  background-color: aqua;
}
</style>