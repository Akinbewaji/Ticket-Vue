import { createRouter, createWebHashHistory } from "vue-router";
import { isAuthenticated as isAuthed } from "../utils/auth";

const Landing = () =>
  import(/* webpackChunkName: "landing" */ "../views/Landing.vue");
const Auth = () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue");
const Tickets = () =>
  import(/* webpackChunkName: "tickets" */ "../views/Tickets.vue");
const TicketDetail = () =>
  import(/* webpackChunkName: "ticket-detail" */ "../views/TicketDetail.vue");
const NotFound = {
  template:
    '<div class="container"><div class="section"><h2>Page not found</h2><router-link to="/">Go Home</router-link></div></div>',
};

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets/:id",
    name: "TicketDetail",
    component: TicketDetail,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthed()) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
