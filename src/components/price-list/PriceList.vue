<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <div class="d-flex align-center justify-space-between my-5">
          <div class="d-flex">
            <v-list-item>
              <h2 class="font-weight-light">Bảng giá</h2>
            </v-list-item>
            <v-btn color="primary" dark class="-3" @click="create">
              Tạo mới
              <v-icon small>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </div>
          <div class="d-flex">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              variant="outlined"
              class="search-text-field"
            ></v-text-field>
          </div>
        </div>
      </v-list-item>
      <v-card class="mx-7">
        <v-data-table
          :headers="headers"
          :items="getPriceList"
          mobile-breakpoint="800"
          class="elevation-0 py-3"
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <div class="text-truncate">
              <v-icon
                small
                class="mr-2"
                @click="showEditDialog(item)"
                color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)" color="pink">
                mdi-delete
              </v-icon>
            </div>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip v-if="item.status" color="green darken-2"
              >Đang hoạt động</v-chip
            >
            <v-chip v-else color="red darken-2">Ngưng hoạt động</v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-main></v-app
  >
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  name: "PriceList",

  components: {
    VDataTable,
  },

  computed: {
    getPriceList() {
      return this.$store.getters.priceList;
    },
  },

  data() {
    return {
      search: "",
      headers: [
        { title: "Mã bảng giá", key: "id" },
        { title: "Tên bảng giá", key: "name" },
        { title: "Ngày bắt đầu", key: "startDate" },
        { title: "Ngày kết thúc", key: "endDate" },
        { title: "Trạng thái", key: "status" },
        { title: "Mô tả", key: "description" },
        { title: "Tuỳ chọn", key: "actions" },
      ],
      dialog: false,
      editedItem: {},
    };
  },

  methods: {
    create() {
      this.$router.push({ name: "create_price_list" });
    },

    showEditDialog(item) {
      this.$router.push({
        name: "edit_price_list",
        params: { id: item.id },
      });
    },

    deleteItem(item) {
      if (confirm("Bạn có thực sự muốn xoá?")) {
        this.$store.commit("deletePriceList", item.id);
      }
    },
  },
};
</script>

<style scoped>
.search-text-field {
  width: 400px;
}
</style>
