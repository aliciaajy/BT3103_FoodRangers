<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
       
        img-src= "https://quotefancy.com/media/wallpaper/3840x2160/1626989-Tristram-Stuart-Quote-Cutting-food-waste-is-a-delicious-way-of.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="http://www.wisefamousquotes.com/images/food-waste-quotes-by-anna-thomas-382893.jpg">
      </b-carousel-slide>
      
       <b-carousel-slide img-src="https://quotestats.com/topic/184487-quotes-about-starvation-111466.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://www.wisefamousquotes.com/images/food-waste-quotes-by-pope-francis-653607.jpg"></b-carousel-slide>



      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
     
    </b-carousel>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>
<style scoped>
.carousel-item{
    height: 490px;
} 
.carousel-item img-src{
    height:450px;  
    object-fit:cover
}


</style>
