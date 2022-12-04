<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: rgba(255, 255, 255, 0.65)"
  >
    <v-row>
      <v-col md="4" sm="12" offset-md="4">
        <v-card class="pa-5">
          <v-card-title class="text-h4 d-flex flex-row justify-center">
            SET PASSWORD
          </v-card-title>
          <v-card-subtitle class="text-center">
            Set a new password
          </v-card-subtitle>

          <v-card-text class="text-justify mt-4 pb-0">
            <auth-alert />

            <v-form ref="passwordForm" v-model="isValid">
              <v-text-field
                dense
                outlined
                @keyup.enter.prevent="reset"
                label="Mobile No."
                placeholder="Enter Mobile No."
                v-model="formData.phone"
                ref="phone"
                :rules="rules.phone"
              />
              <v-text-field
                dense
                outlined
                label="Email Address"
                placeholder="Enter your Email Address"
                v-model="formData.email"
                ref="email"
                :rules="rules.email"
              />
              <v-text-field
                dense
                outlined
                @keyup.enter.prevent="reset"
                label="OTP code."
                placeholder="Enter otp."
                v-model="formData.otp"
                ref="otp"
                :rules="rules.otp"
              />
              <v-text-field
                ref="password"
                @keyup.enter.prevent="reset"
                v-model="formData.password"
                dense
                outlined
                label="New Password"
                placeholder="Enter a secure password"
                :rules="rules.password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
              <v-btn
                class="mt-n8 ml-n3 primary--text text-lowercase"
                @click="sendOtp"
                text
              >
                Resend Otp</v-btn
              >

              <!-- <v-text-field
                ref="confirmPassword"
                @keyup.enter.prevent="reset"
                v-model="formData.confirmPassword"
                dense
                outlined
                type="password"
                label="Confirm Password"
                placeholder="Enter Password again"
                :rules="rules.confirmPassword"
              /> -->

              <v-btn
                class="text-left my-3"
                color="primary"
                block
                @click="reset"
              >
                Set Password
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RouterMixin from "../../../mixin/RouterMixin";
import { EventBus } from "@/utils/eventBus";
import AuthAlert from "@/modules/auth/components/authAlert";

export default {
  name: "password",
  components: { AuthAlert },
  mixins: [RouterMixin],
  data: function () {
    return {
      isValid: false,
      showPassword: false,
      formData: {
        password: "",
        otp: "",
        phone: "",
        email: "",
      },
    };
  },

  computed: {
    rules() {
      return {
        password: [(v) => !!v || "Password is required"],
        phone: [(v) => !!v || "Phone is required"],
        otp: [(v) => !!v || "otp is required"],
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
        ],
      };
    },
  },

  mounted() {
    EventBus.$on("password-set-success", () => {
      this.$alert({
        title: "Password set Success",
        text: "You have successfully set your password, login to continue",
        onClose: () => {
          this.$router.push("/");
        },
      });
    });
  },

  methods: {
    reset: function () {
      this.$refs.passwordForm.validate();
      if (this.isValid) {
        this.formData.otp = this.decodeRoute(this.$route.params.code);
        this.$store.dispatch("Auth/resetPassword", {
          ...this.formData,
        });
      }
    },
    sendOtp: function () {
      const data = {
        email: this.formData.email,
      };
      this.$store.dispatch("Auth/sendOtp", data);
    },
  },
};
</script>

<style scoped></style>
