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
              <h2 class="font-weight-light">Nhân viên</h2>
            </v-list-item>
            <v-btn
              color="primary"
              dark
              class="-3"
              v-on:click="dialog = !dialog"
            >
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
          :items="items"
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
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span v-if="editedItem.id"
                >Chỉnh sửa nhân viên {{ editedItem.id }}</span
              >
              <span v-else>Tạo nhân viên mới</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Tên"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.position"
                    label="Chức vụ"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Số điện thoại"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="showEditDialog()"
                >Huỷ</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
                >Xác nhận</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-main></v-app
  >
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  name: "Employees",

  components: {
    VDataTable,
  },

  data() {
    return {
      search: "",
      headers: [
        { title: "Mã nhân viên", key: "id" },
        { title: "Tên", key: "name" },
        { title: "Chức vụ", key: "position" },
        { title: "Số điện thoại", key: "phone" },
        { title: "Tuỳ chọn", key: "actions" },
      ],
      items: [
        {
          id: "NHANVIEN 1",
          name: "NHANVIEN 1",
          position: "CHUCVU 1",
          phone: "SDT 1",
        },
        {
          id: "NHANVIEN 2",
          name: "NHANVIEN 2",
          position: "CHUCVU 2",
          phone: "SDT 2",
        },
        {
          id: "NHANVIEN 3",
          name: "NHANVIEN 3",
          position: "CHUCVU 3",
          phone: "SDT 3",
        },
        {
          id: "NHANVIEN 4",
          name: "NHANVIEN 4",
          position: "CHUCVU 4",
          phone: "SDT 4",
        },
        {
          id: "NHANVIEN 5",
          name: "NHANVIEN 5",
          position: "CHUCVU 5",
          phone: "SDT 5",
        },
        {
          id: "NHANVIEN 6",
          name: "NHANVIEN 6",
          position: "CHUCVU 6",
          phone: "SDT 6",
        },
        {
          id: "NHANVIEN 7",
          name: "NHANVIEN 7",
          position: "CHUCVU 7",
          phone: "SDT 7",
        },
        {
          id: "NHANVIEN 8",
          name: "NHANVIEN 8",
          position: "CHUCVU 8",
          phone: "SDT 8",
        },
      ],
      dialog: false,
      editedItem: {},
    };
  },

  methods: {
    showEditDialog(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },
    saveItem(item) {
      const id = item.id;

      if (id) {
        const existingItemIndex = this.items.findIndex(
          (existing) => existing.id === id
        );
        if (existingItemIndex !== -1) {
          this.items[existingItemIndex] = {
            ...this.items[existingItemIndex],
            ...item,
          };
        }
      } else {
        const newId = (this.items.length + 1).toString();
        const newItem = { id: newId, ...item };
        this.items.push(newItem);
      }

      this.editedItem = {};
      this.dialog = false;
    },
    deleteItem(item) {
      const index = this.items.findIndex(
        (existingItem) => existingItem.id === item.id
      );
      if (index !== -1) {
        if (confirm("Bạn có thực sự muốn xoá?")) {
          this.items.splice(index, 1);
        }
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
