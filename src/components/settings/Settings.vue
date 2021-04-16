<template>
  <div>
    <Bar></Bar>
    <div id="left">
      <h1><br><br>About Me</h1>
      <br>
      <p>
        Name: 
        <input class="form-control" type="text" v-bind:placeholder="this.name" disabled>
      </p>
      <p>
        Gender: 
        <input class="form-control" type="text" v-bind:placeholder="this.gender" disabled> 
      </p>          
      <p>
        Phone: 
        <input class="form-control" type="text" v-bind:placeholder="this.hp" disabled> 
      </p> 
      <p>
        Date of Birth: 
        <input class="form-control" type="text" v-bind:placeholder="this.dob" disabled> 
      </p>
      <p>
        Email:
        <input class="form-control" type="text" v-bind:placeholder="this.email" disabled>
      </p>
    </div>
    <div id="right">
      <div id="pp-name">
        <img id="profile_pic" :src="this.profile_pic" />
        <br>
        <h3>{{ this.name }}</h3>
      </div>
      <br>
      <button class="btn btn-secondary" data-toggle="modal" data-target="#aboutMe">Edit Profile</button>
      <editProfile></editProfile>
    </div>
  </div>
</template>

<script>
import database from "../../firebase";
import firebase from "firebase";
import moment from "moment";
import editProfile from "./editProfile.vue";
export default {
  data() {
    return {
      name: "",
      gender: "",
      hp: "",
      dob: "",
      email: "",
      profile_pic: "",
    };
  },
  components: {
    editProfile,
  },
  methods: {
    getInfo() {
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
              this.dob = moment(info.dob).format("DD-MM-YYYY");
              this.email = info.Email;
              this.profile_pic = info.profile_pic;
              this.events_raw = info.events;
            }
          });
        });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
p {
  text-align: left;
}

#left {
  float: left;
  width: 30%;
  height: 100%;
  margin: 0px 10%;
}
#right {
  float: right; 
  width: 50%;
  margin-top: 5%;
}
#profile_pic {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 500px;
  background-color: white;
  box-shadow: 0 0 8px 3px #b8b8b8;
  margin: 20px;
}
#pp-name {
  float: left;
}

</style>