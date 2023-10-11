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
          no-action
          click
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-title v-text="item.title"></v-list-item-title
            ></v-list-item>
          </template>

          <v-list-group color="primary">
            <v-list-item
              v-if="item.items"
              v-for="(subItem, index) in item.items"
              :key="index"
              @click="changRoute(subItem.route)"
            >
              <v-list-item>
                <v-list-item-title>{{ subItem.title }}</v-list-item-title>
              </v-list-item>
            </v-list-item>
          </v-list-group>
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
          icon: "mdi-home",
          title: "Trang chủ",
          show: true,
        },
        {
          icon: "mdi-database",
          title: "Dữ liệu đầu vào",
          show: true,
          items: [
            {
              title: "Quản lý đơn hàng",
              route: "admin_orders",
              show: true,
            },
            {
              title: "Nguồn đơn hàng",
              route: "admin_sources",
              show: true,
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
    changRoute(name) {},
  },
};
</script>
