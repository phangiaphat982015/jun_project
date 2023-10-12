<template>
  <v-app
    ><v-main class="container align-center px-1">
      <h2 class="font-weight-light mb-2">Quản lý sản phẩm</h2>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="items"
          mobile-breakpoint="800"
          class="elevation-0"
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
          <template v-slot:activator="{ on }">
            <div class="d-flex">
              <v-btn
                color="primary"
                dark
                class="ml-auto ma-3"
                v-on:click="dialog = !dialog"
              >
                Tạo mới
                <v-icon small>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span v-if="editedItem.id"
                >Chỉnh sửa sản phẩm {{ editedItem.id }}</span
              >
              <span v-else>Tạo sản phẩm mới</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Tên"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.description"
                    label="Mô tả"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="editedItem.category"
                    label="Thể loại"
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
  components: {
    VDataTable,
  },

  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Tên", value: "name" },
        { text: "Mô tả", value: "description" },
        { text: "Thể loại", value: "url", name: "category" },
        { text: "Action", value: "actions" },
      ],
      items: [
        {
          id: "1",
          name: "sản phẩm 1",
          description: "mô tả 1",
          category: "thể loại 1",
        },
        {
          id: "2",
          name: "sản phẩm 2",
          description: "mô tả 2",
          category: "thể loại 2",
        },
        {
          id: "3",
          name: "sản phẩm 3",
          description: "mô tả 3",
          category: "thể loại 3",
        },
        {
          id: "4",
          name: "sản phẩm 4",
          description: "mô tả 4",
          category: "thể loại 4",
        },
        {
          id: "5",
          name: "sản phẩm 5",
          description: "mô tả 5",
          category: "thể loại 5",
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
