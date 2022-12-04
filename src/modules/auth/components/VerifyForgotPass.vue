<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <v-card height="350">
        <v-card-title class="text-h5 text-center primary lighten-2">
          <v-spacer />
          <h1 class="text-center mb-3 font-weight-light">
            <p>Verify OTP code</p>
          </h1>
          <v-spacer />
        </v-card-title>

        <v-card-text>
          <v-alert
            outlined
            v-if="$store.getters['Auth/alert'].status"
            dense
            border="left"
            :type="
              $store.getters['Auth/alert'].status === 'success'
                ? 'success'
                : 'error'
            "
            class="mt-3"
          >
            {{ $store.getters["Auth/alert"].message }}
          </v-alert>

          <v-otp-input
            length="6"
            v-model="otp_code"
            @finish="verifyOtp"
            class="mt-6"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn :loading="$store.getters['loading']" @click="sendOtp">
            Resend OTP
          </v-btn>

          <v-spacer />

          <v-btn
            :loading="$store.getters['loading']"
            :disabled="otp_code.length < 6"
            @click="verifyOtp"
            color="primary"
          >
            Verify OTP
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { EventBus } from "@/utils/eventBus";
// import AuthAlert from "@/modules/auth/components/authAlert";

export default {
  name: "Verify",
  props: {
    userEmail: String,
  },
  // components: { AuthAlert },
  data: function () {
    return {
      otp_code: "",
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters["Auth/openforgotOtp"];
      },
      set(value) {
        this.$store.dispatch("openforgotOtp", value);
      },
    },
  },

  methods: {
    verifyOtp: function () {
      const data = {
        otp: this.otp_code,
        email: this.userEmail,
      };
      this.$store.dispatch("Auth/verifyforgotOtp", data);
    },

    sendOtp: function () {
      const data = {
        email: this.userEmail,
      };
      this.$store.dispatch("Auth/sendOtp", data);
    },
  },
};
</script>

<style scoped></style>
