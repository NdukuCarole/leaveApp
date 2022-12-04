<template>
  <v-app>
    <v-app-bar app dense color="primary">
      <v-spacer />

      <v-btn
        dark
        v-if="!auth.check()"
        text
        :to="{ name: 'Login' }"
        class="mx-2"
      >
        Login
      </v-btn>

      <v-btn text v-else @click="$store.dispatch('Auth/logout')">
        Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <loader />

    <app-footer />

    <app-alert />
  </v-app>
</template>

<script>
import { AuthService } from "@/modules/auth";

export default {
  name: "home",

  beforeRouteEnter(to, from, next) {
    next(() => {});
  },

  computed: {
    auth() {
      return AuthService;
    },
  },
};
</script>

<style scoped></style>
