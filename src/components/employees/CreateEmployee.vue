<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-card class="px-10">
        <v-card-title>
          <span v-if="itemId">Chỉnh sửa nhân viên {{ itemId }}</span>
          <span v-else>Tạo nhân viên mới</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.id"
                label="Mã nhân viên"
                variant="outlined"
                :disabled="itemId"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.lastName"
                label="Tên"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.firstName"
                label="Họ"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.loginName"
                label="Tên đăng nhập"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.password"
                label="Mật khẩu"
                variant="outlined"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.addressDetail"
                label="Chi tiết địa chỉ"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Địa chỉ"
                v-model="editedItem.address"
                :items="locations"
                item-title="id"
                item-value="id"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.dayOfBirth"
                label="Ngày sinh (YYYY-MM-DD)"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.phoneNumber"
                label="Số điện thoại"
                variant="outlined"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.gender"
                label="Giới tính"
                variant="outlined"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.type"
                label="Loại"
                variant="outlined"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.email"
                label="Email"
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
import axios from "@/axios";

export default {
  data() {
    return {
      editedItem: {},
      itemId: null,
      locations: [],
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
          .get(`/user/${this.itemId}`)
          .then((response) => {
            this.editedItem = response.data.payload;
          })
          .catch((err) => {
            console.log(err);
          });
      }

      axios
        .get("/structure_value/address")
        .then((response) => {
          this.locations = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancel() {
      this.$router.push({ name: "employees" });
    },

    saveItem(item) {
      var object = {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        loginName: item.loginName,
        password: item.password,
        phoneNumber: item.phoneNumber,
        addressDetail: item.addressDetail,
        type: Number(item.type),
        dayOfBirth: item.dayOfBirth,
        email: item.email,
        gender: Number(item.gender),
        address: item.address,
      };

      if (this.itemId) {
        axios
          .put(`/user/`, object)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "employees" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`/auth/register`, object)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "employees" });
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
