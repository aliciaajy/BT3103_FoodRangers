<template>
  <div>
    <Bar></Bar>
    <nav>
      <img v-bind:src="this.mart.image" />
      <div class="mart">
        <p>{{ this.mart.name }}</p>
        {{ this.mart.address }} <br />
      </div>
      <ul id="types">
        <p>Green Initiatives:</p>
        <li v-for="(value, key) in this.mart.type" :key="key">
          {{ value }}
        </li>
      </ul>
     
    </nav>
    <div id="content">
      <p id="rating">
        Green Rating:
        <span v-text="this.mart.ratings"></span>
        <starRating
          :rating="this.mart.ratings"
          :read-only="true"
          :increment="0.1"
          :show-rating="false"
          :fixed-points="1"
          inactive-color="#000000"
          id="ratingsStar"
        ></starRating>
      </p>
     <SupermarketItems></SupermarketItems>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import SupermarketItems from "./SupermarketItems";
import StarRating from "vue-star-rating";
// import martReviews from "../mart/martReviews.vue";
import firebase from 'firebase'

export default {
  data() {
    return {
      mart: [],
    };
  },


  props: {
    id: {
      type: String,
    },
  },
  components: {
    SupermarketItems,
    StarRating,
   
  },
  methods: {
    fetchItems: function() {

      let uid = firebase.auth().currentUser["uid"];
      //let martId = ;
      db.collection("martAdmin").doc(uid).get().then( (snapshot) => {

        let apiId = snapshot.data().martId;
        //alert("from firebase snapshot id is " + apiId);
      db.collection('apiMart').doc(apiId).get().then(snapshot => { 
       // alert("snapshot HERE " + JSON.stringify(snapshot.data()));

        this.mart = snapshot.data();
        //alert("this items are HERE " + JSON.stringify(this.mart));
        
      });
      });

      //alert("this items are " + JSON.stringify(this.items));

        
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.reviewCSS {
  margin-left: 40px;
  margin-right: 40px;
  border-top: 1px solid black;
  text-align: left;
}

nav {
  float: left;
  width: 25%;
  background: #ffff;
  height: 100vh;
  padding: 10px;
}

img {
  width: 270px;
  border-radius: 20px;
  margin: 20px;
}
.mart {
  margin-left: 40px;
  margin-right: 40px;
  text-align: left;
}
.mart:after {
  content: "";
  display: inline-block;
  height: 0.5em;
  vertical-align: bottom;
  width: 100%;
  border-top: 1px solid black;
}
p {
  font-size: 13pt;
  font-weight: bold;
}
#types {
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}
ul li:before {
  content: "✓";
}
li {
  margin-left: 20px;
}
#content {
  padding: 20px;
}
span {
  font-size: 30pt;
  color: red;
}
#rating {
  float: right;
}
#ratingsStar {
  display: inline-block;
}
</style>