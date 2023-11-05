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
import axios from "@/axios";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      editedItem: {},
      itemId: null,
      categories: [],
      currentImage: null,
      loading: false,
    };
  },

  created() {
    this.itemId = this.$route.params.id;
    this.initData();
    this.getCategories();
    this.createCurrentImage();
  },

  methods: {
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
      const payload = {
        id: item.id,
        value: item.value,
        description: item.description,
        level: 0,
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
