<template>
<div>
    <br>
    <p style="font-weight: bold"> Reviews
        <button
        data-toggle="modal"
        data-target="#myModal">
        Add Review </button>
        <addReview v-bind:id="this.id"> </addReview>
    </p>

    <!--
    {{this.reviews}}
    <div :key="index" v-for="(m, index) in reviews">
        {{m[0]}}
    </div>
    -->
    
    <div>
    <ul>
        <li v-for="(key, value) in this.mart.reviews" :key="key">
            <u><b>{{value}}</b></u>
            <br>
            {{key}}
        </li>
    </ul>
    </div>
</div>
</template>

<script>
import db from "../../firebase.js";
import addReview from "./addReview.vue"

export default {
    name: 'martReviews',

    components: {
        addReview
    },

    data() {
        return {
            mart: [],
        }
    },

    props: {
        id: {
            type: String
        }
    },

    methods: {
        getReviews: function() {
            db.collection('apiMart').doc(this.id).get().then(snapshot => { 
            this.mart = snapshot.data();
            });
        },
    },

    created() {
        this.getReviews();
    }
}
</script>

<style scoped>
button {
    border-radius: 4px;
    font-size: 14px;
    background-color: rgb(221, 252, 236);
    float: right;
}

li {
    margin: 20px; 
}

b {
  font-size: 18px;
}
</style>