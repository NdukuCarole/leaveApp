<template>
  <v-footer app :inset="true" elevation="12" class="overline">
    <span style="font-size: 0.625rem">
      {{ appName }} © {{ new Date().getFullYear() }}
    </span>

    <v-spacer />

    <v-btn x-small text href="https://kinetics.co.ke/" target="_blank">
      Kinetics Technology LTD
      <v-icon x-small right> mdi-open-in-new </v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { appName } from "@/environment";
import { AuthService } from "../modules/auth";

export default {
  name: "Footer",
  props: {
    opacity: {
      type: String,
      default: "1",
    },
  },

  computed: {
    appName() {
      return appName;
    },
  },

  methods: {
    setCompany: function (company) {
      if (AuthService.check()) {
        this.$store.dispatch("Auth/setCompany", {
          default_company: company.id,
        });
      } else {
        AuthService.setCompany(company);
      }
    },
  },
};
</script>

<style scoped></style>
