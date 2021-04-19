<template>
  <div>
    <div>
      <h2>Categories</h2>
      <div id="cats" class="scrollmenu tab">
        <button class="noCat tablinks All" v-on:click="filterCat(event,'All')">All</button>
  
        <button class="tablinks Staples" v-on:click="filterCat(event,'Staples')">
          <img
            src="https://media.nedigital.sg/fairprice/images/1a4a66a1-df6e-4d53-a90f-a371568c6913/Rice-Noodles-Zop_L1.png"
          /><br>Staples
        </button>

        <button class="tablinks Dairy" v-on:click="filterCat(event,'Dairy')">
          <img
            src="https://media.nedigital.sg/fairprice/images/72869ded-797c-4444-8833-fd3342f9bc95/Dairy-Chilled-Eggs-Zop_L1.png"
          /><br>Dairy
        </button>

        <button class="tablinks Drinks" v-on:click="filterCat(event,'Drinks')">
          <img
            src="https://media.nedigital.sg/fairprice/images/f147455f-0e7d-4ede-ad81-f2098f1a297f/Drinks-Zop_L1.png"
          /><br>Drinks
        </button>

        <button class="tablinks Frozen" v-on:click="filterCat(event,'Frozen')">
          <img
            src="https://media.nedigital.sg/fairprice/images/7ccc6cb4-64ac-43e5-9736-afd2dbe2aaee/Frozen-Zop_L1.png"
          /><br>Frozen
        </button>

        <button class="tablinks FruitsVege" v-on:click="filterCat(event,'FruitsVege')">
          <img
            src="https://media.nedigital.sg/fairprice/images/654aa62a-b6ad-42dc-9feb-a8b93407656d/Fruits-Vegetables-Zop_L1.png"
          /><br>Fruits and Vege
        </button>

        <button class="noCat tablinks Others" v-on:click="filterCat(event,'Others')">Others</button>
      </div>
    </div>
    <div id="products">
      <h2>Products</h2>
      <button
        class="button2 btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >
        Add Item
      </button>
      <addMartItem></addMartItem>
      <ul v-if="this.selectedCat == ''||this.selectedCat == 'All'" class="listOfProducts">
        <li v-for="item in this.items" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Staples'" class="listOfProducts">
        <li v-for="item in this.staples" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Dairy'" class="listOfProducts">
        <li v-for="item in this.dairy" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Drinks'" class="listOfProducts">
        <li v-for="item in this.drinks" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Frozen'" class="listOfProducts">
        <li v-for="item in this.frozen" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'FruitsVege'" class="listOfProducts">
        <li v-for="item in this.fruitsNvege" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-else class="listOfProducts">
        <li v-for="item in this.others" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br>
            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import addMartItem from "./addMartItem"
import firebase from "firebase";

export default {
  data() {
    return {
      items: [],
      staples: [],
      dairy: [],
      drinks: [],
      frozen: [],
      fruitsNvege: [],
      others: [],
      selectedCat: "",
    };
  },
  components: {
      addMartItem
  },
  methods: {
    fetchItems: function() {

      let uid = firebase.auth().currentUser["uid"];
      //let martId = ;
      db.collection("martAdmin").doc(uid).get().then( (snapshot) => {

        let apiId = snapshot.data().martId;
        //alert("from firebase snapshot id is " + apiId);
      db.collection('apiMart').doc(apiId).get().then(snapshot => { 
        snapshot.data().items.forEach(doc => {

        //alert("doc is  " + doc.name);
          this.items.push([apiId, doc]);
          //alert("this items are " + JSON.stringify(this.items));
          //alert("this items are " + JSON.stringify(this.items[0][1].name));
          //alert("item pushed is " + JSON.stringify(doc));
          var cat = doc.category;
          if (cat == "Staples") {
            this.staples.push([apiId, doc]);
          } else if (cat=="Dairy") {
            this.dairy.push([apiId, doc]);
          } else if (cat=="Drinks") {
            this.drinks.push([apiId, doc]);
          } else if (cat=="Frozen") {
            this.frozen.push([apiId, doc]);
          } else if (cat=="FruitsVege") {
            this.fruitsNvege.push([apiId, doc]);
          } else if (cat=="Others") {
            this.others.push([apiId, doc])
          }
        });
      });
      });

      //alert("this items are " + JSON.stringify(this.items));

        
    },
    filterCat: function (evt, cat) {
      this.selectedCat = cat;
      console.log(this.selectedCat);
      var tablinks = document.getElementsByClassName("tablinks");
      for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementByClassName(cat).style.display = "block";
      evt.currentTarget.className += " active";
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#products {
  width: 75%;
  float: right;
  margin-top: 50px;
}
.listOfProducts {
  width: 100%;
  padding-left: 15px;
  box-sizing: border-box;
}
#noCat {
  width: 180px;
  height: 50px;
  border-radius: 10px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 1100px;
  height: 500px;
}
li {
  width: 30%;
  text-align: center;
  padding: 15px 20px;
  border: 1px solid #222;
  border-radius: 15px;
  margin: 10px;
  height: 350px;
}
h2 {
  float: left;
}
h5 {
  font-weight: bold;
}
p {
  margin-bottom: 0;
}

img {
  width: 135px;
  height: 135px;
}

#info {
  padding: 10px;
  padding-left: 45px;
  text-align: left;
}

.button2 {
  background-color: rgb(255, 7, 7);
  margin: 10px;
  padding: 5px;
  font-size: 12pt;
  float: right;
  font-weight: bold;
  width: 100px;
  border-radius: 40px;
}
div.scrollmenu {
  background-color: #ffff;
  overflow: auto;
  white-space: nowrap;
}
div.scrollmenu a:hover {
  background-color: #777;
}

.tab button {
  background-color: #ffff;
  margin: 10px;
  padding: 5px;
  font-size: 13pt;
  font-weight: bold;
  width: 180px;
  border-radius: 10px;
  transition: 0.3s;
}

.tab button:hover {
  background-color: #ddd;
}

.tab button.active {
  background-color: #ccc;
}
#cats {
  width: 75%;
  float: right;
}
</style>