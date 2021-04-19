import Login from './components/login/Login.vue'
import SignUp from './components/login/SignUp2.vue'
import ForgotPassword from './components/login/ForgotPassword.vue'
import searchPage from './components/search/searchPage.vue'
import Home from './components/home/Home.vue'
import map from './components/map/map.vue'
import martPage from './components/mart/martPage.vue'
import itemsPage from "./components/items/itemsPage.vue"
import addItems from "./components/items/addItem.vue"
import Dashboard from "./components/dashboard/Dashboard.vue"
import fav from "./components/favourites/favourites.vue"
import Settings from "./components/settings/Settings.vue"
import SuperMarket from "./components/supermarket/Supermarket.vue"
import Admin from "./components/Admin.vue"
import supermarketAdmin from './components/login/martAdminLogin.vue'
import adminSignup from './components/login/adminSignup.vue'
//import supermarketAdd from './components/supermarket/Supermarket.vue'

import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    routes: [
    { path: '/signup', component: SignUp, meta: {guest: true} },
    { path: '/', component: Login, meta: {guest: true} },
    { path: '/forgot-password', component: ForgotPassword, meta: {guest: true} },
    { path: '/customer/home', component: Home, meta: { requiresAuth: true } },
    { path: '/customer/search', component: searchPage, meta: { requiresAuth: true } },
    { path: '/customer/map', component: map, meta: { requiresAuth: true } },
    { path: '/customer/mart', component: martPage },
    { path: '/customer/items', component: itemsPage, meta: { requiresAuth: true } },
    { path: '/customer/addItems', component: addItems },
    { path: '/customer/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/customer/settings', component: Settings, meta: { requiresAuth: true } },
    { path: '/customer/mart/:id', component: martPage, props: true },
    { path: '/customer/favourites', component: fav, meta: { requiresAuth: true } },
    { path: '/supermarketAdmin/supermarket', component:SuperMarket, meta: {requiresAuth: true}},
    {path: '/admin', component: Admin, meta: {requiresAuth:true}},
    { path: '/supermarketAdmin/login', component: supermarketAdmin, meta: {guest: true} },
    { path: '/adminSignup', component: adminSignup, meta: {guest: true}},

]})

router.beforeEach((to, from, next) => {
    //alert("router.beforeEach in routes.js");

    firebase.auth().onAuthStateChanged(userAuth => {
  
      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
            claims
          }) {
            if (claims.customer) {
                //alert("to path customer is " + to.path.toString() );
                //alert("do you contain customer or not " + to.path.toString().includes("/customer"))
                if (to.path.toString().includes("/customer")) {
                    next();
                } else {
                    next("/customer/home");
                }
              //let isCustomerRoute = to.fullPath.indexOf("/customer/") > -1;
               /* if (isCustomerRoute) {
                  next("/customer/home");
                } else {
                  next();
                }*/
            } else if (claims.admin) {

                if (to.path.toString().includes("/admin")) {
                    next();
                } else {
                    next("/admin");
                }

            } else if (claims.supermarketAdmin) {


                if (to.path !== '/supermarketAdmin/supermarket') {
                    return next( {path: '/supermarketAdmin/supermarket'});
                }
            }
  
          })
      } else {
        if (to.matched.some(record => record.meta.auth)) {
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }
  
    })
  
    next()
  
  })
  
  
  export default router