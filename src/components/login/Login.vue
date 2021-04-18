<template>
<div>
  <!-- <Header></Header> -->
  <div class = "body1">
    
    <img src="../../assets/earth.png" class="image1" />

    <form class="inner-block vertical-center" @submit.prevent="login">
      <h1><img src="../../assets/foodranger.png" class="image2" /></h1>

      <div> 
          <p id="search-tab">User Login </p>  
          <router-link to="/supermarketAdmin/login" exact id="fav-tab"> Mart Admin Login </router-link>
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

      <div class="social-icons">
        <ul>
          <li>
            <a href="#"><i class="fa fa-google"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-facebook"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-twitter"></i></a>
          </li>
        </ul>
      </div>
    </form>
   
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'

export default {
  data() {
    return {
      email: "",
      password: "",
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
          this.$router.push("/customer/home");
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
  width: 600px;
  height: 600px;
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
  /* background-color: aqua; */
  background-color: white;
}
</style>