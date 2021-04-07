import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import NavigationBar from './components/NavigationBar.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee)
import firebase from 'firebase'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCSIL9ioq0rS2eGE3GW4QwumFUCNCNy-50',
  },
});

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.component('Bar', NavigationBar)


const router = new VueRouter({
  routes: Routes,
  mode: "history"
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthtenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthtenticated) {
    next("/");
  } else {
    next();
  }
});


let app;
firebase.auth().onAuthStateChanged(async user => {
if (!app) {
    //start app
    app = new Vue({
      router,
      created() {
        //redirect if user not logged in
        if (!user) {
          this.$router.push("/");
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});

// new Vue({
//   render: h => h(App),
//   router: router
// }).$mount('#app')



