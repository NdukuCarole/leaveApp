<template>
  <div>
    <v-img
      v-if="company.base64Logo"
      alt="Logo"
      class="shrink mr-2"
      contain
      :src="`data:image/png;base64,${company.base64Logo}`"
      transition="scale-transition"
      width="90%"
      :height="height"
      @click="$router.push({ name: 'Home' })"
    />

    <v-img v-else :height="height" src="" contain />
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    height: {
      type: [Number, String],
      default: () => 50,
    },
  },

  computed: {
    company() {
      return this.$store.getters["Landing/landingGetters"]("company");
    },
  },
};
</script>

<style scoped></style>
