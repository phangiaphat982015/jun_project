import { createRouter, createWebHistory } from "vue-router";
import Products from "@/components/products/Products";
import Units from "@/components/units/Units";
import PriceList from "@/components/price-list/PriceList";
import Customers from "@/components/customers/Customers";
import Employees from "@/components/employees/Employees";
import Dashboard from "@/components/dashboard/Dashboard";
import Locations from "@/components/locations/Locations";
import Categories from "@/components/categories/Categories";
import Warehouse from "@/components/warehouse/Warehouse";
import Coupons from "@/components/coupons/Coupons";
import CreateWarehouse from "@/components/warehouse/CreateWarehouse";
import CreateUnit from "@/components/units/CreateUnit";
import CreateProduct from "@/components/products/CreateProduct";
import CreatePricelist from "@/components/price-list/CreatePricelist";
import CreateLocation from "@/components/locations/CreateLocation";
import CreateEmployee from "@/components/employees/CreateEmployee";
import CreateCustomer from "@/components/customers/CreateCustomer";
import CreateCoupon from "@/components/coupons/CreateCoupon";
import CreateCategory from "@/components/categories/CreateCategory";

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
    path: "/products/create",
    name: "create_product",
    component: CreateProduct,
  },
  {
    path: "/products/:id/edit",
    name: "edit_product",
    component: CreateProduct,
  },
  {
    path: "/units",
    name: "units",
    component: Units,
  },
  {
    path: "/units/create",
    name: "create_unit",
    component: CreateUnit,
  },
  {
    path: "/units/:id/edit",
    name: "edit_unit",
    component: CreateUnit,
  },
  {
    path: "/locations",
    name: "locations",
    component: Locations,
  },
  {
    path: "/locations/create",
    name: "create_location",
    component: CreateLocation,
  },
  {
    path: "/locations/:id/edit",
    name: "edit_location",
    component: CreateLocation,
  },
  {
    path: "/categories",
    name: "categories",
    component: Categories,
  },
  {
    path: "/categories/create",
    name: "create_category",
    component: CreateCategory,
  },
  {
    path: "/categories/:id/edit",
    name: "edit_category",
    component: CreateCategory,
  },
  {
    path: "/price-list",
    name: "price-list",
    component: PriceList,
  },
  {
    path: "/price-list/create",
    name: "create_price_list",
    component: CreatePricelist,
  },
  {
    path: "/price-list/:id/edit",
    name: "edit_price_list",
    component: CreatePricelist,
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
  },
  {
    path: "/customers/create",
    name: "create_customer",
    component: CreateCustomer,
  },
  {
    path: "/customers/:id/edit",
    name: "edit_customer",
    component: CreateCustomer,
  },
  {
    path: "/employees",
    name: "employees",
    component: Employees,
  },
  {
    path: "/employees/create",
    name: "create_employee",
    component: CreateEmployee,
  },
  {
    path: "/employees/:id/edit",
    name: "edit_employee",
    component: CreateEmployee,
  },
  {
    path: "/warehouse",
    name: "warehouse",
    component: Warehouse,
  },
  {
    path: "/warehouse/create",
    name: "create_warehouse",
    component: CreateWarehouse,
  },
  {
    path: "/warehouse/:id/edit",
    name: "edit_warehouse",
    component: CreateWarehouse,
  },
  {
    path: "/coupons",
    name: "coupons",
    component: Coupons,
  },
  {
    path: "/coupons/create",
    name: "create_coupon",
    component: CreateCoupon,
  },
  {
    path: "/coupons/:id/edit",
    name: "edit_coupon",
    component: CreateCoupon,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
