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
          <form novalidate @submit.prevent="addItem">
            <div>
              <label for="name"><b>Food Item*: </b></label>
              <input
                type="text"
                placeholder="Enter food"
                name="food"
                v-model="foodname"
                required="true"
              />
              <br />
            </div>

            <div>
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
            </div>

            <div>
              <label for="text"><b> Category*: </b></label>

              <select v-model="category">
                <option value="meat">Meat</option>
                <option value="dairy">Dairy</option>
                <option value="fish">Fish</option>
                <option value="poultry">Poultry</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
              </select>
            </div>

            <div>
              <label for="text"> <b>Item Details*:</b></label>
              <h1>
                Select <b>Opened / No Expiry Date</b> to get the estimated
                expiry date <br />Select <b>Unopened / Have Expiry Date</b> to
                key in your expiry date!
              </h1>
              <select v-model="state" required="true">
                <option value="Opened">Opened / No Expiry Date</option>
                <option value="Unopened">Unopened / Have Expiry Date</option>
              </select>

              <p v-if="state == 'Opened'">
                <label for="text">
                  <b>Predicted Expiry Date: </b>
                  {{ this.getPredDate() }}
                </label>
              </p>
              <p v-if="state == 'Unopened'">
                <label><b>Expiry Date*: </b></label>
                <input type="date" v-model="expirydate" required="true" />
              </p>
            </div>

            <div>
              <label for="text"> <b>Amount saved ($)*:</b></label>
              <input type="text" value="$" v-model="money" placeholder="$" />
            </div>

            <div>
              <button
                class="formButton"
                :disabled="!isFormValid"
                type="submit"
                data-dismiss="modal"
                v-on:click="addItem"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js";
import moment from "moment";
import firebase from "firebase";

export default {
  data() {
    return {
      dict: {},
      foodname: "",
      imageData: null,
      img: null,
      imgurl: "",
      category: "",
      state: "",
      expirydate: "",
      money: "",
      numDay: 0,
    };
  },

  computed: {
    isFormValid() {
      return (
        this.foodname &&
        this.category &&
        this.state &&
        this.expirydate &&
        this.money
      );
    },
  },

  methods: {
    addItem() {
      if (!this.isFormValid) return;
      this.dict["name"] = this.foodname;
      this.dict["category"] = this.category;
      this.dict["state"] = this.state;
      this.dict["expiry"] = moment(this.expirydate).format("DD-MM-YYYY");
      this.dict["img"] = this.imgurl;
      this.dict["saved"] = this.money;
      this.dict["keyin-date"] = moment().format("DD-MM-YYYY");
      this.dict["userid"] = firebase.auth().currentUser.uid;
      db.collection("items")
        .add(this.dict)
        .then(() => {
          location.reload();
        });
      console.log(this.dict);
    },

    getPredDate() {
      var chosenCat = this.category;
      db.collection("openedFood")
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            var food = doc.data();
            this.numDay = food[chosenCat];
          });
        });

      var someDate = new Date();

      someDate.setDate(someDate.getDate() + parseInt(this.numDay));

      var dd = someDate.getDate();
      
      var mm = someDate.getMonth() + 1;
    
      var y = someDate.getFullYear();

      var someFormattedDate = dd + "-" + mm + "-" + y;
      this.expirydate = someFormattedDate
      // alert(this.expirydate);
      // this.expirydate = new Date().add(this.numDay, "days");
      return this.expirydate;
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(e) {
      this.uploadValue = 0;
      this.imgurl = null;
      var file = e.target.files[0];
      this.imageData = e.target.files[0];
      this.img = URL.createObjectURL(file);
      this.onUpload();
    },

    onUpload() {
      this.imgurl = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.imgurl = url;
            console.log(this.imgurl);
          });
        }
      );
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

.formButton {
  padding: 5px 20px;
  background-color: lightblue;
  border-radius: 10px;
}

button:disabled {
  background-color: lightgrey;
  color: white;
  cursor: not-allowed;
}
</style>