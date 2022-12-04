<template>
  <v-alert
    v-if="$store.getters['Auth/alert'] && $store.getters['Auth/alert'].status"
    outlined
    text
    dense
    :type="$store.getters['Auth/alert'].status"
    :color="$store.getters['Auth/alert'].status"
    dismissible
    @close="$store.commit('Auth/SET_ALERT', null)"
  >
    {{ $store.getters["Auth/alert"].message }}
  </v-alert>
</template>

<script>
export default {
  name: "authAlert",
};
</script>

<style scoped></style>
