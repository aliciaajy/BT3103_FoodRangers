import db from "../../firebase.js";
//import axios from 'axios';

export default {
  methods: {
		//change to lowercase except first letter
    formatString: function(str) {
      return str.replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
      .replace(/^[^ ]/g, match => (match.toUpperCase()));
    },


    uniqueMarts: function() {
      let licenceArr = [];

      db.collection("apiMart").get().then((querySnapShot)=>{
        querySnapShot.forEach(doc=>{
          let data = {};

          let licence = "";
          data = doc.data();
          //alert("data is " + data);
          //id = doc.id;

          licence = data.licence;

          if (!licenceArr.includes(licence)) {
            licenceArr.push(licence);

            db.collection("martDetails").doc(licence).set({
              type: {}
            })

            this.typeLicence(licence);
          }
        }) 

      })
      //alert("licence are " + licenceArr);
      return licenceArr;

    },
    //specify type of marts for the big supermarkets, eg. bring your own bag
    //sheng siong, ntuc, cold storage
    typeLicence: function(licence) {
      let type1 = "Bring Your Own Bag";
      let type2 = "Discount - Food Expiring Soon";
      let type3 = "Discount - Ugly Produce";

      let lowerLicence = licence.toLowerCase();
      if (lowerLicence.includes("ntuc")) {
        db.collection("martDetails").doc(licence).update({
        type: [type1, type2, type3]
      })
      } else if (lowerLicence.includes("sheng siong")) {
        db.collection("martDetails").doc(licence).update({
        type: [type1, type2]
      })
      } else if (lowerLicence.includes("cold storage")) {
        db.collection("martDetails").doc(licence).update({
        type: [type1]
      })
      }
      
      
    },

    typeMarts: function() {
      db.collection("martDetails").get().then((querySnapShot)=>{
        querySnapShot.forEach(doc=>{
          let data = {};

          //let licence = "";
          data = doc.data();
          let id = doc.id;

          db.collection("apiMart").doc(id).update({
            type: data.type,
          })

        })
      });
    },

      //methods end here
	},

  beforeMount() {
    this.uniqueMarts();
  },

  created() {
    this.typeMarts();
  }
}