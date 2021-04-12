<template>
  <div id="all">
    <api></api>
    <martDetails></martDetails>
      <div id="filters">
        <div id="search-div" class="searchLoc">
        <input id="search" class="form-control" type="text" v-model="searchQuery"
          placeholder="Search Supermarket Name"/>
        </div>
        


        <div id="dropdown-all">

          <div id="loc-div">
            <p>Distance away from you </p>

            <select v-model="distance" id="dropdown">
              <option value="all">All </option>
              <option value="1">1 km</option>
              <option  value="5">5 km</option>
              <option  value="10">10 km</option>
              <option  value="25">25 km</option>
              <option  value="50">50 km</option>
            </select>

            <!--
            <input id="location" class="form-control" type="text" v-model="distance"
              placeholder="How many km away from your current location?"/> 
            -->
          </div>

          <div id="ratings"> 
          <p>Ratings</p>
            <select v-model="selectedRatings" id="dropdown">

              <option value="lowHigh">Low to High</option>
              <option  value="highLow">High to Low</option>
            </select>
          </div>
          <div id="type">
            <p> Type </p>

          <select v-model="selectedType" id="dropdown">
            <option  value="0">All</option>
            <option value="ugly">Discount - Ugly Produce</option>
            <option  value="expiring">Discount - Expiring Food</option>
            <option  value="byob">Bring your own bag</option>
          </select>
        </div>
      </div>

      </div>
      <div id="result"> 
        <h1 id="numOfSearches"> <br> {{filtersCount}} searches found </h1>
        <div class="mart">
          
          <ul>
            <li v-for="mart in filters" :key="mart.id">
              <div id="mart">
                <img v-bind:src="mart[1].image" id="martImg" />
                <div id="martDetails">
                  <h1 id="martLink" v-bind:mod ="mart[0]" v-on:click="route($event)">{{mart[1].name }}</h1>
                  
                  <h4>{{ mart[1].address }}</h4>
                </div>
                <div id="starRatings">
                  <starRatings v-bind:rating = "mart[1].ratings"></starRatings>
                </div>

                <div id="likeButton">
                  <like  v-bind:mart="mart"></like>
                </div> 
              </div>
            </li>
          </ul>
        
      </div>
    </div>
    </div>
</template>

