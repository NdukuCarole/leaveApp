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
                      <v-btn @click="login()" color="primary" block>
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
import { EventBus } from "@/utils/eventBus";

export default {
  name: "login",

  data: function () {
    return {
      isValid: false,
      showPassword: false,
      formData: {
        email: "",
        password: "",
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

  mounted() {
    EventBus.$on("search-success", () => {
      this.step = "verify";
    });
  },

  computed: {},
  methods: {
    login: function () {
      this.$store.dispatch("Auth/login", this.formData);
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
