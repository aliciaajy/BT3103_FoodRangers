<template>
  <div id="chart">
    <apexcharts
      type="line"
      width="50%"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import db from '../../firebase.js'
import moment from "moment";
import firebase from "firebase"
export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  beforeMount() {
    this.fetchItems();
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'line',
          markers: {
            size: 0,
          },
        },
        title: {
          text: 'Monthly Savings',
          align: 'left',
          style: {
            fontSize: "30px",
            color: "Black",
          },
        },
        xaxis: {
          categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
      },
      series: [{
        name: 'Amount saved ($)',
        data: []
      }],
    }
  },
  methods: {
    fetchItems: function() {
      db.collection('items').where("userid","==",firebase.auth().currentUser.uid).get().then(snapshot => {
        var d = new Array(12).fill(0);
        console.log(d);
        snapshot.forEach(doc => {
          var date = doc.data()["keyin-date"];
          var month = moment(date, 'DD-MM-YY').month(); 
          d[month] += parseFloat(doc.data()["saved"]).toFixed(1);
        })
        for (var i = 0; i<d.length; i++) {
          this.series[0].data.push(d[i]);
        }
      });
    }
  },
};
</script>

<style>
</style>