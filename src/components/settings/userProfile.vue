<template>
  <div>
    <v-btn flat outline v-if = "! isEdit" @ click = "edit">Edit profile</v-btn>
    <v-btn flat outline v-if = "isEdit" @ click = "update" v-bind:disabled = "noChange">Update</v-btn>
    <v-btn flat outline v-if = "isEdit" @ click = "cancel">Cancel</v-btn>
    <v-layout align-center>
      <v-flex xs3><v-subheader>name</v-subheader></v-flex>
      <v-flex xs9 v-if = "! isEdit">{{currentUser.onamae}}</v-flex>
      <v-flex xs9 v-if = "isEdit">
       <v-text-field v-model = "currentUser.onamae"></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from "../../firebase.js";
export default {
  data () {
    return {
      isEdit: false,
      updated: false,
    }
  },
  methods: {
    edit () {
      this.isEdit = true;
      this.updated = false;
    },
    update () {
      this.newUserData = {
        onamae: this.currentUser.onamae,
      };
      this.currentUserEmail = firebase.auth (). currentUser.email;// Get email address of logged-in user
      var currentUserDoc = db.collection ('users'). doc (this.currentUserEmail);// Substitute logged-in user's document
      currentUserDoc.update (this.newUserData)
      .then (function (docRef) {
          console.log ("Document written with ID:", docRef);
          location.reload ();// reload page
      })
      .catch (function (error) {
          console.error ("Error adding document:", error);
      });
    },
    cancel () {
      this.isEdit = false;
      this. $store.commit ('setUser', this.oldUserData);
    },
  },
  computed: {
    changes: function () {
      const changes = [];
      const orig = this.oldUserData;
      const dest = this.currentUser;
      Object.keys(orig).forEach(function (key) {
        if (orig[key] != dest[key]) {
          changes.push ({name: key});
        }
      });
      return changes;
    },
    noChange: function () {
    // Activate the refresh button only when some information changes from the original.
      return! (this.isEdit && this.changes.length>0);
    },
    currentUser: {
      get: function () {
        return this. $store.getters.currentUser;
      },
      set: function (newValue) {
        // Save to store
        return newValue;
      }
    },
    oldUserData () {
      return this. $store.getters.oldUserData;
    },
  }
}