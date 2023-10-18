import { createRouter, createWebHistory } from "vue-router";
import Products from "@/components/products/Products";
import Units from "@/components/units/Units";
import PriceList from "@/components/price-list/PriceList";
import Customers from "@/components/customers/Customers";
import Employees from "@/components/employees/Employees";
import Dashboard from "@/components/dashboard/Dashboard";
import Locations from "@/components/locations/Locations";

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/units",
    name: "units",
    component: Units,
  },
  {
    path: "/locations",
    name: "locations",
    component: Locations,
  },
  {
    path: "/price-list",
    name: "price-list",
    component: PriceList,
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
  },
  {
    path: "/employees",
    name: "employees",
    component: Employees,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
