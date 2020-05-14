const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/index.vue")
      }
    ]
  },
  {
    path: "/arrange-schedule",
    component: () => import("pages/arrange-schedule.vue")
    // children: [{ path: "", component: () => import("pages/class.vue") }]
  },
  {
    path: "/PageAuth",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageAuth.vue")
      }
    ]
  },
  {
    path: "/mySchedule",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/mySchedule.vue")
      }
    ]
  },
  {
    path: "/Like",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/site_collection/likeCard.vue")
      }
    ]
  },
  {
    path: "/site_demend",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/demendPage/s_demendPage.vue")
      }
    ]
  },
  {
    path: "/hotel_demend",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/demendPage/h_demendPage.vue")
      }
    ]
  },
  {
    path: "/site_ProsCons",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/prosconsPage/s_prosConsPage.vue")
      }
    ]
  },
  {
    path: "/hotel_ProsCons",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/prosconsPage/h_prosConsPage.vue")
      }
    ]
  },
  {
    path: "/site_Path",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/pathPage/s_pathPage.vue")
      }
    ]
  },
  {
    path: "/AjaxTest",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/AjaxTest.vue")
      }
    ]
  },
  {
    path: "/CardTest",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/test/cardview.vue")
      }
    ]
  },
  {
    path: "/ftore_data",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/ftore_data.vue")
      }
    ]
  },
  {
    path: "/drag",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/drag.vue")
      }
    ]
  },
  {
    path: "/waypoints",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/WayPoint.vue")
      }
    ]
  },
  {
    path: "/collection",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/collection/collection.vue") }
      // { path: "place", component: () => import("pages/place") }
    ]
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
