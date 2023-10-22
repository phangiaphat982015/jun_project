<template>
  <template v-if="!isLoggedIn">
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
        <v-form fast-fail @submit.prevent="login">
          <v-text-field
            variant="outlined"
            v-model="username"
            label="User Name"
          ></v-text-field>

          <v-text-field
            variant="outlined"
            v-model="password"
            label="Password"
          ></v-text-field>
          <v-btn type="submit" color="primary" block class="mt-2"
            >Đăng nhập</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
  </template>
  <v-app v-else id="inspire">
    <v-navigation-drawer
      color="#E0E0E0"
      fixed
      expand-on-hover
      permanent
      app
      v-model="drawer"
    >
      <v-list-item>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex">
            <v-list-item>
              <h2 class="font-weight-light">SeaShop</h2>
            </v-list-item>
          </div>
          <div class="d-flex">
            <v-btn color="error" @click="logout()"
              ><v-icon>mdi-logout</v-icon></v-btn
            >
          </div>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-menu v-for="item in items">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-if="!item.route"
            :prepend-icon="item.icon"
            :link="true"
          >
            <v-list-item-title v-bind="props">{{
              item.title
            }}</v-list-item-title></v-list-item
          >
          <v-list-item
            v-else
            :to="item.route"
            :prepend-icon="item.icon"
            :link="true"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item
          >
        </template>
        <v-list v-if="item.subItems">
          <v-list-item
            v-for="(subItem, index) in item.subItems"
            :key="index"
            @click="changRoute(subItem.route)"
          >
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-navigation-drawer>
    <v-main> <router-view /></v-main>
  </v-app>
</template>
<script>
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  data: () => ({
    breadcrumbs: [],
    mini: true,
    drawer: null,
    menuActive: 1,
    subActive: null,
    fab: false,
    isLoggedIn: false,
    username: "",
    password: "",
  }),

  computed: {
    items() {
      return [
        {
          icon: "mdi-home-variant-outline",
          title: "Trang chủ",
          show: true,
          route: "/dashboard",
        },
        {
          icon: "mdi-database-outline",
          title: "Dữ liệu đầu vào",
          show: true,
          subItems: [
            {
              title: "Sản phẩm",
              show: true,
              route: "/products",
            },
            {
              title: "Đơn vị tính",
              show: true,
              route: "/units",
            },
            {
              title: "Vị trí địa lý",
              show: true,
              route: "/locations",
            },
            {
              title: "Loại sản phẩm",
              show: true,
              route: "/categories",
            },
            {
              title: "Bảng giá",
              show: true,
              route: "/price-list",
            },
            {
              title: "Khách hàng",
              show: true,
              route: "/customers",
            },
            {
              title: "Nhân viên",
              show: true,
              route: "/employees",
            },
          ],
        },
        {
          icon: "mdi-ticket-percent-outline",
          title: "Khuyến mãi",
          show: true,
          route: "/coupons",
        },
        {
          icon: "mdi-warehouse",
          title: "Kho",
          show: true,
          route: "/warehouse",
        },
      ];
    },
    pageTitle() {
      return "Admin";
    },
  },

  mounted() {
    let authenCookie = this.cookies.get("authenCookie");
    if (authenCookie) {
      this.isLoggedIn = true;
      this.$router.push("/dashboard");
    } else {
      this.isLoggedIn = false;
    }
  },

  methods: {
    changRoute(name) {
      this.$router.push(name);
    },

    toggleRender() {
      if (this.$router.name === "dashboard") return false;
      return false;
    },

    login() {
      if (this.username === "admin" && this.password === "admin") {
        this.cookies.set("authenCookie", "logged in");
        this.isLoggedIn = true;
        this.username = "";
        this.password = "";
        this.$router.push("/dashboard");
      }
    },

    logout() {
      this.cookies.remove("authenCookie");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
  },
};
</script>
