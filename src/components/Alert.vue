<template>
  <v-alert
    v-if="$store.getters['Profile/alert'].status"
    prominent
    dismissible
    text
    transition="scale-transition"
    dense
    border="left"
    :type="
      $store.getters['Profile/alert'].status === 'success' ? 'success' : 'error'
    "
  >
    <template v-slot:close="{}">
      <v-icon @click="$store.commit('Profile/SET_ALERT', null)">
        mdi-close-circle
      </v-icon>
    </template>
    {{ $store.getters["Profile/alert"].message }}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
};
</script>

<style scoped></style>
