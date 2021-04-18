import Login from './components/login/login2.vue'
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


export default [
    { path: '/signup', component: SignUp },
    { path: '/', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
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
    { path: '/supermarket', component:SuperMarket}

]
