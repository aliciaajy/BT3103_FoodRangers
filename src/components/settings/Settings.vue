<template>
  <div>
    <Bar></Bar>
    <div id="left">
      <div id="information">
        <div style="float: left">
          <h1><br><br>About Me</h1>
          <br />
          <p>Name: {{ info.name }}</p>
          <br />
          <p>Gender: {{ info.gender }}</p>
          <br />
          <p>Phone: {{ info.phone }}</p>
          <br />
          <p>Date of birth:{{ info.dob }}</p>
          <br />
          <p>Account:{{ info.acc }}</p>
          <br />
          
        </div>
        <div
          style="
            float: right;
            margin-top: 50px;
            display: flex;
            flex-direction: column;
          "
        >
          <img id="profile_pic" :src="info.profile_pic" />
          <br />
          <h2 style="margin-left: -130px">{{ info.name }}</h2>
        </div>

  
      </div>
    </div>
  </div>
</template>

<script>
import database from "../../firebase";
// import firebase from "firebase"
export default {
  data() {
    return {
      info: {
        name: "",
        gender: "",
        phone: "",
        dob: "",
        acc: "",
        profile_pic: "",
      },
    };
  },
  methods: {
    getInfo() {
      var username = localStorage.getItem("username");
      database
        .collection("accounts")
        .doc(username)
        .get()
        .then((doc) => {
          var info = doc.data();
          this.info.name = info.name;
          this.info.gender = info.gender;
          this.info.phone = info.contact;
          this.info.dob = info.dob;
          this.info.acc = username;
          this.events_raw = info.events;
          this.info.profile_pic = info.profile_pic_url;
        });
    },
  },
  mounted() {
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
  width: 60%;
  text-align: justify;
  height: 100%;
  margin-left: 10%;
  margin-right: 20%;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
button {
  background-color: #4caf50; /* Green */
  border: double;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
#profile_pic {
  height: 200px;
  width: 200px;
  overflow: hidden;
  border-radius: 500px;
  justify-content: center;
  background-color: white;
  color: cornflowerblue;
  box-shadow: 0 0 8px 3px #b8b8b8;
  display: flex !important;
  align-items: center;
  margin: -10px 0px 0px -180px;
}
.cropped img {
  margin: -10px 0px 0px -180px;
}
</style>