<script>
import db from "../../firebase.js";
import starRatings from "./starRatings.vue";
import like from "./favButton.vue";
import api from "./apiMart.js";
import martDetails from "./martDetails.js";
//import axios from 'axios';
export default {
  data() {
    return {
      marts: [],
      searchQuery: "",
      distance: "0",
      gotDist: false,
      temp: [],
      filtered: false,
      selectedRatings: "0", //means didnt select the dropdown for ratings
      selectedType: "0",
      center: {lat:0, lng:0},
      marts2: [],
    };
  },

  methods: {

    fetchItems:function(){ 
           db.collection('apiMart').orderBy('name').get().then((querySnapShot)=>{
               let mart={} 
               querySnapShot.forEach(doc=>{
                    mart=[doc.id,doc.data()]
                    //alert("mart name pushed " + doc.data().name)
                    this.marts.push(mart)
                }) 
            })

            //alert("this.marts " + this.marts[0]); 
    },

    compareRatings: function(res) {
      if (this.selectedRatings === "0") {
        return res;
      } else if (this.selectedRatings === "highLow") {
        /*res.forEach((mart) => {
          alert("res")
          alert(mart.name + " and ratings: " + mart.ratings);
        })*/
        //low to high
        
        res.sort((a, b) => b[1].ratings - a[1].ratings);
        return res;
        /*res.forEach((mart) => {
          alert(mart.name + " and ratings: " + mart.ratings);
        })*/
        //res = map.sortBy(res, 'ratings');

      } else {

        /*res.forEach((mart) => {
          alert("res")
          alert(mart.name + " and ratings: " + mart.ratings);
        })*/
        
        res.sort((a, b) => a[1].ratings - b[1].ratings);
        return res;
        /*res.forEach((mart) => {
          alert(mart.name + " and ratings: " + mart.ratings);
        })*/
      }
      
    },
     //toggles from false -> true, or from true -> false
    setFiltered: function() {
      if (this.filtered == false) {
        this.filtered = true;
      } else {
        this.filtered = false;
      }
    },


    search: function() {
      let filter = []

      if (this.searchQuery) {
        if (this.filtered == false) {
          this.setFiltered();
        }
        
        let lowerSearch = this.searchQuery.toLowerCase();
          //alert("there's search" + this.searchQuery);
        this.marts.forEach((mart) => {
          let lower = mart[1].name.toLowerCase();
          if (lower.includes(lowerSearch)) {
            filter.push(mart);
          }
        })
            //this.temp = filter;
        return filter;
 
      } else {
        //alert("no search")
        return this.marts;
      }
      //let filteredMarts = [];
    },

    type: function(res) {
      let type = []
      if (this.selectedType === "0") {return res}

      res.forEach((mart) => {
        //alert(mart.name + " in type");
        mart[1].type.forEach((typeCate) =>  {
            let lower = typeCate.toLowerCase();
            //alert("lower is " + lower);
            if (this.selectedType === "ugly") {
              if (lower.includes("discount - ugly produce")) {
                //alert(mart.name + " and type is: " + mart.type)
                type.push(mart);
                return;
              }            
            } else if (this.selectedType === "byob") {
              if (lower.includes("bring your own bag")) {
                //alert(mart.name + " and type is: " + mart.type)
                type.push(mart);
                return;
              }
            
            } else if (this.selectedType === "expiring"){
              if (lower.includes("discount - food expiring soon")) {
                //alert(mart.name + " and type is: " + mart.type)
                type.push(mart);
                return;
              }
            }


        })
      })

      /*type.forEach((mart) => {
        alert("marts in type are " + mart.name);
      })*/
      return type;

    },

    degreesToRadians: function(degrees) {
      return degrees * Math.PI / 180;
    },

    distanceBtwn: function(lat1, lon1, lat2, lon2) {
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(lat2-lat1);
      var dLon = this.degreesToRadians(lon2-lon1);

      lat1 = this.degreesToRadians(lat1);
      lat2 = this.degreesToRadians(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return earthRadiusKm * c;
    }, 

    toggleDist: function() {
      if (this.gotDist == false) {
        this.gotDist = true;
      } else {
        this.gotDist = false;
      }
    },

    location:function(res) {
      if (this.distance === "0" || this.distance === "all") {return res}
      //alert("location")
      //alert("curr location is: lat is " + this.center.lat + " and lng is " + this.center.lng)
      //alert(this.distance + " is v-model dist")

      let loc = []
      if (this.distance) {
        if (this.gotDist == false) {
          this.toggleDist();
        }
      }

      let distInt = parseFloat(this.distance);
      if (this.distance == "") {return res}

      res.forEach((mart) => {
       // alert("for each loop, mart position is " + mart[1].name + " " + JSON.stringify(mart[1].position))
        let martCoords = mart[1].position
        //alert("mart's coords are " + martCoords["lat"])
        
        let distBtwn = this.distanceBtwn(this.center.lat, this.center.lng, martCoords.lat, martCoords.lng)
        //alert(distBtwn + " is distance between coords")
        if (distBtwn <= distInt) {
          loc.push(mart);
        }
      })
      return loc;
    },

    geolocation: function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    route:function(event){

        const doc_id = event.target.getAttribute("mod");
        //this.$router.push({name: 'modify', params: {doc_id}});
        this.$router.push({path: `/mart/${doc_id}`});
    },

    //methods end here
  },

  computed: {
    filters: function() {
      var res = []
      //if filtered is true, use temp
      if (this.filtered) {
        res = this.temp;
      } else {
        res = this.marts;
      }
      res = this.search();
      res = this.compareRatings(res);
      res = this.type(res);
      res = this.location(res);

      return res;
      
      
    },

    filtersCount: function() {
      return this.filters.length;
    }

    //computed ends 
  },


  beforeCreate() {
    //this.addAPI();
    
    },

  created() {
    this.fetchItems();
    this.geolocation();
    //this.addAPI();
    
  },

  components: {
    starRatings,
    like,
    api,
    martDetails
  }

};
</script>

<style scoped>
  
  #starRatings {
    text-align: center;
    float:left;
    font-size: 25px;

  }
  
  #ratings {
    float: right;
  }

  #type {
    float: right;
  }

  #loc-div {
    float: right;
  }

  #likeButton {

      padding-left: 50px;
      padding-top: 70px;

  }

  #filters {
    padding-left:3%;
    padding-right:3%;
  }

</style>