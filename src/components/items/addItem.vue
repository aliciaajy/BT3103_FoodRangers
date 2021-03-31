<template>
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Items</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <form >
            <label for="name"><b>Food Item: </b></label>
            <input
              type="text"
              placeholder="Enter food"
              name="food"
              v-model="foodname"
              required
            />
            <br />

            <input
              @click="click1"
              type="file"
              accept="image/*"
              @change="previewImage"
              id="file-input"
            />
            <br />

            <div v-if="img != null">
              
              <img class="preview" height="200" width="200" :src="img" />
              <br />
            </div>


            <label for="text"><b> Category: </b></label>

            <select v-model="category">
              <option value="meat">Meat</option>
              <option value="dairy">Dairy</option>
              <option value="fish">Fish</option>
              <option value="poultry">Poultry</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
            </select>

            <label for="text"> <b>Item Details</b></label>
            <h1>
              Select <b>Opened / No Expiry Date</b> to get the estimated expiry
              date <br />Select <b>Unopened / Have Expiry Date</b> to key in
              your expiry date!
            </h1>
            <select v-model="state" required>
              <option value="Opened">Opened / No Expiry Date</option>
              <option value="Unopened">Unopened / Have Expiry Date</option>
            </select>

            <p v-if="state == 'Opened'">
              <label for="text">
                <b>Predicted Expiry Date: </b>
                {{ this.getPredDate().format("DD-MM-YYYY") }}
              </label>
            </p>
            <p v-if="state == 'Unopened'">
              <label><b>Expiry Date: </b></label>
              <input type="date" v-model="expirydate" required />
            </p>

            <label for="text"> <b>Amount saved ($):</b></label>
            <input type="text" value="$" v-model="money" placeholder = "$" required/>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
           v-on:click="addItem"
          >
            Add
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import moment from "moment";

export default {
  data() {
    return {
      dict: {},
      foodname: "",
      img: null,
      category: "",
      state: "",
      expirydate: "",
      money: "",
      numDay: 0,
    };
  },

  methods: {
    addItem() {
      this.dict["name"] = this.foodname;
      this.dict["category"] = this.category;
      this.dict["state"] = this.state;
      this.dict["expiry"] = moment(this.expirydate).format("DD-MM-YYYY");
      this.dict["img"] = this.img;
      this.dict["saved"] = this.money;
      db.collection("items")
        .add(this.dict)
        .then(() => {
          location.reload();
        });
      console.log(this.dict);

      this.img = null;
    },

    getPredDate() {
      var chosenCat = this.category;
      db.collection("perishable")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var food = doc.data();
            this.numDay = food[chosenCat];
          });
        });
      // alert(this.numDay);

      this.expirydate = moment().add(this.numDay, "days");
      return this.expirydate;
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(e) {
      const file = e.target.files[0];
      this.img = URL.createObjectURL(file);
    
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 11.5px;
}
label {
  width: 200px;
  display: flex;
  flex-flow: row wrap;
  align-items: left;
}

input,
select {
  width: 100%;
  padding: 11px;
  margin: 2px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  color: black;
}


</style>