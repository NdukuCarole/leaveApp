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
        if (v.$route.params.code) {
          v.$router.replace({
            name: "Application",
          });
        } else {
          v.$router.replace({
            name: "Home",
          });
        }
      }
    });
  },

  computed: {
    auth() {
      return AuthService;
    },

    company() {
      return this.$store.getters["Home/company"];
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
