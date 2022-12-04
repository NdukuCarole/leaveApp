<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    color="#26c6da"
    style="background-color: #dcdcdc"
  >
    <v-row>
      <v-col md="4" sm="12" offset-md="4">
        <v-card>
          <v-card-title
            class="d-flex flex-row justify-center font-weight-black"
          >
            REGISTER
          </v-card-title>
          <v-alert
            outlined
            dense
            v-if="$store.getters['Auth/alert'].status"
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

          <v-card-text class="text-justify mt-4 pb-0">
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
              label="Mobile No."
              placeholder="Enter Mobile No."
              v-model="formData.phone"
              ref="phone"
              :rules="rules.phone"
            />

            <v-text-field
              dense
              outlined
              label="Password"
              placeholder="Enter your Password"
              v-model="formData.password"
              ref="password"
              :rules="rules.password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
            <!-- <v-text-field
              dense
              outlined
              label="Password"
              placeholder="Confirm Password"
              v-model="formData.confirmPassword"
              ref="confirmPassword"
              :rules="rules.confirmPassword"
              :append-icon="showConfPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showConfPassword ? 'text' : 'password'"
              @click:append="showConfPassword = !showConfPassword"
            /> -->
          </v-card-text>
          <v-card-actions class="d-flex flex-row justify-end">
            <v-btn @click="register" block color="primary">
              Create my account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Verify :userEmail="userEmail" />
  </v-container>
</template>

<script>
// import { EventBus } from "@/utils/eventBus";
import Verify from "./Verify";
export default {
  name: "Register",
  components: {
    Verify,
  },

  data: function () {
    return {
      formData: {
        email: "",
        phone: "",
        password: "",
      },
      userEmail: "",
      showPassword: false,
      showConfPassword: false,
      isFirm: false,
    };
  },

  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Password is required"],
        phone: [(v) => !!v || "Phone is required"],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
        ],
      };
    },

    requirements() {
      return this.$store.getters["Auth/requirements"];
    },
  },

  methods: {
    register: function () {
      let isValid = true;
      for (const key in this.formData) {
        if (this.$refs[key])
          isValid = isValid ? this.$refs[key].validate(true) : false;
      }

      if (isValid)
        this.$store.dispatch("Auth/register", {
          ...this.formData,
        });
      this.userEmail = this.formData.email;
    },
  },
};
</script>

<style scoped></style>
