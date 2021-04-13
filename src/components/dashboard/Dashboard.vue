<template>
  <div>
    <Bar></Bar>
    <Stats></Stats>
    <div>
    <PieChart></PieChart>
    <LineChart></LineChart>
    <BarChart></BarChart>
    </div>
  </div>
</template>


<script>
import Stats from './Stats.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'

export default {
  components: {
    Stats,
    PieChart,
    LineChart,
    BarChart
  },
}
</script>
