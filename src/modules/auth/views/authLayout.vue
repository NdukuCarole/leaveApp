<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <spinner />

    <app-alert />

    <app-footer />

    <confirmation />
  </v-app>
</template>

<script>
import Spinner from "@/plugins/loader/views/Spinner";
import AuthService from "@/modules/auth/authService";
import AppFooter from "@/components/app-footer";

export default {
  name: "authLayout",
  components: { AppFooter, Spinner },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (AuthService.check()) {
        v.$router.replace({
          name: "Application",
        });
      }
    });
  },

  computed: {
    auth() {
      return AuthService;
    },
  },

  watch: {
    "$route.name": {
      handler: function () {
        this.$store.commit("Auth/SET_ALERT", null);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
