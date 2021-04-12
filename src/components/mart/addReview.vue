<template>
<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"> Review
                    <p style="font-size:14px"> Write us a review to provide other FoodRangers with details about the supermarket! 🥑 </p>
                </h4>
                    <button type="button" class="close" data-dismiss="modal">
                    &times;
                    </button>
            </div>

            <div class="modal-body">
                <form novalidate @submit.prevent="addReview">
                  <div> 
                    <label for="name"> <b> Displayed Name: </b> </label>
                    <br>
                        <input
                        type="text"
                        placeholder="Enter Name"
                        v-model="reviewerName"
                        class="form-control"
                        required="true">
                        <br>
                        <span v-if="!reviewerName.length > 0"> Please key in your name.
                        </span>
                    <br>
                    <br>
                  </div>

                  <div>
                    <label for="review"><b> Review: </b></label>
                    <br>
                        <textarea
                        type="text"
                        placeholder="Enter Review"
                        name="review"
                        class = "form-control"
                        v-model="review"
                        required="true"/>
                        <br>
                        <span v-if="!review.length > 0"> Please key in your review.
                        </span>
                    <br>
                  </div>

                    <br>

                    <button
                    class="formButton"
                    type="submit"
                    :disabled="!isFormValid"
                    data-dismiss="modal"
                    @click="addReview"
                    >
                    Submit Review
                    </button>
              </form>
            </div>
          
        </div>
      </div>
    </div>
</template>

<script>
import db from "../../firebase.js";

export default {
    name: 'addReview',

    data() {
    return {
      reviewerName: "",
      review: ""
    };
  },

  props: {
        id: {
            type: String
        }
    },
  
  computed: {
    isFormValid() {
      return this.reviewerName && this.review
    }
  },


  methods: {
    addReview: function(){
      if (!this.isFormValid) return;
      var reviews = {}
      reviews[this.reviewerName] = this.review;

      db.collection("apiMart").doc(this.id)
        .set({reviews}, {merge: true})
        .then(() => {
          location.reload();
        });
    },
  }

}
</script>

<style scoped>
input, textarea {
  width: 100%;
  padding: 11px;
  margin: 2px 0 10px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  color: black;
}

.formButton {
  padding: 10px 20px;
  background-color: lightblue;
  border-radius: 10px;
  height: 40px;
  padding: 3px;
}

button:disabled {
  background-color: lightgrey;
  color: white;
  cursor: not-allowed;
}
</style>