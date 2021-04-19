<template>
  <div>
    <Bar></Bar>
    <br />
    <p class="title">🍎 Personal Items 🍎</p>
    <div class="vertical-align">
      
      <div class="items scroll">
        <h1>😄 All Items 😄</h1>
        <button
          class="button btn btn-info btn-sm"
          data-toggle="modal"
          data-target="#myModal"
        > + </button>
        <addItem></addItem>

        <ul>
          <li v-for="item in this.items" :key="item.id">

            <div id="list-items" class="container">  
              <img v-bind:src="item[1].img" id="itemImg" />

              <div id="itemDetails">
                <p>
                  <b> {{ item[1].name }} </b>
                </p>
                <p>🔖 Category: {{ item[1].category }}</p>
                <p>🍫 State: {{ item[1].state }}</p>
                <p>💲 Amount Saved: ${{ item[1].saved }}</p>
                <p>📆 Expiry Date: {{ item[1].expiry }}</p>

                <h3>
                  <b>⌛ {{ item[1].numDaysLeft }}</b> more days
                </h3>
              </div>

              <b-col>
                <br>
              <button
              class="btn"
              v-bind:id="item[0]"
              v-on:click="deleteItem($event)"
            >
              Delete
            </button> 
            <button class="btn" v-bind:id="item[0]" v-on:click="consumeItem($event)"> Consume </button>
              </b-col></div>
          </li>
        </ul>
      </div>

      <div class="expiring-soon scroll">
        <h1>😨 Expiring Soon 😨</h1>
        <div class="vertical-align">
          <ul>
            <li v-for="item in this.expiring" :key="item.id">
              
              <div id="list-expiring">
                <img v-bind:src="item[1].img" id="itemImg" />

                <div id="itemDetails">
                  <p>
                    <b> {{ item[1].name }} </b>
                  </p>
                  <p>🔖Category: {{ item[1].category }}</p>
                  <p>🍫 State: {{ item[1].state }}</p>
                  <p>💲 Amount Saved: ${{ item[1].saved }}</p>
                  <p>📆 Expiry Date: {{ item[1].expiry }}</p>
                  <h3>

                    <div v-if="item[1].numDaysLeft > 0">  
                      <h3> <b>⌛ {{ item[1].numDaysLeft }}</b> more days </h3>
                    </div> 

                    <div v-else>
                      <h3> <b>⌛ &#60; 1 more days </b> </h3>
                      
                      </div>
                  
                  </h3>
                  
                </div>
                <b-col>
                  <br>
                <button
                class="btn"
                v-bind:id="item[0]"
                v-on:click="deleteItem($event)"
              >
                Delete
              </button>
              <button class="btn" v-bind:id="item[0]" v-on:click="consumeItem($event)"> Consume </button>
              </b-col>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="expired scroll">
        <h1>😡 Expired 😡</h1>
        <div class="vertical-align">
          <ul>
            <li v-for="item in this.expired" :key="item.id">
              <div id="list-expired">
                <img v-bind:src="item[1].img" id="itemImg" />

                <div id="itemDetails">
                  <p>
                    <b> {{ item[1].name }} </b>
                  </p>
                  <p>🔖 Category: {{ item[1].category }}</p>
                  <p>🍫 State: {{ item[1].state }}</p>
                  <p>💲 Amount Saved: ${{ item[1].saved }}</p>
                  <p>📆 Expiry Date: {{ item[1].expiry }}</p>
                  <h3>
                    <b>⌛ Expired</b>
                  </h3>
                </div>
                <b-col>
                  <br>
                <button
                class="btn"
                v-bind:id="item[0]"
                v-on:click="deleteItem($event)"
              >
                Delete
              </button>
              <button class="btn" v-bind:id="item[0]" v-on:click="consumeItem($event)"> Consume </button>
              </b-col>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import moment from "moment";
import db from "../../firebase.js";
import addItem from "./addItem.vue";
import firebase from "firebase";


