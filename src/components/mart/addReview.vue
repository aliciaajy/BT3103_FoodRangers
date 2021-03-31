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
                <form>
                    <label for="name" required> <b> Displayed Name: </b> </label>
                    <br>
                        <input
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        v-model="reviewerName"
                        required>
                    <br>
                    <br>

                    <label for="review"><b> Review: </b></label>
                    <br>
                        <textarea
                        type="text"
                        placeholder="Enter Review"
                        name="review"
                        required
                        v-model="review"/>
                    <br>
                </form>

            </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-default"
            data-dismiss="modal"
            @click="addReview"
          >
            Submit Review
          </button>
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


  methods: {
    addReview: function(){
      var reviews = {}
      reviews[this.reviewerName] = this.review;

      db.collection("marts").doc(this.id)
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
</style>