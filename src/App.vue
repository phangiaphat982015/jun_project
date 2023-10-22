<template>
  <template v-if="!isLoggedIn">
    <div
      class="d-flex align-center justify-center flex-column"
      style="height: 100vh"
    >
      <div class="d-flex">
        <v-img :width="300" cover src="./assets/main_logo.png"></v-img>
      </div>
      <div class="d-flex">
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
              type="password"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn type="submit" color="#E0F2F1" class="mt-2"
                >Đăng nhập</v-btn
              >
            </div>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </template>
  <v-app v-else id="inspire">
    <v-navigation-drawer
      color="#E0F2F1"
      fixed
      expand-on-hover
      permanent
      app
      v-model="drawer"
    >
      <v-list-item class="d-flex justify-center align-center">
        <v-img :width="160" cover src="./assets/menu_logo.png"></v-img>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-group v-for="item in items" :value="item.title">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-if="!item.subItems"
              v-bind="props"
              :prepend-icon="item.icon"
              :append-icon="null"
              :title="item.title"
              @click="changRoute(item.route)"
            ></v-list-item>

            <v-list-item
              v-else
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
            ></v-list-item>
          </template>

          <v-list-group v-for="subItem in item.subItems" :value="subItem.title">
            <template v-slot:activator="{ props }">
              <v-list-item
                @click="changRoute(subItem.route)"
                v-bind="props"
                :append-icon="null"
                :title="subItem.title"
              ></v-list-item>
            </template>
          </v-list-group>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <div class="d-flex align-center justify-space-between flex-column py-5">
        <div class="d-flex">
          <v-btn color="error" @click="logout()"
            >ĐĂNG XUẤT<v-icon class="mx-2">mdi-logout</v-icon></v-btn
          >
        </div>
      </div>
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
          title: "Dữ liệu",
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
