<template>
  <div id="starRatingsVue">
    <starRating
      :rating="rating"
      :read-only="true"
      :increment="0.1"
      :show-rating="false"
      :fixed-points="1"
      inactive-color="#ffffff"
      id="ratingsStar"
    ></starRating>
    
    <div v-if="rating > 0"> 
      <h1 id="starRatingsVue"> Ratings: {{ rating }} </h1>
    </div>

    <div v-else>
      <h1 id="starRatingsVue">Ratings: N.A </h1>
    </div>
    
  </div>
</template>

  <script>
import StarRating from "vue-star-rating";
export default {
  methods: {
    setRating: function (rating) {
      this.rating = "You have Selected: " + rating + " stars";
    },
    showCurrentRating: function (rating) {
      this.currentRating =
        rating === 0
          ? this.currentSelectedRating
          : "Click to select " + rating + " stars";
    },
    setCurrentSelectedRating: function (rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    },
  },

  data() {
    return {
      //rating: "No Rating Selected",
      currentRating: "No Rating",
      currentSelectedRating: "No Current Rating",
      boundRating: 3,
    };
  },

  components: {
    StarRating,
  },

  props: {
    rating: {},
  },
};
</script>

  <style>

#starRatingsVue {
  padding-top: 20px;
  font-size: 30px;
}
</style>