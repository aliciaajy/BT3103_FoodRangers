<template>
  <div>
    <div id="notes">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <!-- <div>
              <h4 >Reminders</h4>
              <h3>Total tasks: {{ notes.length }}</h3>
              <div class="form">
                <div class="form-group">
                  <label>Note Title</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="note.title"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Note Text</label>
                  <textarea
                    rows="3"
                    class="form-control"
                    v-model="note.text"
                    required
                  ></textarea>
                </div>
                <button class="btn btn-primary" @click="addNote">
                  Save Note
                </button>
                <div
                  class="alert alert-danger text-center"
                  role="alert"
                  v-bind:class="{ active: isActive }"
                >
                  All fields are Required
                </div>
              </div> -->
              <div class="row">
                <div class="col-sm-6 note" v-for="(note, index) in notes" :key=index> 
                  <div class="card">
                    <button class="close" @click="removeNote(index)">
                      &times;
                    </button>
                    <div class="card-block">
                      <h4 class="card-title">{{ note.title }}</h4>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {{ note.date }}
                      </h6>
                      <p class="card-text">{{ note.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
                          <div>
              <h4 >Reminders</h4>
              <h3>Total tasks: {{ notes.length }}</h3>
              <div class="form">
                <div class="form-group">
                  <label>Note Title</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="note.title"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>Note Text</label>
                  <textarea
                    rows="3"
                    class="form-control"
                    v-model="note.text"
                    required
                  ></textarea>
                </div>
                <button class="btn btn-primary" @click="addNote">
                  Save Note
                </button>
                <div
                  class="alert alert-danger text-center"
                  role="alert"
                  v-bind:class="{ active: isActive }"
                >
                  All fields are Required
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { methods } from 'underscore';
export default {
  data() {
    return {
    isActive: false,
    title: "Notepad",
    subtitle: "Using Vue JS",
    note: {
      title: "",
      text: "",
    },
    notes: [
      {
        title: "Example Note",
        text: "Here is a nice little example note :)",
        date: new Date(Date.now()).toLocaleString(),
      },
      {
        title: "Another Note",
        text: "Time for another, this makes 2 of us!",
        date: new Date(Date.now()).toLocaleString(),
      },
    ],
    }
  },
  methods: {
    addNote() {
      let { text, title } = this.note;

      if (this.note.text.length > 1 && this.note.title.length > 1) {
        this.notes.push({
          text,
          title,
          date: new Date(Date.now()).toLocaleString(),
        });
        this.isActive = false;
        this.note.text = "";
        this.note.title = "";
      } else {
        this.isActive = true;
      }
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },

    //     fetchItems: function () {
    //   db.collection("userNotes")
    //     .where("userid", "==", firebase.auth().currentUser.uid)
    //     .get()
    //     .then((querySnapShot) => {
    //       // let item = {};
    //       querySnapShot.forEach((doc) => {
    //         let id = doc.id;
    //         let item_dict = doc.data();
    //         this.notes.push([id, item_dict]);
    //       });
    //     });
    // },

    // addNote() {
    //   if (this.note.text.length > 1 && this.note.title.length > 1) {
    //     this.dict["title"] = this.title;
    //     this.dict["text"] = this.text;
    //     this.dict["date"] = new Date(Date.now()).toLocaleString();
    //     this.dict["userid"] = firebase.auth().currentUser.uid;
    //     db.collection("userNotes")
    //       .add(this.dict)
    //       .then(() => {
    //         location.reload();
    //       });
    //     this.isActive = false;
    //   } else {
    //     this.isActive = true;
    //   }
    // },
    // removeNote(event) {
    //   let doc_id = event.target.getAttribute("id");
    //   db.collection("userNotes")
    //     .doc(doc_id)
    //     .delete()
    //     .then(() => {
    //       location.reload();
    //     });
    // },
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
}
body {
  font-size: 14px;
  min-width: 300px;
  font-family: "Ubuntu", sans-serif;
  background: #f3f3f3;
  margin: 0;
  -webkit-user-select: none;
  user-select: none;
  padding: 70px 30px 0px 30px;
  font-weight: 100;
}
.card {
  margin: 20px 0;
  background: #ffffff;
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