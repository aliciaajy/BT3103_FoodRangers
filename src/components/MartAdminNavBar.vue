<template>
  <div>
    <div class="topnav">
      <div class="ml-auto">
        <a href ='/' v-on:click="signOut"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i>Sign Out </a>
      </div>
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
          //alert("this router " + JSON.stringify(this.$router));
          this.$router.push("/");
        });
    },
    //methods end here
 }
}

</script>

<style scoped>
/* Add a black background color to the top navigation */
.topnav {
  width: 100%;
  display: flex;
  background-color: #333;
  height: 55px;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  color: #f2f2f2;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 17px;
  display: block;
  float: left;
}

i {
  font-size: 25px;
  padding: 3px;
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


/* Change the color of links on hover */
.topnav a:hover {
  background-color:#4caf50;
  color: black;
  height: 55px;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
  height: 55px;
}

/* managed to turn the icon white */
.topnav i {

  color: white;
  height: 55px;
}
</style>
