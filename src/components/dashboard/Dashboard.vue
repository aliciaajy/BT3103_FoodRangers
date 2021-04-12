<template>
  <div>
    <Bar></Bar>
    <Stats></Stats>
    <div>
    <PieChart></PieChart>
    <LineChart></LineChart>
    </div>
  </div>
</template>


<script>
import Stats from './Stats.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'

export default {
  components: {
    Stats,
    PieChart,
    LineChart
  },
}
</script>
