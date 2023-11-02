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
              <h2 class="font-weight-light">Vị trí địa lý</h2>
            </v-list-item>
            <!-- <v-btn color="primary" dark class="-3" @click="create">
              Tạo mới
              <v-icon small>mdi-plus-circle-outline</v-icon>
            </v-btn> -->
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
          :items="locations"
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
        </v-data-table>
      </v-card>
    </v-main></v-app
  >
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import axios from "@/axios";

export default {
  name: "Employees",

  components: {
    VDataTable,
  },

  created() {
    this.fetchData();
  },

  data() {
    return {
      search: "",
      headers: [
        { title: "Mã", key: "id" },
        { title: "Thành phố / Tỉnh", key: "value1" },
        { title: "Quận / Huyện", key: "value2" },
        { title: "Phường / Xã", key: "value3" },
        // { title: "Tuỳ chọn", key: "actions" },
      ],
      dialog: false,
      editedItem: {},
      locations: [],
    };
  },

  methods: {
    fetchData() {
      axios
        .get("/structure_value/address")
        .then((response) => {
          this.locations = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    create() {
      this.$router.push({ name: "create_location" });
    },

    showEditDialog(item) {
      this.$router.push({
        name: "edit_location",
        params: { id: item.id },
      });
    },

    deleteItem(item) {
      if (confirm("Bạn có thực sự muốn xoá?")) {
        this.$store.commit("deleteLocation", item.id);
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