export default {
  data() {
    return {
      items: [],
      expiring: [],
      expired: [],
      all: []
    };
  },
  components: {
    addItem,
  },
  methods: {
    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      db.collection("items")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },

    consumeItem: function(event) {

      let doc_id = event.target.getAttribute("id");
      //alert("id consumed is " + doc_id);
      let userId = firebase.auth().currentUser.uid;
      var actualMonth = "";

      //alert("all items first " + this.all[0]) 
      this.all.forEach((item) => {
        let id = item[0];
        let data = item[1];
        if (id == doc_id) {
          //alert("found");
          actualMonth = data["keyedInMonth"];

        }
      })
      db.collection("consumeItems").doc(userId).set({
            [actualMonth]: {unConsumed: firebase.firestore.FieldValue.arrayRemove(doc_id)}
            }, {merge: true});
      db.collection("consumeItems").doc(userId).set({
              [actualMonth]: {consumed: firebase.firestore.FieldValue.arrayUnion(doc_id)}
            }, {merge: true})

      this.deleteItem(event);
    },
    fetchItems: function () {
      //alert("fetchItems")
      db.collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapShot) => {
          // let item = {};
          querySnapShot.forEach((doc) => {
            var edate = moment(doc.data().expiry, "DD-MM-YYYY");
            var tdydate = moment();
            var days = edate.diff(tdydate, "days");
            let id = doc.id;
            let item_dict = doc.data();

            if (item_dict.img == "") {
              //alert("items' img are " + item_dict.img);

              db.collection("items").doc(id).update({
                img:"https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"
              })

            }
            item_dict["numDaysLeft"] = days;
            //if it does not expire within 3 days, consider it not expiring soon
            if (days > 5) {
              doc.data["numDaysLeft"] = days;
              this.items.push([id, item_dict]);
              // expires in <=3 days
            } else if (days < 0) {
              doc.data["numDaysLeft"] = days;
              this.expired.push([id, item_dict]);
              // expired already
            } else if (days <= 5) {
              this.expiring.push([id, item_dict]);
            }
            var date = doc.data()["keyin-date"];
            var month = moment(date, 'DD-MM-YY').month();
            let userId = firebase.auth().currentUser.uid
            //alert("id is " + id+ "month is " + month);

            let actualMonth = "" + (month + 1);
            item_dict["keyedInMonth"] = actualMonth;
            //alert("keyed in month is " + item_dict["keyedInMonth"])
            this.all.push([id, item_dict]);
            //alert("actual month i s" + actualMonth) 
            //let field = "" + actualMonth + " - notConsumed"

            db.collection("consumeItems").doc(userId).set({
              [actualMonth]: {unConsumed: firebase.firestore.FieldValue.arrayUnion(id)}
            }, {merge: true})

            db.collection("consumeItems").doc(userId).set({
              [actualMonth]: {consumed: firebase.firestore.FieldValue.arrayUnion("0")}
            }, {merge: true})

          });
        });
    },
  },
  created() {
    this.fetchItems();
    //this.createConsume();
  },

};
</script>

<style scoped>
h1 {
  font-size: 32.5px;
  font: Helvetica;
  padding-top: 10px;
}
.btn {
  border-radius: 15px;
  right: 100px;
  float: right;
  border: none;
  color: rgb(0, 0, 0);
  background-color: #fcf7f7a9;
  margin: 2px;
  height: 30px;
}
.btn:hover {
  background-color: rgb(146, 146, 146);
}
.scroll {
  margin: 4px, 4px;
  padding: 4px;
  width: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  position: sticky;
}
li {
  text-align: center;
  padding: 10px;
  margin: 10px;
}
p {
  font-size: 20px;
  text-decoration: black;
  text-align: left;
}
h3 {
  font-size: 23px;
  color: crimson;
  text-align: right;
  font: Helvetica;
}
.title {
  font: Helvetica;
  text-align: center;
  padding-left: 50px;
  font-size: 35px;
}
#itemImg {
  width: 35%;
  height: 35%;
  overflow: hidden;
  margin: 20px 10px;
}
#itemDetails {
  align-items: center;
  text-align: center;
  padding: 20px 0px;
  color: #192027;
  display:inline-block;
  width: 58%;
    @media (max-width: 620px) {
      width: 100%;
    }
}
#list-items {
  background: rgba(180, 212, 180, 0.911);
  border-radius: 50px;
  display: flex;
  width: auto;
  height: auto;
  border: 1.8px solid rgb(3, 3, 3);
  overflow: hidden;
  position: sticky;
}
#list-expiring {
  background: rgba(250, 236, 173, 0.911);
  border-radius: 50px;
  display: flex;
  width: auto;
  height: auto;
  border: 1.8px solid rgb(3, 3, 3);
  overflow: hidden;
  position: sticky;
}
#list-expired {
  background: rgba(236, 184, 184, 0.911);
  border-radius: 50px;
  display: flex;
  width: auto;
  height: auto;
  border: 1.8px solid rgb(3, 3, 3);
  overflow: hidden;
  position: sticky;
}
.button {
  position: absolute;
  border-radius: 30px;
  right: 20px;
  z-index: 2;
  height: 60px;
  width: 60px;
  color: white;
  font-size: 40px;
  text-align: center;
  color: black;
  background-color: #ebf0eba9;

}
.items {
  width: 45%;
  height: 1570px;
  position: absolute;
  background: #2e976bcb;
  margin-top: 30px;
  margin-left: 60px;
  border-radius: 50px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
.expiring-soon {
  width: 45%;
  height: 750px;
  position: absolute;
  background: #f3ae53ab;
  margin-top: 30px;
  left: 52.5%;
  border-radius: 50px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
.expired {
  width: 45%;
  height: 750px;
  position: absolute;
  background: #972e2eab;
  border-radius: 50px;
  transition: all 0.3s;
  margin-top: 850px;
  left: 52.5%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
vertical-align {
  /* display: flex; */
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

</style>
