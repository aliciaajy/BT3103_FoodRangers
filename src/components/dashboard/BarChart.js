import { Bar } from 'vue-chartjs'
import firebase from "firebase"
import db from '../../firebase.js'
export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Consumed",
                backgroundColor: "#3e95cd",
                //data: [0,0,0,0,0,]
                data: new Array(12).fill(0)
              }, {
                label: "Unconsumed",
                backgroundColor: "#8e5ea2",
                data: new Array(12).fill(0)
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: false,
              text: 'Predicted world population (millions) in 2050'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },

  methods: {
    fetchItems: function() {
      let userId = firebase.auth().currentUser.uid;
      //alert("fetch");

      db.collection("consumeItems").doc(userId).get().then((doc) => {
        let data = doc.data();
        

        for (var i = 0; i< 12; i++) {
          let month = "" + (i+1);
          //alert("inner loop");


          if ((month in data)) {
            //alert("month is " + month);

            let consumed = this.datacollection.datasets[0].data;
            let unConsumed = this.datacollection.datasets[1].data;
            //alert("key exists")
            //alert("consumed[i] before is " + unConsumed);

            let numConsumed = data[month].consumed.length;
          //alert("numConsumed " + numConsumed);
 
          let numUnconsumed = data[month].unConsumed.length;
          //alert("numUnConsumed " + numUnconsumed);
            unConsumed[i] += numUnconsumed;
            //alert("numConsumed is " + data[month].consumed.length + " and month is " + month)
            //alert("consumed[i] before is " + consumed)
            consumed[i] += numConsumed - 1;
            

            //alert("consumed[i] after is " + consumed[i])
          }
        }
        this.renderChart(this.datacollection, this.options);
      })

    
  }

  //methods end here
  },


  created() {
    this.fetchItems();
  }
}

  
