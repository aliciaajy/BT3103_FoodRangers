<template>
  <div>
    <div class="topnav">
      <!-- <img src="../assets/foodranger.png" /> -->
      <a href="/home"><i class="fa fa-bank fa-2x" aria-hidden="true"></i> Home </a>
      <a href="/items"><i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i> My Items</a>
      <a href="/dashboard"><i class="fa fa-bar-chart fa-2x" aria-hidden="true"></i> Dashboard</a>
      <a href="/map"><i class="fa fa-map-marker fa-2x" aria-hidden="true"></i> Shops Near You</a>
      <a href="/search"><i class="fa fa-search fa-2x" aria-hidden="true"></i> Search</a>
      <a href="/settings" class="right"><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i> Settings </a>
      <a href ='/' class="right" v-on:click="signOut"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i>Sign Out </a>
    </div>
  </div>
</template>


<script>
import firebase from 'firebase'
export default {
 methods: {
    signOut: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("user successfully sign out");
          localStorage.clear();
          localStorage.setItem("login", false);
          location.reload();
          this.$router.push("/");
        });
    },
 }
}

</script>

<style scoped>
/* Add a black background color to the top navigation */
.topnav {
  display: flex;
  background-color: #333;
  height: 70px;
  overflow: hidden;
  width: 100%;
}

.topnav a.right {
  float: right;
}

/* Style the links inside the navigation bar */
.topnav a {
  color: #f2f2f2;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 20px;
}

/* .topnav img {
  float: left;
  left: 10px;
  width: 200px;
  height: 230px;
  display: flex;
  padding-bottom: 160px;
  padding-inline: 50px;
  background: #f2f2f2;
} */

.topnav img {
  width: 160px;
  height: 70px;
  background: #f2f2f2;
  padding-inline: 14px;
}


/* Change the color of links on hover */
.topnav a:hover {
  background-color:#4caf50;
  color: black;
  height: 70px;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
  height: 70px;
}
</style>