<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="6" class="d-flex align-center">
        <div>
          <v-row>
            <v-col cols="12" class="text-center">
              <v-icon color="primary" class="text-h1">mdi-lock-alert</v-icon>
              <h1
                class="text-h4 text-sm-h5 font-weight-bold primary--text mb-md-5"
              >
                Lost your account ?
              </h1>

              <h4 class="text-h6 text-sm-h6 mb-md-7 mb-sm-3">
                You can request a link to reset your password
              </h4>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="12" v-if="$vuetify.breakpoint.smAndDown">
        <v-divider class="my-7" />
      </v-col>

      <v-col
        cols="12"
        md="5"
        offset-md="1"
        class="flex-column justify-center align-center"
      >
        <v-card class="pa-5">
          <auth-alert />

          <v-card-title class="text-center"> Find your Account </v-card-title>

          <v-card-text>
            <v-alert
              v-if="$store.getters['Auth/error']"
              text
              outlined
              color="warning"
              icon="mdi-alert"
            >
              {{ $store.getters["Auth/error"] }}
            </v-alert>

            <v-form ref="forgetForm" v-model="isValid">
              <!-- Email -->
              <v-text-field
                @keyup.enter.prevent="reset"
                ref="email"
                :rules="rules.email"
                v-model="formData.email"
                outlined
                label="Email"
                placeholder="Enter email"
              />
              <v-text-field v-show="false" />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <request-access />

            <v-spacer />

            <v-btn @click="reset" color="primary" tile large>
              Send Reset Link
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="primary lighten-1"> Verify OTP </v-card-title>
        <v-card-text class="pa-5">
          <span class="caption">
            Check your phone or email for the OTP Code
          </span>

          <v-otp-input v-model="otp" length="6" @finish="verifyOtp" />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-btn @click="sendOtp" :loading="$store.getters['loading']">
            Resend
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="verifyOtp"> Verify </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import AuthAlert from "@/modules/auth/components/authAlert";
import { EventBus } from "@/utils/eventBus";
import RouterMixin from "@/mixin/RouterMixin";
import RequestAccess from "@/modules/auth/components/requestAccess";

export default {
  name: "forgotPassword",

  components: { RequestAccess, AuthAlert },
  mixins: [RouterMixin],
  data: function () {
    return {
      dialog: false,
      otp: "",
      formData: {
        email: "",
      },
      userEmail: "",
      rules: {
        email: [
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
        ],
        required: [(value) => !!value || "Required."],
      },
      isValid: false,
    };
  },

  mounted() {
    EventBus.$on("forgot-otp-sent", () => {
      this.dialog = true;
    });

    EventBus.$on("otp-verification-success", () => {
      this.$router.push({
        name: "setPassword",
        params: { code: this.encodeRoute(this.otp) },
      });
    });
  },
  methods: {
    reset: function (e) {
      e.preventDefault();

      this.$refs.forgetForm.validate();
      if (this.isValid) {
        this.$store.dispatch("Auth/forgotPassword", this.formData);
      }
    },

    verifyOtp: function () {
      const data = {
        otp: this.otp,
        email: this.formData.email,
      };

      this.$store.dispatch("Auth/verifyforgotOtp", data);
    },
    sendOtp: function () {
      const data = {
        email: this.this.formData.email,
      };
      this.$store.dispatch("Auth/sendOtp", data);
    },
  },
};
</script>

<style scoped></style>
