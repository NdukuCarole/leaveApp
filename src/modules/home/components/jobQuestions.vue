<template>
  <v-container class="flex-column align-content-center">
    <v-card flat class="mt-n4">
      <v-card-title>
        <v-btn text small @click="$router.back()">
          <v-icon left>mdi-arrow-left</v-icon>
          back
        </v-btn>
        <v-spacer />
        <profileHeader />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <h2 class="text-h3 mb-5 font-weight-bold primary--text">
          {{ singleJob ? singleJob.fullTitle : "N/A" }}
        </h2>
        <v-row no-gutters class="caption">
          <v-col cols="12" md="6"
            >Position: {{ singleJob ? singleJob.fullTitle : "" }}</v-col
          >
          <v-col cols="12" md="6"
            >Location: {{ singleJob ? singleJob.location : "" }}</v-col
          >
          <v-col cols="12" md="6"
            >Status: {{ singleJob ? singleJob.status : "" }}</v-col
          >
          <v-col cols="12" md="6"
            >Salary: KES
            {{ singleJob ? singleJob.minAskingSalary : "" | currencyFormat }}-{{
              singleJob ? singleJob.maxAskingSalary : "" | currencyFormat
            }}
            / {{ singleJob ? singleJob.payFrequency : "" }}</v-col
          >
        </v-row>
      </v-card-text>
      <v-divider />

      <v-card-text class="">
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            sm="12"
            md="8"
            v-for="(item, i) in questionnaireForm"
            :key="i"
          >
            <span class="black--text"
              >{{ item.question }} <span class="red--text">*</span></span
            >
            <v-select
              dense
              outlined
              :items="item.questionnaireAnswers"
              v-model="item.answer"
              :rules="rules.required"
              item-value="lineNo"
              item-text="description"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="justify-center">
        <v-spacer />

        <v-row align="center" justify="center">
          <v-col>
            <span class="red--text text-h5 font-italic caption pa-3"
              ><v-icon color="red" small>mdi-alert</v-icon>You have already
              applied to this position !</span
            >
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn :to="{ name: 'Application' }" text> Cancel </v-btn> -->
        <v-btn color="primary" @click="saveQuestions()"> Save</v-btn>

        <!-- <v-btn color="primary" @click="submitApplication()"> Submit</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import AuthService from "@/modules/auth/authService";
import profileHeader from "./profileHeader.vue";
import { EventBus } from "@/utils/eventBus";
export default {
  name: "jobQuestions",
  components: {
    profileHeader,
  },

  data: function () {
    return {
      responses: {},
      answer: "",
      no: "",

      formData: {
        jobPosting: "",
        profileID: "",
        applicantResponses: [],
      },

      questionnaireForm: [],

      rules: {
        required: [(value) => !!value || "Required."],
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getSingleJob", v.$route.params.code);
      v.$store.dispatch("Profile/getBio");
      v.$store.dispatch("Landing/getCompanyInfo");
      v.$store.dispatch("Home/getSingleApplication", {
        profileID: v.user.profileID,
        jobPosting: v.$route.params.code,
      });
    });
  },
  mounted() {
    EventBus.$on("redirectToAllapplications", () => {
      this.$router.push({
        name: "My Applications",
      });
    });
  },

  computed: {
    routeParams() {
      return this.$route.params.code;
    },

    user() {
      return AuthService.user;
    },
    singleJob: function () {
      return this.$store.getters["Home/homeGetters"]("singleJob");
    },

    vacancyQuestionnaire() {
      return this.singleJob ? this.singleJob.vacancyQuestionnaire : [];
    },
    SingleApplication: function () {
      return this.$store.getters["Home/homeGetters"]("singleApplication");
    },
    No: function () {
      return this.$store.getters["Home/homeGetters"]("singleApplication").no;
    },

    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
  },

  methods: {
    saveQuestions() {
      const Number = this.No;
      this.questionnaireForm.forEach(function (element) {
        element.applicationNo = Number;
      });
      console.log(this.questionnaireForm);
      this.$store.dispatch("Home/saveQuestions", this.questionnaireForm);
    },
    submitApplication() {
      this.$store.dispatch("Home/submitApplication", this.applicationNo);
    },
    checkApplications() {
      if (this.allApplications === 1) {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {
    vacancyQuestionnaire: {
      handler: function (n) {
        if (n) {
          n.forEach((q) => {
            this.questionnaireForm.push({
              ...q,
              ...{
                answer: "",
                profileID: this.user.profileID,
                questionnaireCode: q.questionID,
                relatedLineNo: q.lineNo,
              },
            });
          });
        }
      },
    },
  },
};
</script>

<style scoped>
.v-input__append-outer {
  margin-top: 8px;
}
</style>
