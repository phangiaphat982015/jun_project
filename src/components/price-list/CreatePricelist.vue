<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-card class="px-10">
        <v-card-title>
          <span v-if="itemId">Chỉnh sửa bảng giá {{ itemId }}</span>
          <span v-else>Tạo bảng giá mới</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3"
              ><v-row
                ><v-col cols="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Tên bảng giá"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.startDate"
                    label="Ngày bắt đầu"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.endDate"
                    label="Ngày kết thúc"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="editedItem.description"
                    label="Mô tả"
                    variant="outlined"
                  ></v-textarea> </v-col></v-row></v-col
            ><v-col cols="9"
              ><v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6"
                      ><v-card-title>
                        <span>Chi tiết</span>
                      </v-card-title></v-col
                    >
                    <v-col cols="6"
                      ><v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Tìm kiếm"
                        variant="outlined"
                        class="search-text-field"
                        clearable
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-data-table
                      :headers="productHeaders"
                      :items="editedItem.products"
                      mobile-breakpoint="800"
                      class="elevation-0 py-3"
                      :search="search"
                    ></v-data-table
                  ></v-card>
                </v-col> </v-row
            ></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            v-if="editedItem.status"
            text
            @click="deactive(editedItem)"
            >Ngưng kích hoạt</v-btn
          >
          <v-btn v-else color="green darken-1" text @click="active(editedItem)"
            >Kích hoạt</v-btn
          >
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
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  components: {
    VDataTable,
  },

  data() {
    return {
      editedItem: {},
      itemId: null,
      productHeaders: [
        { title: "Mã sản phẩm", key: "id" },
        { title: "Tên sản phẩm", key: "name" },
        { title: "Loại sản phẩm", key: "type" },
        { title: "Đơn vị cơ bản", key: "unit" },
        { title: "Hình ảnh minh hoạ", key: "url" },
        { title: "Mô tả", key: "description" },
      ],
      search: "",
    };
  },

  computed: {},

  created() {
    this.itemId = this.$route.params.id;
    this.initData();
    this.checkIfFirst();
  },

  methods: {
    checkIfFirst() {
      const priceList = this.$store.getters.priceList;

      if (priceList.length === 0) {
        this.editedItem.products = this.getProducts();
      } else {
        const latestPriceList = priceList.at(-1);
        this.editedItem.products = latestPriceList.products;
      }
    },

    getProducts() {
      return this.$store.getters.productList;
    },

    initData() {
      if (this.itemId) {
        this.editedItem = this.$store.getters.getPriceListById(this.itemId);
      }
    },

    cancel() {
      this.$router.push({ name: "price-list" });
    },

    saveItem(item) {
      const id = item.id;

      if (id) {
        this.$store.commit("editPriceList", item);
      } else {
        this.$store.commit("addPriceList", item);
      }

      this.editedItem = {};

      this.$router.push({ name: "price-list" });
    },

    active(item) {
      item.status = true;

      this.$store.commit("editPriceList", item);

      this.editedItem = {};

      this.$router.push({ name: "price-list" });
    },

    deactive(item) {
      item.status = false;

      this.$store.commit("editPriceList", item);

      this.editedItem = {};

      this.$router.push({ name: "price-list" });
    },
  },
};
</script>

<style scoped>
.search-text-field {
  width: 400px;
}
</style>
