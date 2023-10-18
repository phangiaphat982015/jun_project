<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed expand-on-hover permanent app v-model="drawer">
      <v-list-item>
        <v-list-item> SeaShop </v-list-item>
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
export default {
  data: () => ({
    breadcrumbs: [],
    mini: true,
    drawer: null,
    menuActive: 1,
    subActive: null,
    fab: false,
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
      ];
    },
    pageTitle() {
      return "Admin";
    },
  },

  mounted() {},

  methods: {
    changRoute(name) {
      this.$router.push(name);
    },

    toggleRender() {
      if (this.$router.name === "dashboard") return false;
      return false;
    },
  },
};
</script>
