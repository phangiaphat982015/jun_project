<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed expand-on-hover permanent app v-model="drawer">
      <v-list-item>
        <v-list-item> SeaShop </v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-group
          v-for="(item, i) in items"
          :key="i"
          :prepend-icon="item.icon"
          append-icon="null"
          no-action
          click
        >
          <template v-slot:activator>
            <v-list-item @click="changRoute(item.route)">
              <v-list-item-title v-text="item.title"></v-list-item-title
            ></v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
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
          icon: "mdi-package",
          title: "Sản phẩm",
          show: true,
          route: "/products",
        },
        {
          icon: "mdi-calculator",
          title: "Đơn vị tính",
          show: true,
          route: "/units",
        },
        {
          icon: "mdi-cash",
          title: "Bảng giá",
          show: true,
          route: "/price-list",
        },
        {
          icon: "mdi-account-group",
          title: "Khách hàng",
          show: true,
          route: "/customers",
        },
        {
          icon: "mdi-account-cowboy-hat",
          title: "Nhân viên",
          show: true,
          route: "/employees",
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
