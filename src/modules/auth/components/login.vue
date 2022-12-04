<template>
  <v-container class="fill-height d-flex flex-column align-content-center">
    <v-dialog v-model="dialog" persistent>
      <v-overlay opacity="0" class="black--text" absolute>
        <v-row style="width: 90vw">
          <v-col cols="12" md="4" offset-md="4">
            <v-card tile light>
              <v-card-title> Login to account </v-card-title>

              <v-card-text class="mt-5">
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

                <v-form ref="loginForm" v-model="isValid">
                  <!--User name-->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="email"
                    label="Email address"
                    :rules="rules.email"
                    v-model="formData.email"
                    outlined
                    placeholder="Enter email address"
                  />

                  <!-- Password -->
                  <v-text-field
                    @keyup.enter.prevent="login"
                    ref="password"
                    :rules="rules.password"
                    label="Password"
                    v-model="formData.password"
                    outlined
                    placeholder="Enter Password"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions class="mt-n5">
                <v-col cols="12">
                  <v-btn
                    @click="login"
                    color="primary"
                    block
                    class="mt-n5"
                    :loading="$store.getters['loading']"
                  >
                    Login
                  </v-btn>

                  <v-btn
                    class="mt-0 text-lowercase text-decoration-underline"
                    text
                    :to="{ name: 'forgotPassword' }"
                  >
                    Forgot password?</v-btn
                  >
                  <p class="text-center overline grey--text">
                    dont have an account?
                  </p>
                  <v-btn
                    :to="{ name: 'Register', params: { code: routeParams } }"
                    color="secondary"
                    block
                  >
                    register
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-overlay>

      <request-access />
    </v-dialog>
  </v-container>
</template>

<script>
// import AuthAlert from "@/modules/auth/components/authAlert";
import { EventBus } from "@/utils/eventBus";
import RequestAccess from "@/modules/auth/components/requestAccess";

export default {
  name: "login",
  components: { RequestAccess },
  data: function () {
    return {
      dialog: true,
      token: "",
      isValid: false,
      isValidSearch: false,
      isValidPassword: false,
      showPassword: false,
      step: "login",
      steps: ["login", "verify", "password"],
      memberNo: "",
      formData: {
        email: "",
        password: "",
        token: "",
      },
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
      viewPassword: false,
    };
  },

  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.$route.query.memberNo && v.$route.query.voterToken) {
        v.token = v.$route.query.voterToken;
        v.memberNo = v.$route.query.memberNo;
        v.step = "password";
      }
    });
  },

  mounted() {
    EventBus.$on("search-success", () => {
      this.step = "verify";
    });

    EventBus.$on("search-failed", (message) => {
      this.$alert({
        title: "Voter not found",
        text: message,
      });
    });

    EventBus.$on("token-verification-success", () => {
      this.step = "password";
      this.dialog = false;
    });

    EventBus.$on("token-verification-failed", (message) => {
      this.$alert({
        title: "Invalid voter token",
        text: message,
      });
    });

    EventBus.$on("token-sending-failed", (message) => {
      this.$alert({
        title: "Token not sent",
        text: message,
      });
    });
  },

  computed: {
    results() {
      return this.$store.getters["Auth/results"][0];
    },
    routeParams() {
      return this.$route.params.code;
    },
  },

  methods: {
    login: function () {
      this.$refs.loginForm.validate();
      if (this.isValid) {
        this.$store.dispatch("Auth/login", this.formData);
      }
    },

    search: function () {
      this.$refs.searchForm.validate();
      if (this.isValidSearch) {
        this.$store.dispatch("Auth/search", { memberNo: this.memberNo });
      }
    },

    setPassword: function () {
      this.$refs.passwordForm.validate();
      if (this.isValidPassword) {
        this.$store.dispatch("Auth/setPassword", {
          ...this.formData,
          voterToken: this.token,
        });
      }
    },

    sendToken: function (type) {
      this.$store.dispatch("Auth/sendToken", {
        user: { ...this.results },
        type: type,
      });
    },

    verifyToken: function () {
      this.$store.dispatch("Auth/verifyToken", {
        user: { ...this.results },
        voterToken: this.token,
      });
    },

    emailMask: function (email) {
      if (!email) return "";

      const index = email.lastIndexOf("@");
      const prefix = email.substring(0, index);
      const postfix = email.substring(index);

      const mask = prefix
        .split("")
        .map(function (o, i) {
          if (i === 0 || i === index - 1) {
            return o;
          } else {
            return "*";
          }
        })
        .join("");

      return mask + postfix;
    },

    phoneMask: function (phoneNumber) {
      return phoneNumber ? phoneNumber.replace(/\d{5}$/, "*****") : "";
    },
  },
};
</script>

<style scoped>
@import url("../styles.css");

.v-input__append-outer {
  margin-top: 8px;
}
</style>
