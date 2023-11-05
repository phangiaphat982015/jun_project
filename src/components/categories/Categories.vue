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
              <h2 class="font-weight-light">Loại sản phẩm</h2>
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
          :items="categories"
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
          <template v-slot:item.imageUrl="{ item }">
            <v-img :src="item.imageUrl"></v-img>
          </template>
        </v-data-table>
      </v-card> </v-main
  ></v-app>
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import axios from "@/axios";

export default {
  name: "Employees",

  components: {
    VDataTable,
  },

  computed: {
    getCategories() {
      return this.$store.getters.categoryList;
    },
  },

  created() {
    this.fetchData();
  },

  data() {
    return {
      search: "",
      headers: [
        { title: "Mã thể loại", key: "id" },
        { title: "Link hình", key: "imageUrl" },
        { title: "Mô tả", key: "description" },
        { title: "Tên", key: "value" },
        { title: "Tuỳ chọn", key: "actions" },
      ],
      dialog: false,
      editedItem: {},
      categories: [],
    };
  },

  methods: {
    fetchData() {
      axios
        .get("/structure_value/category/level/0")
        .then((response) => {
          this.categories = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    create() {
      this.$router.push({ name: "create_category" });
    },

    showEditDialog(item) {
      this.$router.push({
        name: "edit_category",
        params: { id: item.id },
      });
    },

    deleteItem(item) {
      if (confirm("Bạn có thực sự muốn xoá?")) {
        axios
          .delete(`/structure_value/category/${item.id}`)
          .then((response) => {
            this.fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
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
