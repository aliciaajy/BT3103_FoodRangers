import { Line } from 'vue-chartjs'
import db from '../../firebase.js'
import moment from "moment";
import firebase from "firebase"
export default {
  extends: Line,
  data: function () {
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
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function() {
      db.collection('items').where("userid","==",firebase.auth().currentUser.uid).get().then(snapshot => {
        var d = new Array(12).fill(0);
        console.log(d);
        snapshot.forEach(doc => {
          var date = doc.data()["keyin-date"];
          var month = moment(date, 'DD-MM-YY').month(); // 1
          console.log(month)
          //var month = this.datacollection.labels[date.month()-1]; //jan
          d[month] += parseFloat(doc.data()["saved"]);
          console.log(d);
        })
        //console.log(d);
        for (var i = 0; i<d.length; i++) {
          this.datacollection.datasets[0].data.push(d[i]);
        }
        //console.log(this.datacollection.datasets[0].data)

        this.renderChart(this.datacollection, this.options);
      });
    }
  },
  created () {
    this.fetchItems()
  }
}