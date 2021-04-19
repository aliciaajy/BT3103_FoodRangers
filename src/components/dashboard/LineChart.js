import { Line } from "vue-chartjs";
import db from '../../firebase.js'
import moment from "moment";
import firebase from "firebase"
export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Amount saved ($)",
          data: []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            backgroundColor: "#A6EDF0",
            borderColor: "#75CCF1",
            borderWidth: 4,
          },
          point: {
            backgroundColor: "#5DB1D1",
            radius: 5,
          }
        }
      }
    }
  },
  methods: {
    fetchItems: function() {
      db.collection('items').where("userid","==",firebase.auth().currentUser.uid).get().then(snapshot => {
        var d = new Array(12).fill(0);
        snapshot.forEach(doc => {
          var date = doc.data()["keyin-date"];
          var month = moment(date, 'DD-MM-YY').month(); 
          d[month] += parseFloat(doc.data()["saved"]);
        })
        for (var i = 0; i<d.length; i++) {
          this.datacollection.datasets[0].data.push(d[i].toFixed(2));
        }
 
        this.renderChart(this.datacollection, this.options);
      });
    }
  },
  created() {
    this.fetchItems();
  },
};