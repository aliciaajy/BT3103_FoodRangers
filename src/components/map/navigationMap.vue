<template>
<div>
    <br>
    <h2> Shops Near Me </h2>

    <!--
    {{this.markers}}
    <div :key="index" v-for="(m, index) in markers">
        {{m[0]}}
        </div>
    -->

    <p> 🗺 Please enable location services for the map to work. 🗺
        <br> ⏰ The map will take a few seconds to load. ⏰ </p>

    <gmap-map
        :center="{lat:center.lat, lng:center.lng}"
        :zoom="13"
        map-type-id="terrain"
        style="width: 1000px; height: 650px; margin: 0 auto; display: block">

    <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m[2]"
        @click="toggleInfoWindow(m,index)">
    </gmap-marker>

    <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
    <div v-html="infoContent"></div>
    </gmap-info-window>

    </gmap-map>
 
</div>
</template>

<script>
import db from "../../firebase.js";

export default {
    name: 'navigationMap',

    data() {
        return {
            center: {lat:0, lng:0},
            marts: [],
            markers: [],
            infoContent: '',
            infoWindowPos: {
                lat: 0,
                lng: 0
            },
            infoWinOpen: false,
            currentMidx: null,
            infoOptions: {
                pixelOffset: {
                width: 0,
                height: -35
            }
            },
        }
    },

    mounted : function() {
        this.geolocation();
    },

    methods: {
    geolocation : function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    fetchItems: function() { 
           db.collection('apiMart').get().then((querySnapShot)=>{
               let mart = {} 
               querySnapShot.forEach(doc=>{
                    mart=[doc.id,doc.data()];
                    this.marts.push(mart);
                }) 
            }) 
    },

    getMarkers: function() {
        db.collection('apiMart').get().then((querySnapShot)=>{
            let marker = {}
            querySnapShot.forEach(doc=>{
                let entry = doc.data();
                marker = [doc.id, entry.name, entry.position, entry.type]
                this.markers.push(marker)
            })
        })   
    },

    toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker[2];
        this.infoContent = this.getInfoWindowContent(marker);

        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }

        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
    },

    getInfoWindowContent: function (marker) {
        return (`<div>
                    <a href="mart/${marker[0]}">${marker[1]}</a>
                </div>
                <div class="content">
                    <p>${marker[3]}</p>
                </div>`);
    },

    },

    created() {
        this.fetchItems();
        this.getMarkers();
    }
}
</script>

<style scoped>
</style>


