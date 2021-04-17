<template>
  <div>
    <Bar></Bar>
    
    <h1>
      Welcome Back,
      {{this.name}}
      <h2 id ="annword">  Announcement </h2>
    </h1>
    <Notes></Notes>
    <Annoucement id="announcements"></Annoucement>
  </div>

</template>


<script>

import Annoucement from './Announcement.vue';
import Notes from './Notes.vue';
import db from "../../firebase"
import firebase from "firebase";

export default {
  components: {
    Annoucement,
    Notes
  },
  data() {
    return {
      name: "",
    }
  },
  methods: {
    fetchName() {
      db.collection("users").get().then(snapshot => { 
          snapshot.docs.forEach(doc => {
            if (doc.id == firebase.auth().currentUser.uid) {
              this.name = doc.data()["name"];
            }
          })
      })
    }
  },
  created() {
    this.fetchName();
  }
};

</script>

<style scoped>
h1 {
  text-align:left;
  padding: 20px;
}

#announcements {
  margin-right: 20px;
}

#annword {
    float:right;
    width:36%;
    height: 40px;
    background: rgba(10, 11, 94, 0.603);
    color: white;
    text-align: center;
    border-radius: 10px;
}
</style>