<template>
  <div id="chart">
    <h4 class = "title"> <br><br> Category Of Food </h4>
    <apexcharts
      type="pie"
      width="50%"
      :options="chartOptions"
      :series="series"
    >
    </apexcharts>
 
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import database from "../../firebase.js";
import firebase from 'firebase';

export default {
  name: "Chart",
    mounted: function(){
         window.dispatchEvent(new Event('resize'));
    },
  components: {
    apexcharts: VueApexCharts,
  },
  created() {
    this.fetchEventData();

  },
  data() {
    return {
      chartOptions: {
        chart: {
            width:300,
          type: "pie",
        },
        colors: [
              '#3B93A5',
              '#F7B844',
              '#ADD8C7',
              '#EC3C65',
              '#CDD7B6',
              '#D43F97',
              '#1E5D8C',
              '#421243',
              '#7F94B0',
              '#EF6537',
              '#C0ADDB'
            ],
        // title: {
        //   text: "Category of Food",
        //   align: "left",
        //   style: {
        //     fontSize: "30px",
        //     color: "Grey",
        //     fontFamily: 'Montserrat',
        //   },
        // },
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
    // updateTheme(e) {
    //   this.chartOptions = {
    //     theme: {
    //       palette: e.target.value,
    //     },
    //   };
    // },

   fetchEventData() {
       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "dairy")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);

        });

       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fish")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);

        });
       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "fruit")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);

        });

       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "meat")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);

        });
       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "poultry")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
  
        });
       database
        .collection("items")
        .where("userid", "==", firebase.auth().currentUser.uid)
        .where("category", "==", "vegetable")
        .get()
        .then((querySnapshot) => {
          this.eventdata.push(querySnapshot.size);
    
        });


      this.series = this.eventdata;
      window.dispatchEvent(new Event('resize'));
    },
  },
};
</script>

<style scoped>

.title{
  float:left
}
</style>
