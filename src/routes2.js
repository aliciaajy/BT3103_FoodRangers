
import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'
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
import supermarketAdmin from './components/login/supermarketLogin.vue'
import user from './components/login/userLogin.vue'

Vue.use(Router)

let router = new Router ({
    routes: [
    { path: '/signup', component: SignUp, meta: {requiresGuest: true}},
    { path: '/login', component: Login, meta: {requiresGuest: true}},
    { path: '/forgot-password', component: ForgotPassword, meta: {requiresGuest: true} },
    { path: '/user/home', component: Home, meta: { requiresAuth: true } },
    { path: '/user/search', component: searchPage, meta: { requiresAuth: true } },
    { path: '/user/map', component: map, meta: { requiresAuth: true } },
    { path: '/user/mart', component: martPage },
    { path: '/user/items', component: itemsPage, meta: { requiresAuth: true } },
    { path: '/user/addItems', component: addItems },
    { path: '/user/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/user/settings', component: Settings, meta: { requiresAuth: true } },
    { path: '/user/mart/:id', component: martPage, props: true },
    { path: '/user/favourites', component: fav, meta: { requiresAuth: true } },
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
                if (claims.user) {
                    if (to.path !== '/user')
                        return next({
                            path: '/user',
                        })
                } else if (claims.supermarketAdmin) {
                    if (to.path!== '/supermarketAdmin')
                        return next({
                            path: '/supermarketAdmin',
                        })
                }
            })
        } else {
            if (to.matched.some(record => record.meta.auth)) {
                next({
                    path: '/login',
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
