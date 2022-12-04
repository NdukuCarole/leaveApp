<template>
  <v-app>
    <v-container
      fluid
      class="fill-height"
      style="
        background: url('https://images.unsplash.com/photo-1590005194861-af70fa800956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')
          no-repeat;
        background-size: cover;
      "
    >
      <v-overlay opacity=".7">
        <div class="text-uppercase d-flex flex-column align-center">
          <h1 class="text-h1 mb-5">404</h1>
          <h3 class="text-h5 mb-3">Nothing here</h3>
          <v-btn text large to="/"> Go Back </v-btn>
        </div>
      </v-overlay>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Fallback",
};
</script>

<style scoped></style>
