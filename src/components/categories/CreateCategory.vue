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
                v-model="editedItem.code"
                label="Mã"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="editedItem.name"
                label="Tên"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Trực thuộc"
                v-model="editedItem.parents"
                :items="categories"
                item-title="name"
                item-value="id"
                chips
                multiple
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
              <div
                class="image-preview"
                v-if="editedItem.imageData?.length > 0"
              >
                <img class="preview" :src="editedItem.imageData ?? ''" />
              </div>
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
      categories: [],
      currentImage: null,
    };
  },

  created() {
    this.itemId = this.$route.params.id;
    this.initData();
    this.getCategories();
    this.createCurrentImage();
  },

  methods: {
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

        var reader = new FileReader();
        reader.onload = (e) => {
          this.editedItem.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    getCategories() {
      this.categories = this.$store.getters.categoryList;
    },

    initData() {
      if (this.itemId) {
        this.editedItem = this.$store.getters.getCategoryById(this.itemId);
      }
    },

    cancel() {
      this.$router.push({ name: "categories" });
    },

    saveItem(item) {
      const id = item.id;

      if (id) {
        this.$store.commit("editCategory", item);
      } else {
        this.$store.commit("addCategory", item);
      }

      this.editedItem = {};

      this.$router.push({ name: "categories" });
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
