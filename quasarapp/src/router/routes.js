const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/index.vue") }]
  },
  {
    path: "/class",
    component: () => import("layouts/arrange-schedule.vue"),
    children: [{ path: "", component: () => import("pages/class.vue") }]
  },
  {
    path: "/PageAuth",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageAuth.vue") }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
