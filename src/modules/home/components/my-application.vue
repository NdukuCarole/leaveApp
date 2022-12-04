<template>
  <v-container>
    <v-card flat class="my-5">
      <v-card-title>
        Application name, date

        <v-spacer />

        <v-btn text small color="error"> Cancel Application </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-stepper v-model="e6" vertical flat>
          <v-stepper-step :complete="e6 > 1" step="1">
            First Interview
            <small class="mt-1">Remote Call</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Technical Interview
            <small class="mt-1">Technical challenge</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Final Interview
            <small class="mt-1">One on one meeting</small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">
            Offer letter
            <small class="mt-1">Offer negotiations and acceptance letter</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 5"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step step="5">
            On-boarding
            <small class="mt-1">Employee on-boarding</small>
          </v-stepper-step>
          <v-stepper-content step="5">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "my-application",
  data() {
    return {
      e6: 1,
    };
  },
};
</script>

<style scoped></style>
