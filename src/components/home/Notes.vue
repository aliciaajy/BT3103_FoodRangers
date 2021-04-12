<template>
  <div>
    <div id="notes">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <ul>
              <div class="row">
                <li class="col-sm-6 note" v-for="note in this.reminders" :key="note.id"> 
                  <div class="card">
                    <button class="close"
                    v-bind:id="note[0]"
                    @click="removeNote($event)">
                      &times;
                    </button>
                    <div class="card-block">
                      <h4 class="card-title">{{ note[1].title }}</h4>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {{ note[1].date }}
                      </h6>
                      <p class="card-text">{{ note[1].text }}</p>
                    </div>
                    </div>
                    </li>
                    </div>
                  </ul>
                </div>
              </div>
            
              
              <div>
              <h4 > Add a Reminder</h4>
              <h3>Total reminders: {{ this.reminders.length }}</h3>
              <div class="form">
                <div class="form-group">
                  <label>Title</label>
                  <input
                    class="form-control"
                    type="text"
                    name="title"
                    v-model="title"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Reminder</label>
                  <textarea
                    rows="3"
                    class="form-control"
                    v-model="text"
                    required
                  ></textarea>
                </div>
                <button class="btn btn-primary" @click="addNote" :disabled="!isFormValid">
                  Save Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import db from "../../firebase.js";
import firebase from "firebase";

export default {
  data() {
    return {
    title: "",
    text: "",
    notes: {},
    reminders: [],
    }
  },

  computed: {
    isFormValid() {
      return this.title && this.text; 
    }
  },

  methods: {
    fetchItems: function () {
      db.collection("userNotes")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            let id = doc.id;
            let notes_dict = doc.data();
            this.reminders.push([id, notes_dict]);
        });
        });
    },
     
    addNote() {
      if (this.text.length > 1 && this.title.length > 1) {
        this.notes["title"] = this.title;
        this.notes["text"] = this.text;
        this.notes["date"] = new Date(Date.now()).toLocaleString();
        this.notes["userid"] = firebase.auth().currentUser.uid;
        db.collection("userNotes")
          .add(this.notes)
          .then(() => {
            location.reload();
          });
      }
    },
    
    removeNote(event) {
      let doc_id = event.target.getAttribute("id");
      db.collection("userNotes")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
      });
    },
  },

  
  
  created() {
    this.fetchItems();
  },

};
</script>

<style scoped>
.remind {
  float: left
}
#notes {
  float:left;
  width:800px;
  padding:20px;

}
body {
  font-size: 14px;
  min-width: 300px;
  font: helvetica;
  background: #f3f3f3;
  margin: 0;
  -webkit-user-select: none;
  user-select: none;
  padding: 70px 30px 0px 30px;
  font-weight: 100;
}
.card { 
  margin: 20px 0;
  background:#f5e8b1;
  border: 10px;
  padding: 20px;
}
button.btn {
  display: block;
  padding: 15px 20px;
  font-family: "Ubuntu", sans-serif;
  margin: 15px 0px;
  width: 100%;
  box-shadow: 0px 1px 3px rgb(217, 217, 217);
  border: none;
  border-radius: 2px;
}
h1 {
  text-align: center;
  margin: 15px 0px;
}
h2 {
  text-align: center;
  margin: 15px 0px;
  color: #b5b5b5;
}
h3 {
  text-align: center;
  font-size: 14px;
  margin: 30px 0px 30px 0px;
  color: #b5b5b5;
}
h4.card-title {
  margin: 5px 0px 15px 0px;
}
p.card-text {
  margin: 25px 0px 0px 0px;
}
.card {
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgb(217, 217, 217);
}
.alert {
  display: none;
}
.active {
  display: block;
}
.col-sm-12 > div {
  max-width: 600px;
  margin: 0px auto;
}
</style> 