<template>
  <v-app
    ><v-main class="container align-center">
      <v-list-item>
        <v-list-item></v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <div class="d-flex align-center justify-space-between">
          <v-list-item>
            <h2 class="font-weight-light">Dashboard</h2>
          </v-list-item>
        </div>
      </v-list-item>

      <v-list-item>
        <div class="d-flex align-center justify-space-between">
          <div class="square"></div>
          <div class="square"></div>
        </div>
      </v-list-item>
      <v-list-item>
        <div class="d-flex align-center justify-center">
          <div class="large-square"></div>
        </div> </v-list-item></v-main
  ></v-app>
</template>

<script>
export default {};
</script>

<style>
.square,
.large-square {
  padding: 12%;
  width: 49.5%;
  height: 100%;
  border: 1px solid #757575;
  border-radius: 5px;
}

.large-square {
  width: 100%;
}
</style>
