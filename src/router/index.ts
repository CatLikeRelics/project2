import { createRouter, createWebHistory } from 'vue-router'





const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/", 
      redirect: '/LoginAndRegister'
    },
    {
      path: "/index",
      name: 'index',
      component: () => import("../views/index.vue"),
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("../views/loginRegister.vue")
    },
    {
      path: "/Retreve",
      name: "Retreve",
      component: () => import("../views/RetrievePassword.vue")
    },
    {
      path: "/Validation",
      name: "Validation",
      component: () => import("../components/RetrievePassword/Validation.vue")
    },
    {
      path: "/LoginAndRegister",
      name: "LoginAndRegister",
      component: () => import("../views/LoginAndRegister.vue")
    },
  ]
})



// let token = localStorage.getItem("token")
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !token) next({ name: 'Login' })
//   else next()
// })


export default router
