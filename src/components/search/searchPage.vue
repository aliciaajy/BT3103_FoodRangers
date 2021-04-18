<template>
  <div>
    <Bar></Bar>
    <div id="main">
      

      <div id="tab">
        <br>
        <h1>🔍 Marts in Singapore 🔍 </h1>
        <p id="search-tab">Search</p>  
        <router-link to="/customer/favourites" exact id="fav-tab"> Favourites </router-link>

      </div>

      <filters id="filters"></filters>


      
      
    </div>
  </div>
</template>



<script>

//import db from "../../firebase.js";
//import firebase from 'firebase'
//import filters from "./filtersAndMarts.vue";
import filters from "./search2.vue";
//import starRatings from "./starRatings.vue";
//import store from '@/store';

export default {
  components: {
    //  mart
    filters,
   // starRatings
  },

  /*beforeRouteEnter(to, from, next) {
    alert(this.$router)
    //alert(JSON.stringify(to))
    //alert("url is " + JSON.stringify(to.params))
    let uid = firebase.auth().currentUser["uid"];
    alert("user is " + uid);
    //alert("router is "+ this.$router.history);
    //console.log("id is " + this.$router.path);
    db.collection("users").doc(uid).get().then((snapshot) => {
      if (snapshot.exists) {
                //is user
          next();
      } else {
      alert("no access");
      next('/martAdmin')

    }
      //next(false);
    })
  },*/

  //export ends
};
</script>

<style>

  ul {
    list-style-type: none;
    margin: 0; 
    padding: 0;
  }


  #main {
     padding-left: 100px;
  }

  
  #tab {
    width: 100%;
    height: 70px;
    font-size: 30px;
    font-weight: bold;
    }

  #search-tab {
    float: left;
    width: 50%;
    background-color: #2c3e50;
    color: white;
    text-align: center;
    }

    #fav-tab {
    border-width: 100px;
    width: 50%;
    border-color: white;
    text-align: center;
    background-color: white;
    color: #2c3e50;
    float: left;


    }

    .searchLoc {
    height: 50px;
    width: 500px;
    background-color: #f1f1f1;
    left: 0px;
    padding-top: 50px;
    float:left;
    padding-right: 20px;
  }

  #mart {
    border: 1px solid white;
    overflow: hidden;
    
    width: 1250px;
    height: 220px;
  
    background-color: lightgray;
    }

    #martImg {
       width: 288px;
       height: 220px;


       max-width: 80%;
       max-height: 100%;
       
       
       float: left;
       border-width: 1px;
       object-fit: cover;

    }

    #martDetails > h1 {
    text-align: center;
    padding: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #2c3e50;
    font-family: Helvetica;
    font-style: bold;

    }


    input,
    input::-webkit-input-placeholder {
      font-size: 15px;
      color: lightgray;

    }

    input:focus {
      border: 3px solid #555;
    }




    #dropdown-all > div {
      font-size: 20px;
      font-family: Helvetica;
      color: #2c3e50;
      border-radius: 4px;
      background-color: #f1f1f1;
      float: left;
      padding-top: 10px;
      padding-right: 20px

    }

      #martLink:hover {
        color: blue;
        cursor: pointer;
      }

    #dropdown-all > p {
      margin: 0px;
    }

    #main {
      padding-left: 50px;
      padding-right: 50px;
      position: sticky;
    }

    #filters {
      height: 100px;
      width: 100%;
      background-color: #f1f1f1;
      float: left;
    }
    
    #numOfSearches {
      font-size: 25px;
      padding-right: 100px;
      float: right;
    }

    #search-div {
      padding-left: 20px;
      padding-top: 50px;
    }


    #result {
      float:left;
      width: 1250px;
      margin: 0 auto;
      display: block;
    }



    #martDetails {
      float: left;
      padding: 20px;
      width: 600px;
    }


    #starRatings {
    text-align: center;
    float: left;
    padding-top: 10px;
    font-size: 15px;
    padding-left: 10px;

  }

  #all {
    width: 1250px;  }


  
</style>