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
import Settings from "./components/settings/Settings.vue"
import fav from "./components/favourites/favourites.vue"

export default [
    { path: '/signup', component: SignUp },
    { path: '/', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/home', component: Home,meta: { requiresAuth: true }},
    { path: '/search', component: searchPage },
    { path: '/map', component: map },
    { path:'/mart', component: martPage},
    { path: '/items', component: itemsPage},
    { path: '/addItems', component:addItems},
    { path: '/dashboard', component: Dashboard},
    {path: '/settings', component: Settings},
    { path:'/mart/:id', component: martPage, props: true},
    {path: '/favourites', component: fav}
]
