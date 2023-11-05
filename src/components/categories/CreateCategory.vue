<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-card class="px-10">
        <v-card-title>
          <span v-if="itemId">Chỉnh sửa loại sản phẩm {{ itemId }}</span>
          <span v-else>Tạo loại sản phẩm mới</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.id"
                label="Mã"
                variant="outlined"
                :disabled="itemId ? true : false"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.value"
                label="Tên"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-textarea
                v-model="editedItem.description"
                label="Mô tả"
                variant="outlined"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Trực thuộc"
                v-model="editedItem.parent"
                :items="categories"
                item-title="value"
                item-value="id"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-file-input
                @change="previewImage"
                label="Hình ảnh"
                :prepend-icon="null"
                @click:clear="clearUploadImage"
                accept="image/*"
                :model-value="currentImage"
              ></v-file-input>
              <div class="image-preview">
                <img class="preview" :src="editedItem.imageUrl" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title v-if="subCategories.length > 0">
          <span>Loại sản phẩm trực thuộc</span>
        </v-card-title>
        <v-data-table
          v-if="subCategories.length > 0"
          :headers="headers"
          :items="subCategories"
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Huỷ</v-btn>
          <v-btn
            :loading="loading"
            color="blue darken-1"
            text
            @click="saveItem(editedItem)"
            >Xác nhận</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main></v-app
  >
</template>

<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import axios from "@/axios";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    VDataTable,
  },

  data() {
    return {
      editedItem: {},
      itemId: null,
      categories: [],
      currentImage: null,
      loading: false,
      search: "",
      headers: [
        { title: "Mã thể loại", key: "id" },
        { title: "Link hình", key: "imageUrl" },
        { title: "Tên", key: "value" },
        { title: "Tuỳ chọn", key: "actions" },
      ],
      subCategories: [],
    };
  },

  created() {
    this.itemId = this.$route.params.id;
    this.initData();
    this.getCategories();
    this.createCurrentImage();
    this.getSubcategories();
  },

  methods: {
    getSubcategories() {
      axios
        .get(`/structure_value/category/parent_id/${this.itemId}`)
        .then((response) => {
          this.subCategories = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async upload(imageName, imageData) {
      const storageRef = ref(storage, `seashop/${imageName}`);

      await uploadBytes(storageRef, imageData).then((resp) => {
        console.log(resp);
      });

      await getDownloadURL(ref(storage, `seashop/${imageName}`)).then(
        (download_url) => {
          this.editedItem.imageUrl = download_url;
        }
      );
    },

    createCurrentImage() {
      if (this.editedItem.imageData && this.editedItem.imageName) {
        this.currentImage = [
          new File([this.editedItem.imageData], this.editedItem.imageName, {
            type: "image/*",
          }),
        ];
      }
    },

    clearUploadImage() {
      this.editedItem.imageData = "";
      this.editedItem.imageName = "";
    },

    previewImage: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var file = input.files[0];
        var fileName = file.name;
        this.editedItem.imageName = fileName;
        this.editedItem.imageFile = file;

        var reader = new FileReader();
        reader.onload = (e) => {
          this.editedItem.imageData = e.target.result;
          this.editedItem.imageUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    getCategories() {
      axios
        .get("/structure_value/category/")
        .then((response) => {
          this.categories = response.data.payload;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    initData() {
      if (this.itemId) {
        axios
          .get(`/structure_value/category/${this.itemId}`)
          .then((response) => {
            this.editedItem = response.data.payload;
            if (response.data.payload.parent.id) {
              this.editedItem.parent = response.data.payload.parent.id;
            }
            this.editedItem.imageUrl = response.data.payload.imageUrl;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    cancel() {
      this.$router.push({ name: "categories" });
    },

    async saveItem(item) {
      this.loading = true;
      await this.upload(item.imageName, item.imageFile);

      const level = await this.getLevel(item.parent);

      console.log(level);

      const payload = {
        id: item.id,
        value: item.value,
        description: item.description,
        level: level,
        parentId: item.parent,
        imageUrl: this.editedItem.imageUrl,
      };

      if (this.itemId) {
        axios
          .put(`/structure_value/category`, payload)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "categories" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`/structure_value/category`, payload)
          .then((response) => {
            this.editedItem = {};
            this.$router.push({ name: "categories" });
          })
          .catch((err) => {
            console.log(err);
          });
      }

      this.loading = false;
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
            this.$router.push({
              name: "categories",
              params: { id: item.id },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async getLevel(parentId) {
      var parent = null;
      if (!parentId) {
        return 0;
      } else {
        axios
          .get(`/structure_value/category/get_parents/${parentId}`)
          .then((response) => {
            parent = response.data.payload?.parent;
          })
          .catch((err) => {
            console.log(err);
          });

        if (parent) {
          return 2;
        } else {
          return 1;
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
img.preview {
  width: 100%;
  height: 350px;
  object-fit: cover;
}
</style>
