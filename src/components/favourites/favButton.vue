<template>


  <button id="like" v-on:click="deleteMart()" :class="['heart-btn', {liked: this.likeToggle}]"> 
     <svg class="heart heart-icon" viewBox="0 0 32 29.6">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg> 
</button>
</template>



<script>
  import db from "../../firebase.js";
  import firebase from "firebase";
  export default {
    data() {
      return {
        //all the marts in fav are liked 
        likeToggle: true,
      }
    },
    props: {
      mart: {
        
      }
    },
    methods: {
      setToggle: function() {
        if (this.likeToggle == false) {
          this.likeToggle = true;
        } else {
          //if likeToggle = true, set to false
          this.likeToggle = false;
        }
      },
      deleteMart: function() {
          let doc_id = this.mart[0];
          let id = firebase.auth().currentUser.uid;
          //alert("doc id is " + doc_id);
          //alert("deleted");
           db.collection('favMart').doc(id).set({favMarts: firebase.firestore.FieldValue.arrayRemove(doc_id)}, {merge: true}).then( () => {location.reload()});
         // db.collection('favMart').doc(doc_id).delete();
        },
      

      //methods end here
      },
      components: {
      },
      

    }
  </script>

<style scoped>
  :focus {
  outline: #08f auto 2px;
}

body.using-mouse :focus {
  outline: none;
}

#app {
  padding: 0;
  text-align: center;

}
.heart {
  width: 30px;
  fill: gray;
  transition: fill 0.5s, transform 0.5s;
  pointer-events: none;
}
.heart-btn {
  position: relative;
  background: transparent;
  border-radius: 50%;
  background-color: white;
  padding: 15px 15px 15px 15px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25), 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border: 0;
}
.heart-btn.liked .heart {
  fill: #ee3529;
}
.heart-btn.liked .heart-icon {
  transform: scale(1.2);
}
.heart-btn.liked .heart-pop {
  animation-direction: normal;
}
.heart-btn:active {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

</style>