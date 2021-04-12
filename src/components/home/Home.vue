<template>
  <div>
    <Bar></Bar>
    
    <h1>
      
      Welcome Back,
      <small class="text-muted">Name</small>
      <h2 id ="annword">  Annoucement </h2>
    </h1>
    <Notes></Notes>
    <Annoucement></Annoucement>
  </div>

</template>




<script>

import Annoucement from './Annoucement.vue';
import Notes from './Notes.vue';

export default {
  components: {
    Annoucement,
    Notes
  }
};

</script>

<style scoped>
h1 {
  text-align:left;
}
h3 {
  right: 20px;
}
#annword {
    float:right;
    width:35%;
    height: 40px;
    background: rgba(10, 11, 94, 0.603);
    color: white;
    border: 1.8px solid rgb(3, 3, 3);
    text-align: center;
}
</style>