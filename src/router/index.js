import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import RenderRouterView from "../components/RenderRouterView.vue"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layout/BasicLayout"),
    children: [
      // dashboard 仪表盘
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: {render: h => h("router-view")},
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "../views/dashboard/Analysis")
          }
        ]
      }
    ]
  },
  {
    // form
    path: "/form",
    name: "form",
    meta: { icon: "form", title: "表单" },
    component: { render: h => h("router-view") },
    children: [
      {
        path: "/form/basic-form",
        name: "basicform",
        meta: { title: "基础表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/form/Basicform")
      },
      {
        path: "/form/step-form",
        name: "stepform",
        meta: { title: "分步表单" },
        hideChildrenInMenu: true,
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/form/stepform"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () => 
              import(/* webpackChunkName: "form" */ "../views/form/stepform/stepformInfo")
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () => 
              import(/* webpackChunkName: "form" */ "../views/form/stepform/stepformConfirm")
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () => 
              import(/* webpackChunkName: "form" */ "../views/form/stepform/stepformResult")
          }
        ]
      }
    ]
  },
  {
    path: "/user",
    hideInMenu: true,
    // component: RenderRouterView,
    // component: { render: h=> h("router-view")},
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layout/userLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () => 
          import(/* webpackChunkName: "user" */ "../views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () => 
          import(/* webpackChunkName: "user" */ "../views/user/Register.vue")
      },
    ]
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: () => 
      import(/* webpackChunkName: "404" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
