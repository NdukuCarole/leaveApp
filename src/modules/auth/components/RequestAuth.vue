<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title>Request Access</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="memberNo"
          dense
          placeholder="Enter Your Member Number"
          label="Member No."
          persistent-placeholder
          class="search--form"
        >
          <template v-slot:prepend-inner>
            <v-icon size="30">search</v-icon>
          </template>
          <template v-slot:append>
            <v-btn
              :disabled="memberNo === null || memberNo.length === 0"
              elevation="0"
              class="primary search--button"
              @click="memberDetails"
            >
              search
            </v-btn>
          </template>
        </v-text-field>
        <v-form ref="RequestAuth"> </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "RequestAuth",
  data: function () {
    return {
      memberNo: "",
    };
  },
};
</script>
