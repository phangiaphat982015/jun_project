<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-card class="px-10">
        <v-card-title>
          <span v-if="itemId">Chỉnh sửa đơn vị {{ itemId }}</span>
          <span v-else>Tạo đơn vị mới</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.id"
                label="Mã đơn vị"
                variant="outlined"
                :disabled="itemId"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="editedItem.value"
                label="Tên đơn vị"
                variant="outlined"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Huỷ</v-btn>
          <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
            >Xác nhận</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main></v-app
  >
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      editedItem: {},
      itemId: null,
    };
  },

  created() {
    this.itemId = this.$route.params.id;
    this.initData();
  },

  methods: {
    initData() {
      if (this.itemId) {
        axios
          .get(`/base_unit_of_measure/${this.itemId}`)
          .then((response) => {
            this.editedItem = response.data.payload;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    cancel() {
      this.$router.push({ name: "units" });
    },

    saveItem(item) {
      if (this.itemId) {
        axios
          .put(`/base_unit_of_measure/`, item)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "units" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`/base_unit_of_measure/`, item)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "units" });
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
