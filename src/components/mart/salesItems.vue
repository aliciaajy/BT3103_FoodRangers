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
    }
  },

  props: {
        id: {
            type: String
        }
  },
  methods: {
    fetchItems: function() {
      //alert("fetch items");

      //alert("id " + this.id)
      db.collection('apiMart').doc(this.id).get().then(snapshot => { 
        //alert("snapshot " + JSON.stringify(snapshot.data()));
        snapshot.data().items.forEach(doc => {

        //alert("doc is  " + doc.name);
          this.items.push([this.id, doc]);

          var cat = doc.category;
          if (cat == "Staples") {
            this.staples.push([this.id, doc]);
          } else if (cat=="Dairy") {
            this.dairy.push([this.id, doc]);
          } else if (cat=="Drinks") {
            this.drinks.push([this.id, doc]);
          } else if (cat=="Frozen") {
            this.frozen.push([this.id, doc]);
          } else if (cat=="FruitsVege") {
            this.fruitsNvege.push([this.id, doc]);
          } else if (cat=="Others") {
            this.others.push([this.id, doc])
          }
        });
      });
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
.noCat {
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
  margin: 10px;
  height: 430px;
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
div.scrollmenu {
  background-color: #ffff;
  overflow: auto;
  white-space: nowrap;
}
div.scrollmenu a:hover {
  background-color: #777;
}
#cats {
  width: 75%;
  float: right;
}

</style>