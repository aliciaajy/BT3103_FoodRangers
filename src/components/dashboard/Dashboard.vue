<template>
  <div>
    <Bar></Bar>
    <Stats></Stats>
    <!-- <Bar></Bar>
    <Stats></Stats>
    <div>
  
    <PieChart></PieChart>
    <TreeMap></TreeMap>
    </div>
    <div>
    <LineChart></LineChart>
    <BarChart></BarChart>
    </div> -->
    <b-container>
      <b-row>

        <b-col class="style1"><PieChart></PieChart> </b-col>
       
        <!-- <b-col><TreeMap></TreeMap></b-col> -->
      </b-row>
      <b-row>
     <b-col> <LineChart></LineChart></b-col>
        <b-col> <BarChart></BarChart></b-col>
 
    
      </b-row>
    </b-container>
  </div>
</template>


<script>
import Stats from "./Stats.vue";
import PieChart from "./PieChart.vue";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
// import TreeMap from "./TreeMap.vue";

export default {
  components: {
    Stats,
    PieChart,
    LineChart,
    BarChart,
    // TreeMap,
  },
};
</script>

<style scoped>
.style1{
  left:300px;
}
</style>