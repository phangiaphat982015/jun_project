<template>
  <v-app
    ><v-main class="container align-center1">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <div class="d-flex align-center justify-space-between my-5">
          <div class="d-flex">
            <v-list-item>
              <h2 class="font-weight-light">Đơn vị tính</h2>
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
          :items="units"
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
  name: "Units",

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
        { title: "Mã đơn vị", key: "id" },
        { title: "Tên đơn vị", key: "value" },
        { title: "Tuỳ chọn", key: "actions" },
      ],
      dialog: false,
      editedItem: {},
      units: [],
    };
  },

  methods: {
    fetchData() {
      axios
        .get("/base_unit_of_measure/")
        .then((response) => {
          this.units = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    create() {
      this.$router.push({ name: "create_unit" });
    },

    showEditDialog(item) {
      this.$router.push({
        name: "edit_unit",
        params: { id: item.id },
      });
    },

    deleteItem(item) {
      if (confirm("Bạn có thực sự muốn xoá?")) {
        axios
          .delete(`/base_unit_of_measure/${item.id}`)
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
