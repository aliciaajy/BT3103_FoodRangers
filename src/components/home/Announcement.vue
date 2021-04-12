<template>
  <div>
    <div id="ann" class="scroll">
      <div>
        <ul>
          <li v-for="item in this.expiring" :key="item.id">
            <div id="itemDetails">
              <p>
                <i class="fa fa-map-exclamation fa-2x" aria-hidden="true"></i>
                <b>{{ item[1].name }}</b> is expiring in
                <b> {{ item[1].numDaysLeft }} </b> days
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase.js";
import moment from "moment";

export default {
  data() {
    return {
      expired: [],
      expiring: [],
    };
  },

  methods: {
    fetchItems: function () {
      db.collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var edate = moment(doc.data().expiry, "DD-MM-YYYY");
            var tdydate = moment();
            var days = edate.diff(tdydate, "days");

            let id = doc.id;
            let item_dict = doc.data();
            item_dict["numDaysLeft"] = days;

            //if it does not expire within 3 days, consider it not expiring soon
            if (days < 0) {
              doc.data["numDaysLeft"] = days;
              this.expired.push([id, item_dict]);
              // expired already
            } else if (days <= 5) {
              this.expiring.push([id, item_dict]);
            }
          });
        });
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  position: sticky;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  margin: 10px;
}

#annword {
  float: right;
  width: 35%;
  background: black;
}
#ann {
  float: right;
  width: 35%;
  height: 100vh;
  padding: 10px;
  background: rgb(151, 206, 228);
  border: 1.8px solid rgb(3, 3, 3);
}

.scroll {
  margin: 4px, 4px;
  padding: 4px;
  width: 500px;
  height: 110px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
</style>
