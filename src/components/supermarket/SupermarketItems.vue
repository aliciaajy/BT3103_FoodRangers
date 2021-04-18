<template>
  <div>
    <div>
      <h2>Categories</h2>
      <div id="cats" class="scrollmenu">
        <button id="all" v-on:click="filterCat('All')">All</button>
        <button v-on:click="filterCat('Housebrand')">
          <img
            src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1436334225/p4ucgwxnao0czp2ce1ap.png"
          /><br />Housebrand
        </button>
        <button v-on:click="filterCat('Snacks')">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/81FfpLMWNfL._SL1500_.jpg"
          /><br />Snacks
        </button>
        <button v-on:click="filterCat('Frozen')">
          <img
            src="https://www.tnp.sg/sites/default/files/styles/rl680/public/articles/2020/07/16/np20200716-nps-014-00.jpg?itok=SWmYphQe"
          /><br />Frozen
        </button>
        <button v-on:click="filterCat('Staples')">
          <img
            src="https://thumbs.dreamstime.com/b/carbohydrate-products-potato-15101117.jpg"
          /><br />Staples
        </button>
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
      <ul v-if="this.selectedCat == 'All'" class="listOfProducts">
        <li v-for="item in this.items" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br />



            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Housebrand'" class="listOfProducts">
        <li v-for="item in this.housebrand" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br />

            Expires: {{ item[1]["expiryDate"] }} <br />
            Qty left: {{ item[1]["quantity"] }}
          </div>
        </li>
      </ul>
      <ul v-if="this.selectedCat == 'Snacks'" class="listOfProducts">
        <li v-for="item in this.snacks" :key="item.index">
          <img v-bind:src="item[1].img" />
          <div id="info">
            <h5>
              ${{ parseFloat(item[1]["promoPrice"]).toFixed(2) }} (U.P. ${{
                parseFloat(item[1]["usualPrice"]).toFixed(2)
              }})
            </h5>
            <p>{{ item[1]["name"] }}</p>
            <br />

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
            <br />

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
            <br />

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
      housebrand: [],
      snacks: [],
      frozen: [],
      staples: [],
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
          //for (var cat of values) {
            if (cat == "Housebrand") {
              this.housebrand.push([apiId, doc]);
            } else if (cat == "Snacks") {
              this.snacks.push([apiId, doc]);
            } else if (cat ==  "Frozen") {
              this.frozen.push([apiId, doc]);
            } else {
              this.staples.push([apiId, doc])
            }
          //}
        });
      });
      });

      //alert("this items are " + JSON.stringify(this.items));

        
    },
    filterCat: function (cat) {
      this.selectedCat = cat;
      console.log(this.selectedCat);
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
#all {
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
button {
  background-color: #ffff;
  margin: 10px;
  padding: 5px;
  font-size: 12pt;
  font-weight: bold;
  width: 180px;
  border-radius: 10px;
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
#cats {
  width: 75%;
  float: right;
}
</style>