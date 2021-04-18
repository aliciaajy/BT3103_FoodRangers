<template>
  <div>
    <!-- <h1><span class=" w-100 align-baseline badge bg-info text-light">Dashboard</span></h1> -->
    <h1 class="title">📈📉📊 Dashboard 📈📉📊 </h1>
    
    <div class="row">
      <div class="card text-white bg-success mb-2 container" style="max-width: 20rem">
        <div class="card-header">Items</div>
        <div class="card-body">
          <h1 class="card-title  fs-1 fw-bold">{{this.items.length}}</h1>
          <p class="card-text">
            Don't worry, your items are not expiring soon.
          </p>
        </div>
      </div>

      <div class="card text-white bg-warning mb-2 container" style="max-width: 20rem">
        <div class="card-header">Expiring Soon</div>
        <div class="card-body">
          <h1 class="card-title">{{this.expiring.length}}</h1>
          <p class="card-text">
            Please consume your items soon! 
          </p>
        </div>
      </div>
      <div class="card text-white bg-danger mb-2 container" style="max-width: 20rem">
        <div class="card-header">Expired</div>
        <div class="card-body">
          <h1 class="card-title">{{this.expired.length}}</h1>
          <p class="card-text">
            Your items have expired....
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import db from "../../firebase.js";
import firebase from "firebase";

export default {
  data() {
    return {
      items: [],
      expiring: [],
      expired: [],
    };
  },
  methods: {
    fetchItems: function () {
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
.title {
  background: rgb(208, 208, 223);
  
}
</style>