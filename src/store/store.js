import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});

const store = createStore({
  state() {
    return {
      // Category
      categoryList: [
        {
          id: "1",
          code: "TP",
          name: "Thuc pham",
        },
        {
          id: "2",
          code: "HP",
          name: "Hoa pham",
        },
        {
          id: "3",
          code: "CSCN",
          name: "Cham soc ca nhan",
        },
      ],

      // Coupon
      couponList: [
        {
          id: "1",
          code: "CT1",
          description: "Chuong trinh 1",
        },
        {
          id: "2",
          code: "CT2",
          description: "Chuong trinh 2",
        },
        {
          id: "3",
          code: "CT3",
          description: "Chuong trinh 3",
        },
      ],

      // Customer
      customerList: [
        {
          id: "KHACHHANG 1",
          name: "KHACH 1",
          address: "DIACHI 1",
          phone: "SDT 1",
        },
        {
          id: "KHACHHANG 2",
          name: "KHACH 2",
          address: "DIACHI 2",
          phone: "SDT 2",
        },
        {
          id: "KHACHHANG 3",
          name: "KHACH 3",
          address: "DIACHI 3",
          phone: "SDT 3",
        },
        {
          id: "KHACHHANG 4",
          name: "KHACH 4",
          address: "DIACHI 4",
          phone: "SDT 4",
        },
        {
          id: "KHACHHANG 5",
          name: "KHACH 5",
          address: "DIACHI 5",
          phone: "SDT 5",
        },
        {
          id: "KHACHHANG 6",
          name: "KHACH 6",
          address: "DIACHI 6",
          phone: "SDT 6",
        },
        {
          id: "KHACHHANG 7",
          name: "KHACH 7",
          address: "DIACHI 7",
          phone: "SDT 7",
        },
        {
          id: "KHACHHANG 8",
          name: "KHACH 8",
          address: "DIACHI 8",
          phone: "SDT 8",
        },
      ],

      // Employee
      employeeList: [
        {
          id: "NHANVIEN 1",
          name: "NHANVIEN 1",
          position: "CHUCVU 1",
          phone: "SDT 1",
        },
        {
          id: "NHANVIEN 2",
          name: "NHANVIEN 2",
          position: "CHUCVU 2",
          phone: "SDT 2",
        },
        {
          id: "NHANVIEN 3",
          name: "NHANVIEN 3",
          position: "CHUCVU 3",
          phone: "SDT 3",
        },
        {
          id: "NHANVIEN 4",
          name: "NHANVIEN 4",
          position: "CHUCVU 4",
          phone: "SDT 4",
        },
        {
          id: "NHANVIEN 5",
          name: "NHANVIEN 5",
          position: "CHUCVU 5",
          phone: "SDT 5",
        },
        {
          id: "NHANVIEN 6",
          name: "NHANVIEN 6",
          position: "CHUCVU 6",
          phone: "SDT 6",
        },
        {
          id: "NHANVIEN 7",
          name: "NHANVIEN 7",
          position: "CHUCVU 7",
          phone: "SDT 7",
        },
        {
          id: "NHANVIEN 8",
          name: "NHANVIEN 8",
          position: "CHUCVU 8",
          phone: "SDT 8",
        },
      ],

      // Location
      locationList: [
        {
          id: "1",
          city: "TPHCM",
          district: "QUAN 11",
          ward: "PHUONG 1",
        },
        {
          id: "1",
          city: "TPHCM",
          district: "QUAN 11",
          ward: "PHUONG 2",
        },
        {
          id: "1",
          city: "TPHCM",
          district: "QUAN 11",
          ward: "PHUONG 3",
        },
        {
          id: "1",
          city: "TPHCM",
          district: "QUAN 11",
          ward: "PHUONG 4",
        },
        {
          id: "1",
          city: "TPHCM",
          district: "QUAN 11",
          ward: "PHUONG 5",
        },
      ],

      // Price list
      priceList: [],

      // Product
      productList: [
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
        {
          id: "COCA",
          name: "COCA",
          type: "COCA",
          unit: "COCA",
          url: "cocacola.png",
          description: "COCA",
        },
      ],

      // Unit
      unitList: [
        {
          id: "1",
          name: "LON",
          description: "lon",
        },
        {
          id: "2",
          name: "THUNG24",
          description: "thùng 24 lon",
        },
      ],

      // Warehosue
      warehouseList: [
        {
          id: "1",
          code: "VP1",
          name: "Vat pham 1",
          description: "Vat pham 1",
        },
        {
          id: "2",
          code: "VP2",
          name: "Vat pham 2",
          description: "Vat pham 2",
        },
        {
          id: "3",
          code: "CT3",
          name: "Chuong trinh 3",
          description: "Chuong trinh 1",
        },
      ],
    };
  },

  getters: {
    // Category
    categoryList: (state) => {
      return state.categoryList;
    },

    getCategoryById: (state) => (id) => {
      return state.categoryList.find((item) => item.id === id);
    },

    // Coupon
    couponList: (state) => {
      return state.couponList;
    },

    getCouponById: (state) => (id) => {
      return state.couponList.find((item) => item.id === id);
    },

    // Customer
    customerList: (state) => {
      return state.customerList;
    },

    getCustomerById: (state) => (id) => {
      return state.customerList.find((item) => item.id === id);
    },

    // Employee
    employeeList: (state) => {
      return state.employeeList;
    },

    getEmployeeById: (state) => (id) => {
      return state.employeeList.find((item) => item.id === id);
    },

    // Location
    locationList: (state) => {
      return state.locationList;
    },

    getLocationById: (state) => (id) => {
      return state.locationList.find((item) => item.id === id);
    },

    // Price list
    priceList: (state) => {
      return state.priceList;
    },

    getPriceListById: (state) => (id) => {
      return state.priceList.find((item) => item.id === id);
    },

    // Product
    productList: (state) => {
      return state.productList;
    },

    getProductById: (state) => (id) => {
      return state.productList.find((item) => item.id === id);
    },

    // Unit
    unitList: (state) => {
      return state.unitList;
    },

    getUnitById: (state) => (id) => {
      return state.unitList.find((item) => item.id === id);
    },

    // Warehouse
    warehouseList: (state) => {
      return state.warehouseList;
    },

    getWarehouseById: (state) => (id) => {
      return state.warehouseList.find((item) => item.id === id);
    },
  },

  mutations: {
    // Category
    deleteCategory(state, id) {
      const index = state.categoryList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.categoryList.splice(index, 1);
    },

    addCategory(state, obj) {
      const category = {
        id: (state.categoryList.length + 1).toString(),
        ...obj,
      };
      state.categoryList.push(category);
    },

    editCategory(state, item) {
      const items = state.categoryList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Coupon
    deleteCoupon(state, id) {
      const index = state.couponList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.couponList.splice(index, 1);
    },

    addCoupon(state, obj) {
      const coupon = {
        id: (state.couponList.length + 1).toString(),
        ...obj,
      };
      state.couponList.push(coupon);
    },

    editCoupon(state, item) {
      const items = state.couponList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Customer
    deleteCustomer(state, id) {
      const index = state.customerList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.customerList.splice(index, 1);
    },

    addCustomer(state, obj) {
      const customer = {
        id: (state.customerList.length + 1).toString(),
        ...obj,
      };
      state.customerList.push(customer);
    },

    editCustomer(state, item) {
      const items = state.customerList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Employee
    deleteEmployee(state, id) {
      const index = state.employeeList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.employeeList.splice(index, 1);
    },

    addEmployee(state, obj) {
      const employee = {
        id: (state.employeeList.length + 1).toString(),
        ...obj,
      };
      state.employeeList.push(employee);
    },

    editEmployee(state, item) {
      const items = state.employeeList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Location
    deleteLocation(state, id) {
      const index = state.locationList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.locationList.splice(index, 1);
    },

    addLocation(state, obj) {
      const location = {
        id: (state.locationList.length + 1).toString(),
        ...obj,
      };
      state.locationList.push(location);
    },

    editLocation(state, item) {
      const items = state.locationList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Price list
    deletePriceList(state, id) {
      const index = state.priceList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.priceList.splice(index, 1);
    },

    addPriceList(state, obj) {
      const priceList = {
        id: (state.priceList.length + 1).toString(),
        ...obj,
      };
      state.priceList.push(priceList);
    },

    editPriceList(state, item) {
      const items = state.priceList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Product
    deleteProduct(state, id) {
      const index = state.productList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.productList.splice(index, 1);
    },

    addProduct(state, obj) {
      const product = {
        id: (state.productList.length + 1).toString(),
        ...obj,
      };
      state.productList.push(product);
    },

    editProduct(state, item) {
      const items = state.productList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Unit
    deleteUnit(state, id) {
      const index = state.unitList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.unitList.splice(index, 1);
    },

    addUnit(state, obj) {
      const unit = {
        id: (state.unitList.length + 1).toString(),
        ...obj,
      };
      state.unitList.push(unit);
    },

    editUnit(state, item) {
      const items = state.unitList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },

    // Warehouse
    deleteWarehouse(state, id) {
      const index = state.warehouseList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      state.warehouseList.splice(index, 1);
    },

    addWarehouse(state, obj) {
      const warehouse = {
        id: (state.warehouseList.length + 1).toString(),
        ...obj,
      };
      state.warehouseList.push(warehouse);
    },

    editWarehouse(state, item) {
      const items = state.warehouseList;
      var foundIndex = items.findIndex((x) => x.id == item.id);
      items[foundIndex] = item;
    },
  },

  plugins: [vuexLocalStorage.plugin],
});

export default store;
