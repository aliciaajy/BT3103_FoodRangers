<template>
  <div>
    <div id="ann" class="scroll">
      <div>
        <ul>
          <li v-for="item in this.expiring" :key="item.id">
            <div id="itemDetails">
                <i class="fa fa-map-exclamation fa-2x" aria-hidden="true"></i>
                <b> ⏰ {{ item[1].name }}</b> is expiring in

                <div v-if="item[1].numDaysLeft > 0">  
                      <h3> <b>⌛ {{ item[1].numDaysLeft }}</b> days❗  </h3>
                    </div> 

                  <div v-else>
                      <h3> <b>⌛ &#60; 1 </b>  day❗  </h3>
                  </div>
              
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
h3 {
  font-size:20px;
}


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
  text-align: left;
  padding: 10px;
  margin: 10px;
}

#ann {
  float: right;
  width: 27%;
  height: 100vh;
  padding: 20px;
  background: rgb(57, 117, 141);
  border-radius: 20px;
}

.scroll {
  margin: 4px, 4px;
  padding: 4px;
  width: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}

b{
  font-size: 20px;
}

#itemDetails {
  align-items: center;
  text-align: center;
  padding: 20px 10px;
  color: #192027;
  background-color: rgb(136, 196, 196);
  border-radius: 30px ;
  /* display:inline-block; */
  width: 100%;
    /* @media (max-width: 620px) {
      width: 100%;
    } */
}
</style>
