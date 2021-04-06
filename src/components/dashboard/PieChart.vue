<template>
  <div id="chart">
    <apexcharts
      type="pie"
      width="50%"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import database from "../../firebase.js";
import firebase from 'firebase'

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  beforeMount() {
    this.fetchEventData();
  },
  data() {
    return {
      chartOptions: {
        chart: {
            width:300,
          type: "pie",
        },
        title: {
          text: "Category of Food",
          align: "left",
          style: {
            fontSize: "30px",
            color: "Black",
          },
        },
        labels: ["Dairy", "Fish", "Fruit", "Meat", "Poultry", "Vegetable"],
        
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                  width:200
                  
              },
              legend: {
                position: "right",
                  height: 230,
              },
            },
          },
        ],
      },
      eventdata: [],
      series: [1, 1, 1, 1, 1, 1],
    };
  },
  methods: {
    updateTheme(e) {
      this.chartOptions = {
        theme: {
          palette: e.target.value,
        },
      };
    },

    async fetchEventData() {
      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "dairy")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });

      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fish")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });
      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fruit")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });

      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "meat")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });
      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "poultry")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });
      await database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "vegetable")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
          console.log("Event data" + this.eventdata);
        });

      console.log("FinalArray" + this.eventdata);
      this.series = this.eventdata;
    },
  },
};
</script>