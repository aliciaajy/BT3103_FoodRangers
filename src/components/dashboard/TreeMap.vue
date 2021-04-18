<template>
  <div id="chart">
    <h4 class="title">
      <br /><br />
      Top Food Category Contribution To Savings
    </h4>
    <apexcharts
      class="map"
      type="treemap"
      width="100%"
      height="400"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import database from "../../firebase.js";
import firebase from "firebase";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts,
  },
  created() {
    this.fetchItems();
      this.series = [
        {
          data: this.eventdata,
        },
      ];
  },
  data() {
    return {
      dairysaved: 0,
      fishsaved: 0,
      fruitsaved: 0,
      meatsaved: 0,
      poultrysaved: 0,
      vegsaved: 0,

      chartOptions: {
        legend: {
          show: false,
        },
        chart: {
          height: 500,
          type: "treemap",
        },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],

        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "right",
                height: 230,
              },
            },
          },
        ],
      },

      //   treemapdata: [],

      eventdata: [],
      series: [
        {
          data: [
            {
              x: "HELLO",
              y: 10,
            },
          ],
        },
      ],
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

    fetchItems() {
      //   var arr = [];

      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "dairy")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.dairysaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Diary",
            y: this.dairysaved,
          };
          this.eventdata.push(curr);
        });

      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fish")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.fishsaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Fish",
            y: this.fishsaved,
          };
          this.eventdata.push(curr);
        });

      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fruit")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.fruitsaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Fruit",
            y: this.fruitsaved,
          };
          this.eventdata.push(curr);
        });

      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "meat")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.meatsaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Meat",
            y: this.meatsaved,
          };
          this.eventdata.push(curr);
        });
      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "poultry")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.poultrysaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Poultry",
            y: this.poultrysaved,
          };
          this.eventdata.push(curr);
        });
      database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "vegetable")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.vegsaved += parseFloat(doc.data()["saved"]);
          });
          var curr = {
            x: "Vegetable",
            y: this.vegsaved,
          };
          this.eventdata.push(curr);
        });

      this.series = [
        {
          data: this.eventdata,
        },
      ];
    
    },
    NAME_OF_MUTATION: (state, series) => {
      state.nameOfDataInStore = series;
      window.dispatchEvent(new Event("resize"));
    },
  },
};
</script>

<style scoped>
.title {
  float: center;
}
</style>