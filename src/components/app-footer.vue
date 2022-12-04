<template>
  <v-footer app :inset="true" elevation="0" class="overline" color="white">
    <span style="font-size: 0.625rem">
      {{ appName }} © {{ new Date().getFullYear() }}
    </span>

    <v-spacer />

    <v-btn x-small text href="" target="_blank">
      <v-icon x-small right> mdi-open-in-new </v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { appName } from "@/environment";

export default {
  name: "app-footer",
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
};
</script>

<style scoped></style>
