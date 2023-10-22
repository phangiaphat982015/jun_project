<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-card class="px-10">
        <v-card-title>
          <span v-if="itemId">Chỉnh sửa khuyến mãi {{ itemId }}</span>
          <span v-else>Tạo loại khuyến mãi</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="editedItem.code"
                label="Mã"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="editedItem.description"
                label="Mô tả"
                variant="outlined"
              ></v-text-field>
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
        this.editedItem = this.$store.getters.getCouponById(this.itemId);
      }
    },

    cancel() {
      this.$router.push({ name: "coupons" });
    },

    saveItem(item) {
      const id = item.id;

      if (id) {
        this.$store.commit("editCoupon", item);
      } else {
        this.$store.commit("addCoupon", item);
      }

      this.editedItem = {};

      this.$router.push({ name: "coupons" });
    },
  },
};
</script>

<style scoped>
.search-text-field {
  width: 400px;
}
</style>
