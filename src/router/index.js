import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '../views/Contacts.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import Admin from '../views/Admin.vue'
import AdminPanel from '../views/AdminPanel.vue'
import { auth } from '../firebase'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: Contacts
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  


  {
    path: '/adminpanel',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: {
      auth: true,
    }
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      auth: true,
    }
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.auth)

  if(requiresAuth && !auth.currentUser) {
    next('/login') 
    } else {
      next()
    }
  
})

export default router




