<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    color="#26c6da"
    style="background-color: #dcdcdc"
    @keypress.enter="login"
  >
    <v-row class="mt-1">
      <v-col cols="12" md="8" offset-md="2">
        <v-sheet elevation="2" rounded="xl" class="pa-10">
          <v-row>
            <v-col cols="12" md="6">
              <v-card flat>
                <v-img
                  src="../../../assets/profile.jpg"
                  height="50"
                  contain
                  class="mb-5"
                />

                <v-card-title
                  class="d-flex flex-row justify-center font-weight-black"
                >
                  LOG IN
                </v-card-title>

                <v-card-subtitle class="text-center font-weight-black">
                  For existing members with active accounts
                </v-card-subtitle>

                <v-card-text class="text-justify mt-2 pb-0">
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
                    class="mb-10"
                  >
                    {{ $store.getters["Auth/alert"].message }}
                  </v-alert>

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
                    label="Password"
                    @keypress.enter="login"
                    placeholder="Enter your password"
                    v-model="formData.password"
                    ref="password"
                    :rules="rules.password"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-card-text>

                <v-card-actions class="">
                  <v-row>
                    <v-col cols="12">
                      <v-btn @click="login" color="primary" block>
                        Login
                      </v-btn>
                    </v-col>

                    <v-btn
                      class="mt-n4 text-lowercase text-decoration-underline"
                      text
                      color="info"
                      :to="{ name: 'forgotPassword' }"
                    >
                      Forgot password?</v-btn
                    >
                    <v-col cols="12" class="mt-n4">
                      <p class="text-center overline grey--text">OR</p>
                    </v-col>

                    <v-col md="12" class="mt-n10">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :to="{ name: 'Register' }"
                            color="secondary"
                            block
                            text
                            v-bind="attrs"
                            v-on="on"
                          >
                            New Registration
                          </v-btn>
                        </template>
                        <span>For new users</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" v-if="$vuetify.breakpoint.smAndDown">
              <v-divider />
            </v-col>
            <v-divider v-else vertical />

            <v-col cols="12" md="6">
              <v-card flat>
                <v-card-title class="justify-center font-weight-black mt-4">
                  Existing Members
                </v-card-title>
                <v-card-text class="mt-n6 justify-left">
                  <br />
                  <ul>
                    <li class="mt-1">
                      Enter your email address which
                      <b>should be the same as the one used on Registration</b
                      ><br />
                    </li>
                    <li class="mt-1">
                      Enter your <b>Password</b>
                      <br />
                    </li>

                    <li class="mt-1">Login to your <b>portal</b></li>
                  </ul>
                </v-card-text>
                <v-card-title class="justify-center font-weight-black mt-4">
                  New Applicants
                </v-card-title>
                <v-card-text class="mt-n6 justify-left">
                  <br />
                  <ul>
                    <li>Click the <b> New Registration</b> button</li>
                    <li class="mt-1">
                      Follow the process to register and create an account
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import AuthAlert from "@/modules/auth/components/authAlert";
import { EventBus } from "@/utils/eventBus";
// import RequestAccess from "@/modules/auth/components/requestAccess";

export default {
  name: "login",
  // components: { RequestAccess },
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
