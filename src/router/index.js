// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/pages/login/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/pages/dashboard/Dashboard.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/components/products/Products.vue"),
  },
  {
    path: "/units",
    name: "units",
    component: () => import("@/components/units/Units.vue"),
  },
  {
    path: "/price-list",
    name: "price-list",
    component: () => import("@/components/price-list/PriceList.vue"),
  },
  {
    path: "/customers",
    name: "customers",
    component: () => import("@/components/customers/Customers.vue"),
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/components/employees/Employees.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
