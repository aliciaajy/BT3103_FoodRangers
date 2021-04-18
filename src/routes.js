import Login from './components/login/Login.vue'
import SignUp from './components/login/SignUp.vue'
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
import supermarketAdmin from './components/login/supermarketLogin.vue'
import user from './components/login/userLogin.vue'


import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
    routes: [
    { path: '/signup', component: SignUp, meta: {guest: true} },
    { path: '/', component: Login, meta: {guest: true} },
    { path: '/forgot-password', component: ForgotPassword, meta: {guest: true} },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/search', component: searchPage, meta: { requiresAuth: true } },
    { path: '/map', component: map, meta: { requiresAuth: true } },
    { path: '/mart', component: martPage },
    { path: '/items', component: itemsPage, meta: { requiresAuth: true } },
    { path: '/addItems', component: addItems },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true } },
    { path: '/mart/:id', component: martPage, props: true },
    { path: '/favourites', component: fav, meta: { requiresAuth: true } },
    { path: '/supermarket', component:SuperMarket, meta: {requiresAuth: true}},
    {path: '/admin', component: Admin, meta: {reqiresAuth:true}},
    { path: '/user', component: user, meta: { requiresAuth: true }},
    { path: '/supermarketAdmin', component: supermarketAdmin, meta: { requiresAuth: true }},
]})

router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {
  
      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
          .then(function ({
            claims
          }) {
  
            if (claims.customer) {
              if (to.path !== '/customer')
                return next({
                  path: '/customer',
                })
            } else if (claims.admin) {
              if (to.path !== '/admin')
                return next({
                  path: '/admin',
                })
            } else if (claims.driver) {
              if (to.path !== '/supermarketAdmin')
                return next({
                  path: '/supermarketAdmin',
                })
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