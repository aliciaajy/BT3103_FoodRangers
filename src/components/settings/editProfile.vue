<template>
  <div id="aboutMe" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Profile</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <form novalidate @submit.prevent="update">
            
            <div class="form-group">
              <label for="name">Name: </label>
              <input
                type="text"
                name="name"
                v-model="name"
                class="form-control form-control-sm"
              />
            </div>
            <div class="mb-3">
              <label for="formFileSm" class="form-label">Profile Picture</label>
              <input 
                @click="click1"
                type="file"
                accept="image/*"
                @change="previewImage"
                class="form-control form-control-sm" 
                id="formFileSm"
              />
            </div>
            <div v-if="profile_pic != null">
              <img class="preview" height="200" width="200" :src="profile_pic" />
            </div>

            <div class="form-group">
              <label for="gender">Gender:</label>
                <select v-model="gender" class="form-control form-control-sm">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
            </div>
            <div class="form-group">
              <label> Date Of Birth: </label>
              <input type="date" class="form-control form-control-sm" v-model="dob"/>
            </div>  

            <div class="form-group">
              <label for="hp"> Phone Number: </label>
              <input
                type="text"
                name="hp"
                class="form-control form-control-sm"
                v-model="hp"
              />
            </div>
            <div>
              <button
                class="formButton btn btn-dark btn-block"
                type="submit"
                v-on:click="update()"
              > Update </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../firebase.js";
import firebase from "firebase";
export default {
  data() {
    return {
      name: "",
      gender: "",
      hp: "",
      dob: "",
      imageData: null,
      profile_pic: "",
      imgurl: "",
      email: "",
    }
  },
  methods: {
    fetchPlaceholder() {
      database
        .collection("users")
        .get()
        .then(snapshot => { 
          snapshot.docs.forEach(doc => {
            if (doc.id == firebase.auth().currentUser.uid) {
              var info = doc.data();
              this.name = info.name;
              this.gender = info.gender;
              this.hp = info.hp;
              this.dob = info.dob;
              this.email = info.Email;
              this.profile_pic = info.profile_pic;
            }
          })
        })
    },
    update() {
      var copy = {};
      copy["name"] = this.name;
      copy["gender"] = this.gender;
      copy["dob"] = this.dob;
      copy["profile_pic"] = this.imgurl;
      copy["hp"] = this.hp;
      copy["Email"] = this.email;
      database.collection('users').doc(firebase.auth().currentUser.uid).update(copy)
        .then(() => {
          location.reload();
        });
    },
    click1() {
      this.$refs.input1.click();
    },

    previewImage(e) {
      this.uploadValue = 0;
      this.imgurl = null;
      var file = e.target.files[0];
      this.imageData = e.target.files[0];
      this.profile_pic = URL.createObjectURL(file);
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
  created() {
    this.fetchPlaceholder();
  },
  beforeUpdated() {
    this.update();
  }
}
</script>

<style scoped>
</style>