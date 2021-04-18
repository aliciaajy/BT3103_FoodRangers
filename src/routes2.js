import Login from './components/login/login2.vue'
import SignUp from './components/login/SignUp2.vue'
import adminSignup from './components/login/adminSignup.vue'
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


export default [
    { path: '/signup', component: SignUp, meta: {guest: true}},
    { path: '/adminSignup', component: adminSignup, meta: {guest: true}},
    { path: '/', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
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
    { path: '/martAdmin', component: supermarketAdmin, meta: { requiresAuth: true }},

]
