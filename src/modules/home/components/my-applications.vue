<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-btn text small :to="{ name: 'Home' }">
          <v-icon left>mdi-arrow-left</v-icon>
          back
        </v-btn>
        <v-spacer />
        <v-chip-group>
          <v-chip class="ma-2" color="blue" text-color="white">
            <v-avatar left class="blue darken-4">
              {{ allApplications }}
            </v-avatar>
            Applications
          </v-chip>

          <v-chip class="ma-2" color="warning" text-color="white">
            <v-avatar left class="warning darken-4"> 0 </v-avatar>
            In review
          </v-chip>

          <v-chip class="ma-2" color="error" text-color="white">
            <v-avatar left class="error darken-4"> 0 </v-avatar>
            Rejected
          </v-chip>

          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4"> 0 </v-avatar>
            Accepted
          </v-chip>
        </v-chip-group>
        <v-spacer />
        <profileHeader />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '12' : '6'"
            v-if="applications.length !== 0"
          >
            <v-list>
              <v-list-item-group v-model="selectedJob" color="primary">
                <template>
                  <v-list-item three-line v-for="i in applications" :key="i.no">
                    <template v-slot:default>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ getTitle(i.jobPosting) }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ getDesc(i.jobPosting) }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="caption">
                          <!-- 2 Days Ago -->
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text class="mb-5 primary--text">
                          {{ i ? i.status : "" }}
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '12' : '6'"
            v-if="applications.length === 0"
          >
            <v-skeleton-loader
              type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
            ></v-skeleton-loader>
          </v-col>
          <v-divider vertical />
          <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '6'">
            <my-application class="mt-n6" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import myApplication from "./my-application.vue";
import profileHeader from "./profileHeader.vue";
import AuthService from "@/modules/auth/authService";
export default {
  name: "my-applications",
  components: {
    myApplication,
    profileHeader,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getApplications", v.user.profileID);
      v.$store.dispatch("Home/getJobs");
    });
  },
  data() {
    return {
      selectedJob: 0,
    };
  },

  computed: {
    user() {
      return AuthService.user;
    },
    applications: function () {
      return this.$store.getters["Home/homeGetters"]("applications");
    },
    jobs: function () {
      return this.$store.getters["Home/homeGetters"]("jobs");
    },
    allApplications() {
      return this.applications ? this.applications.length : 0;
    },
  },
  methods: {
    getTitle(val) {
      const data = this.jobs
        ? this.jobs.filter((d) => d.code === val)[0].fullTitle
        : "No Title";
      return data;
    },
    getDesc(val) {
      const data = this.jobs
        ? this.jobs.filter((d) => d.code === val)[0].description
        : "No Title";
      return data;
    },
  },
};
</script>

<style scoped></style>
