<template>
  <v-dialog v-model="dialog" width="600" :persistent="step === 'password'">
    <v-card
      class="pa-7"
      tile
      elevation="5"
      :loading="$store.getters['loading']"
      :disabled="$store.getters['loading']"
    >
      <auth-alert />

      <v-card tile flat class="ma-5" v-if="step === 'verify'">
        <v-card-subtitle class="caption mb-0 text-center">
          <v-icon color="primary" small>mdi-information</v-icon>
          Don't have an account? <br />
          Start by Searching your voter registration and create your account
          <br />
          For help contact ceo@iekenya.org, iek@iekenya.org or call 0202716922,
          +254721729363
        </v-card-subtitle>
        <v-card-title>
          <v-row no-gutters class="px-5">
            <v-col cols="12" md="9">
              <v-form ref="searchForm" v-model="isValidSearch">
                <v-text-field
                  ref="memberNo"
                  :rules="rules.memberNo"
                  @keyup.enter.prevent="search"
                  placeholder="Member No"
                  v-model="memberNo"
                  dense
                  outlined
                  hint="For registered IEK Members in Fellow, Corporate and Associate"
                  persistent-hint
                  flat
                />

                <v-text-field v-show="false" />
              </v-form>
            </v-col>
            <v-col cols="12" md="3">
              <v-btn @click="search" block dark color="primary" class="ml-md-3">
                <v-icon left>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-subtitle class="mt-5">
          Voter Registration Details
        </v-card-subtitle>

        <v-card-text>
          <v-simple-table dense class="overline">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{{ results ? results.name : "" }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ results ? emailMask(results.email) : "" }}</td>
              </tr>
              <tr>
                <th>Phone No.</th>
                <td>{{ results ? phoneMask(results.phone_no) : "" }}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{{ results ? results.memberCategory : "" }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            @click="step = 'otp'"
            tile
            :disabled="!results"
          >
            Otp Verification <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card tile flat class="ma-5" v-if="step === 'otp'">
        <v-card-text class="mt-5" style="font-size: 16px">
          <p>Receive your voter token by email address or your phone number</p>

          <v-row>
            <v-col cols="12" md="6">
              <v-btn
                tile
                block
                class="mx-2"
                color="success"
                @click="sendToken('phone')"
              >
                <v-icon left>mdi-cellphone</v-icon>
                Send to Phone
              </v-btn></v-col
            >
            <v-col cols="12" md="6">
              <v-btn
                tile
                class="mx-2"
                block
                color="info"
                @click="sendToken('email')"
              >
                <v-icon left>mdi-email</v-icon>
                Send to Email
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="pa-5">
          <span class="caption">Input token received from email/phone</span>
          <v-otp-input v-model="token" length="5" @finish="verifyToken" />
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="step = 'verify'">
            <v-icon left>mdi-arrow-left </v-icon> Back
          </v-btn>

          <v-spacer />

          <v-btn tile color="primary" @click="verifyToken">
            Verify <v-icon right>mdi-check </v-icon></v-btn
          >
        </v-card-actions>
      </v-card>

      <v-card tile flat class="ma-5" v-if="step === 'password'">
        <v-card-title> Set you're account password </v-card-title>

        <v-card-text>
          <v-form ref="passwordForm" v-model="isValidPassword">
            <v-text-field
              :rules="rules.required"
              @keyup.enter.prevent="setPassword"
              v-model="formData.password"
              ref="password"
              outlined
              dense
              :type="viewPassword ? 'text' : 'password'"
              label="Password"
              placeholder="Enter New Password"
            >
              <v-icon
                @click="viewPassword = !viewPassword"
                slot="append"
                color="primary"
                >{{ viewPassword ? "mdi-eye-off" : "mdi-eye" }}</v-icon
              >
            </v-text-field>
            <v-text-field v-show="false" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn @click="setPassword" color="primary"> Set password </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from "@/utils/eventBus";
import RouterMixin from "@/mixin/RouterMixin";
import AuthAlert from "@/modules/auth/components/authAlert";

export default {
  name: "requestAccess",
  components: { AuthAlert },
  mixins: [RouterMixin],

  data: function () {
    return {
      otp: "",
      timeToResend: 60,
      timeCount: 0,
      requestStatus: "pending",
      dialog: false,
      token: "",
      isValid: false,
      isValidSearch: false,
      isValidPassword: false,
      step: "verify",
      steps: ["verify", "password"],
      memberNo: "",
      formData: {
        password: "",
        token: "",
      },
      viewPassword: false,
    };
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

    if (this.$route.query.payload) {
      let payload = JSON.parse(atob(this.$route.query.payload));
      this.token = payload.token;
      this.memberNo = payload.memberNo;
      this.step = "password";
      this.dialog = true;
    }
  },

  computed: {
    results() {
      return this.$store.getters["Auth/results"]
        ? this.$store.getters["Auth/results"][0]
        : null;
    },

    rules() {
      return {
        email: [
          (value) => {
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          },
        ],
        required: [(value) => !!value || "Required."],
        memberNo: [
          (v) => !!v || "Required.",
          (v) => {
            return (
              typeof v[0] === "string" ||
              "Member Number should be in the format M.XXXX"
            );
          },

          (v) => v[1] === "." || "Member Number should be in the format M.XXXX",
        ],
      };
    },
  },

  methods: {
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
        voterToken: this.token.toUpperCase(),
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

<style scoped></style>
