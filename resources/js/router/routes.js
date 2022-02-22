import Home from '@/js/views/Home.vue'
// import NotFound from '@/js/views/NotFound.vue'
// import Unauthorized from '@/js/views/Unauthorized.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/js/views/About.vue'),
  },
//   {
//     path: "/unauthorized",
//     name: "Unauthorized",
//     meta: { layout: 'empty' },
//     component: Unauthorized,
//   },
//   {
//     path: "/:catchAll(.*)",
//     name: "NotFound",
//     meta: { layout: 'empty' },
//     component: NotFound,
//   }
]
