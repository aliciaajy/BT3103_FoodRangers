import db from "../../firebase.js";
import axios from 'axios';

export default {
  methods: {
		//change to lowercase except first letter
    formatString: function(str) {
      return str.replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
      .replace(/^[^ ]/g, match => (match.toUpperCase()));
    },


    addAPI: function() {
      alert("addAPI")
      axios.get("https://data.gov.sg/api/action/datastore_search?resource_id=3561a136-4ee4-4029-a5cd-ddf591cce643")
        .then(response => {
          //alert(response.data.help)
          //alert(response.data.result)
          let result = {}
          result = response.data.result;
          result.records.forEach(martData => { 

                let postal = {};
                postal = martData["postal_code"]

                //alert("doc is " + martData["premise_address"]);


                let address = "";
                if (martData["block_house_num"] != "na") {
                  address += martData["block_house_num"];
                }

                if (martData["street_name"] != "na") {
                  address += " " + martData["street_name"];
                }
                address = this.formatString(address);

                if (martData["level_num"] != "na" || martData["unit_num"] != "0") {
                  var level = "";
                  if (martData["level_num"].length == 1) {
                    level += "0"
                  }

                  level += martData["level_num"]

                  var unit = "";

                  if (martData["unit_num"].length == 1) {
                    unit += "0"
                  }

                  unit += martData["unit_num"]
                  
                    address += ", #" + level + "-" + unit;
                }
                if (martData["building_name"] != "na") {
                  address += this.formatString(" " + martData["building_name"]);
                }

                address += ", Singapore " + postal;

                //address = this.formatString(address);
                


                let name = {};
                name = martData["licensee_name"] + " - " + martData["street_name"]
                name = this.formatString(name);


                var id = {};
                id = martData["licence_num"];
                //alert(id);

                let pos = {lang: "0", long: "0"};

                let licensee_name = {};
                licensee_name = martData["licensee_name"]
                licensee_name = this.formatString(licensee_name);

                let ratings = "NA";

                db.collection('apiMart').doc(id).set({
                  name: name,
                  address: address,
                  postal: postal,
                  position: pos,
                  licence: licensee_name,
                  reviews: {},
                  userid: [],
                  type: [],
                  image: "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-4.jpg",
                  ratings: ratings,
                  });

               /* db.collection('apiMart').doc(id).set({
                  "ratings": "0"
                })*/


                this.findPos(id, postal);
                this.typeMarts(id, licensee_name);
                this.imageMarts(id, licensee_name);

                this.ratingMarts(id, licensee_name);


            })

        })

    },

    findPos: function(id, postal) {
      //alert("findpos");
      let query = {};

      query = "https://developers.onemap.sg/commonapi/search?searchVal=" + postal 
      + "&returnGeom=Y&getAddrDetails=Y"
      
      //alert("query is " + query);

      axios.get(query)
        .then(response => {
          let res = {};
          res = response.data.results[0];
          //alert("response lat: " + res["LATITUDE"]);
          let pos = {};

          
          pos["lat"] = parseFloat(res["LATITUDE"]);
          pos["lng"] = parseFloat(res["LONGITUDE"]);
          //posRes.push(pos);
          //alert("pos in loop is " + pos["lang"]);
          db.collection('apiMart').doc(id).update({
            "position": pos
          })


          //pos = {lang: res["LATITUDE"], long: res["LONGITUDE"]}
        })
        //alert("pos is " + pos["lang"]);
    },

    typeMarts: function(id, license) {

      let type1 = "Bring Your Own Bag";
      let type2 = "Discount - Food Expiring Soon";
      let type3 = "Discount - Ugly Produce";

      let lowerLicense = license.toLowerCase();
      if (lowerLicense.includes("ntuc")) {
        db.collection("apiMart").doc(id).update({
        type: [type1, type2, type3]
      })
      } else if (lowerLicense.includes("sheng siong")) {
        db.collection("apiMart").doc(id).update({
        type: [type1, type2]
      })
      } else if (lowerLicense.includes("cold storage")) {
        db.collection("apiMart").doc(id).update({
        type: [type1]
      })
      } else {
        db.collection("apiMart").doc(id).update({
            type: [""]
        })
      }
    },

    imageMarts: function(id, license) {
      //let noImg = "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-4.jpg";
      let ntucImg = "https://www.moneydigest.sg/wp-content/uploads/2017/10/fairprice-2.png";
      let shengImg = "https://insideretail.asia/wp-content/uploads/2020/09/Sheng-Siong-supermarket.jpg";
      let coldImg = "https://leisurepark.com.sg/wp-content/uploads/2017/09/Cold-Storage-gallery.jpg"

      let lowerLicense = license.toLowerCase();
      if (lowerLicense.includes("ntuc")) {
        db.collection("apiMart").doc(id).update({
        image: ntucImg
      })
      } else if (lowerLicense.includes("sheng siong")) {
        db.collection("apiMart").doc(id).update({
        image: shengImg
      })
      } else if (lowerLicense.includes("cold storage")) {
        db.collection("apiMart").doc(id).update({
        image: coldImg
      })
      } 

    },

    ratingMarts: function(id, license) {
      //alert("ratings")
      let ntucRat = "4.1";
      let shengRat = "3.5";
      let coldRat = "3.8";

      let lowerLicense = license.toLowerCase();
      if (lowerLicense.includes("ntuc")) {
        db.collection("apiMart").doc(id).update({
        ratings: ntucRat
      })
      } else if (lowerLicense.includes("sheng siong")) {
        db.collection("apiMart").doc(id).update({
        ratings: shengRat
      })
      } else if (lowerLicense.includes("cold storage")) {
        db.collection("apiMart").doc(id).update({
        ratings: coldRat
      })
      } 
    },

    martDetails: function() {

    }
      
      //methods end here
	},

  beforeCreate() {
    this.addAPI();
  },

  created() {
    //this.addAPI();

  }
}