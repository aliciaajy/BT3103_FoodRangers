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

                //alert("doc is " + martData["premise_address"]);


                let address = "";
                if (martData["block_house_num"] != "na") {
                  address += martData["block_house_num"];
                }

                if (martData["street_name"] != "na") {
                  address += " " + martData["street_name"];
                }


                if (martData["building_name"] != "na") {
                  address += " " + martData["building_name"];
                }

                address = this.formatString(address);
                

                let postal = {};
                postal = martData["postal_code"]

                let name = {};
                name = martData["licensee_name"] + " - " + martData["street_name"]
                name = this.formatString(name);


                var id = {};
                id = martData["licence_num"];
                //alert(id);

                let pos = {lang: "0", long: "0"};



                db.collection('apiMart').doc(id).set({
                  name: name,
                  address: address,
                  postal: postal,
                  position: pos
                  });

                this.findPos(id, postal);


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

          
          pos["lang"] = parseFloat(res["LATITUDE"]);
          pos["long"] = parseFloat(res["LONGITUDE"]);
          //posRes.push(pos);
          //alert("pos in loop is " + pos["lang"]);
          db.collection('apiMart').doc(id).update({
            "position": pos
          })


          //pos = {lang: res["LATITUDE"], long: res["LONGITUDE"]}
        })
        //alert("pos is " + pos["lang"]);
      },
      //methods end here
	},

  created() {
    this.addAPI();
  }
}