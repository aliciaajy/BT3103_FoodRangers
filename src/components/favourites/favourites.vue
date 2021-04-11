<template>
  <div>
    <Bar></Bar>
    <nav> 
   
    </nav>

      <div id="main">
        <div id="tab">
          <br>
          <h1> Favourite marts </h1>
          <router-link to="/search" exact id="search-tab"> Search </router-link>
          <p id="fav-tab"> Favourites </p>
        </div>

        <div id="result"> 
          <h1 id="numOfSearches"> <br> {{filtersCount}} searches found </h1>
          <div class="mart">
          
            <ul>
              <li v-for="mart in marts" :key="mart.id">
                <div id="mart">
                  <img v-bind:src="mart[1].image" id="martImg" />
                  <div id="martDetails">
                    <h1 id="martLink" v-bind:mod ="mart[0]" v-on:click="route($event)">{{mart[1].name }}</h1>
                  
                    <h4>{{ mart[1].address }}</h4>
                  </div>

                  <div id="likeButton">
                    <like v-bind:mart="mart"></like>
                  </div> 
                </div>
              </li>
            </ul>
        
          </div>
        </div>

      </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
//import starRatings from "../search/starRatings.vue";
import like from "./favButton.vue";
import firebase from "firebase";
export default {
  components: {
   // starRatings,
    like

  },

  data() {
    return {
      marts: []

    }
  },

   methods: {

    fetchItems:function(){ 
      //alert("fetch");
      //alert("id - " + firebase.auth().currentUser.uid)
           db.collection('favMart').where("userid","array-contains",firebase.auth().currentUser.uid).
           get().then((querySnapShot)=>{
            //alert("working")
               let mart={} 
               querySnapShot.forEach(doc=>{
                    mart=[doc.id,doc.data()]

                    //alert("mart is " + JSON.stringify(doc.data()))
                    this.marts.push(mart)
                }) 
            }) 
    },
    route:function(event){

        const doc_id = event.target.getAttribute("mod");
        //this.$router.push({name: 'modify', params: {doc_id}});
        this.$router.push({path: `/mart/${doc_id}`});
    },
    //methods end here
  },

  created() {
    this.fetchItems();
  },

  computed: {
    filtersCount: function() {
      return this.marts.length;
    }

  }
}
</script>

<style scoped>
  #tab {
    width: 100%;
    height: 70px;
    font-size: 30px;
    font-weight: bold;
    }

    #search-tab {
    float: left;
    width: 50%;
    background-color: white;
    color: #2c3e50;
    text-align: center;

    }

    #fav-tab {
    border-width: 100px;
    width: 50%;
    border-color: white;
    text-align: center;
    background-color: #2c3e50;
    color: white;
    float: left;
  }

      #main {
      padding-left: 50px;
      padding-right: 50px;
      position: sticky;
    }

  #result {
    margin: 0 auto;
    padding-left:3%;
    padding-right:3px;
    display: block;
  }

    #numOfSearches {
      font-size: 25px;
      padding-right: 100px;
      float: right;
    }

    #result {
      width: 1250px;
    }

    #likeButton {
      padding-left: 50px;
      padding-top: 70px;

    }

</style>
