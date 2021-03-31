<template>
  <div>
    <Bar></Bar>
    <nav>
      <img v-bind:src="this.mart.image">
      <div class="mart">
        <p>{{this.mart.name}} </p>
        {{this.mart.address}} <br>
      </div>
      <ul id="types">
        <p>Green Initiatives:</p>
        <li v-for = "(value, key) in this.mart.type" :key="key">
          {{value}}
        </li>
      </ul>
      <martReviews v-bind:id="this.id" class="reviewCSS"> </martReviews>
    </nav>
    <div id="content">
      <p id="rating">Green Rating: 
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
      <salesItems></salesItems>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import salesItems from "./salesItems";
import StarRating from "vue-star-rating";
import martReviews from './martReviews.vue'

export default {
  data() {
    return {
      mart: [],
    }
  },
  props: {
    id: {
      type: String,
    }
  },
  components: {
    salesItems: salesItems,
    StarRating,
    martReviews
  },
  methods: {
    fetchItems: function() {
      db.collection('marts').doc(this.id).get().then(snapshot => { 
        this.mart = snapshot.data();
      });
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
  content:"";
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
 content: '✓'; 
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