<template>
  <div>
    <Bar></Bar>
    <Stats></Stats>
    <div >
    <PieChart></PieChart> 
    </div>
  </div>
</template>


<script>
import Stats from './Stats.vue'
import PieChart from './PieChart.vue'

export default {
  components: {
    Stats,
    PieChart
  },
  



}
</script>
