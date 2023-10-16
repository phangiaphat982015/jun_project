<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <div class="d-flex my-5">
          <v-list-item>
            <h2 class="font-weight-light">Nhân viên</h2>
          </v-list-item>
          <v-btn color="primary" dark class="-3" v-on:click="dialog = !dialog">
            Tạo mới
            <v-icon small>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </div>
      </v-list-item>
      <v-card class="mx-7">
        <v-data-table
          :headers="headers"
          :items="items"
          mobile-breakpoint="800"
          class="elevation-0 py-3"
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
      headers: [
        { title: "Id", key: "id" },
        { title: "Tên", key: "name" },
        { title: "Chức vụ", key: "position" },
        { title: "Số điện thoại", key: "phone" },
        { title: "Action", key: "actions" },
      ],
      items: [
        {
          id: "1",
          name: "nhân viên 1",
          position: "chức vụ 1",
          phone: "số điện thoại 1",
        },
        {
          id: "2",
          name: "nhân viên 2",
          position: "chức vụ 2",
          phone: "số điện thoại 2",
        },
        {
          id: "3",
          name: "nhân viên 3",
          position: "chức vụ 3",
          phone: "số điện thoại 3",
        },
        {
          id: "4",
          name: "nhân viên 4",
          position: "chức vụ 4",
          phone: "số điện thoại 4",
        },
        {
          id: "5",
          name: "nhân viên 5",
          position: "chức vụ 5",
          phone: "số điện thoại 5",
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
