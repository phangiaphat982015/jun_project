<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field
          variant="outlined"
          v-model="username"
          label="User Name"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="password"
          label="Password"
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-2"
          >Đăng nhập</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>
<script>
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  data() {
    return {
      username: "",
      password: "",
    };
  },

  created() {
    let authenCookie = this.cookies.get("authenCookie");
    if (authenCookie) {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        this.cookies.set("authenCookie", "logged in");

        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
