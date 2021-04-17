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
              <label for="name"><b>Sales Item*: </b></label>
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
                <option value="Frozen">Frozen</option>
                <option value="Snacks">Snacks</option>
                <option value="Staples">Staples</option>
              </select>
            </div>

            <div>
              <label><b>Expiry Date*: </b></label>
              <input type="date" v-model="expirydate" required="true" />
            </div>

            <div>
              <label><b> Quantity Left*: </b></label>
              <input type="number" v-model="qty" required="true" />
            </div>

            <div>
              <label for="text"> <b>Original Price*:</b></label>
              <input type="text" value="$" v-model="oldprice" placeholder="$" />
            </div>

            <div>
              <label for="text"> <b>New Price*:</b></label>
              <input type="text" value="$" v-model="newprice" placeholder="$" />
            </div>

            <div>
              <button
                class="class=button btn btn-info btn-lg"
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
      expirydate: "",
      qty:"",
      newprice: "",
      oldprice:"",
    
    };
  },

  computed: {
    isFormValid() {
      return (
        this.foodname &&
        this.category &&
        this.expirydate &&
        this.newprice &&
        this.oldprice &&
        this.qty 
        
      );
    },
  },

  methods: {
    addItem() {
      if (!this.isFormValid) return;
      this.dict["name"] = this.foodname;
      this.dict["category"] = this.category;
      this.dict["qty"] = this.qty;
      this.dict["expiry"] = moment(this.expirydate).format("DD-MM-YYYY");
      this.dict["img"] = this.imgurl;
      this.dict["newprice"] = this.newprice;
      this.dict["oldprice"] = moment().format("DD-MM-YYYY");
     
      db.collection("apiMart")
        .doc("B02008E000")
        .update({items: this.dict}) //not sure if its update because we need add item to the list 
        .then(() => {
          location.reload();
        });
      console.log(this.dict);
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
  padding: 10px 20px;
  background-color: lightblue;
  border-radius: 10px;
  height: 40px;
  padding: 3px;
}

button:disabled {
  background-color: lightgrey;
  color: white;
  cursor: not-allowed;
}
</style>