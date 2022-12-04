<template>
  <v-container class="mb-5">
    <v-card tile flat>
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
            >Application: {{ getStatus(singleJob.status) }}</v-col
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

      <v-card-text v-if="!lockSelection">
        <v-row>
          <v-col cols="12" md="6">
            <v-card flat>
              <v-card-title class="overline">Job Requirements</v-card-title>

              <v-card-text>
                <v-list dense>
                  <v-list-item-group v-model="selectedItem" color="primary">
                    <template>
                      <v-list-item
                        v-for="(req, i) in requirements"
                        three-line
                        :key="i"
                        @click="openForm(req)"
                      >
                        <template v-slot:default>
                          <v-list-item-avatar>
                            <v-icon
                              x-large
                              :color="req.complete ? 'success' : 'warning'"
                              >{{
                                `${
                                  req.complete
                                    ? "mdi-check-circle"
                                    : "mdi-alert-circle"
                                }`
                              }}</v-icon
                            >
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{
                              req.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ req.description }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <v-divider vertical />

          <v-col cols="12" md="">
            <router-view />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />

          <v-btn
            large
            color="primary"
            :disabled="checkArray()"
            @click="createApplication()"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card-text>
      <v-card-text v-if="lockSelection">
        <v-skeleton-loader
          type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
        ></v-skeleton-loader
      ></v-card-text>

      <v-divider />
    </v-card>
  </v-container>
</template>

<script>
import AuthService from "@/modules/auth/authService";
import profileHeader from "./profileHeader.vue";
import { EventBus } from "@/utils/eventBus";
export default {
  name: "application",
  data: function () {
    return {
      type: "",
      toggle: false,
      code: "",
      selectedItem: 0,
      lockSelection: false,
    };
  },
  components: {
    profileHeader,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getSingleJob", v.$route.params.code);
      v.$store.dispatch("Profile/getBio");
      v.$store.dispatch("Profile/getAcademic");
      v.$store.dispatch("Profile/getExperience");
      v.$store.dispatch("Profile/getReferee");
      v.$store.dispatch("Profile/getAttachment", v.user.profileID);
      v.$store.dispatch("Landing/getCompanyInfo");
    });
  },
  mounted() {
    EventBus.$on("redirectToQuestions", () => {
      this.$router.push({
        name: "Questions",
        params: { code: this.singleJob.code },
      });
    });
  },

  computed: {
    requirements() {
      return [
        {
          name: "Academic Information",
          description: "Add your academic/Professional Information",
          code: "Academic",
          complete: this.qualifications.length === 0 ? false : true,
        },
        {
          name: "Work Experience",
          description: "Add your Work Experience",
          code: "Experience",
          complete: this.experience.length === 0 ? false : true,
        },
        {
          name: "Referees",
          description: "Add your Contact references",
          code: "Referees",
          complete: this.referees.length === 0 ? false : true,
        },
        {
          name: "Attachments",
          description: "Add attachments",
          code: "Attachments",
          complete: this.attachments.length === 0 ? false : true,
        },
      ];
    },
    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
    user() {
      return AuthService.user;
    },
    checkLoggedIn() {
      return this.user === null;
    },
    singleJob: function () {
      return this.$store.getters["Home/homeGetters"]("singleJob");
    },
    qualifications() {
      return this.$store.getters["Profile/academicGetters"]("academic");
    },
    experience() {
      return this.$store.getters["Profile/experienceGetters"]("experience");
    },
    referees() {
      return this.$store.getters["Profile/refereeGetters"]("referees");
    },
    attachments() {
      return this.$store.getters["Profile/attachmentGetters"]("attachments");
    },
  },
  methods: {
    openForm(val) {
      this.type = val;
      this.$router.push({
        name: val.code,
      });
    },

    checkArray() {
      const check = this.requirements.every(({ complete }) => !complete);
      return check;
    },
    getStatus(val) {
      if (val === "Open") {
        return "Ongoing";
      } else {
        return "";
      }
    },
    createApplication() {
      const data = {
        profileID: this.user.profileID,
        jobPosting: this.$route.params.code,
      };

      this.$store.dispatch("Home/createApplication", data);
    },
  },

  watch: {
    bio: {
      handler: function () {
        if (this.bio.length > 0) {
          if (this.bio[0].firstName === "") {
            this.$router.replace({
              name: "updateProfile",
              params: { code: this.singleJob.code },
            });
          }
        }
      },
    },
  },
};
</script>

<style scoped></style>
