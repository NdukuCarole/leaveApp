<template>
  <v-container class="mb-5">
    <v-card v-if="!isEmpty()">
      <v-card-title>{{ singleJob ? singleJob.fullTitle : "N/A" }}</v-card-title>
      <v-card-text>
        <v-row no-gutters class="caption">
          <v-col cols="12" md="6"
            >Department: {{ singleJob ? singleJob.description : "" }}</v-col
          >
          <v-col cols="12" md="6"
            >Location: {{ singleJob ? singleJob.location : "" }}</v-col
          >
          <v-col cols="12" md="6"
            >Position:{{ singleJob ? singleJob.fullTitle : "" }}</v-col
          >
          <!-- <v-col cols="12" md="6">Location: N/A</v-col> -->
          <v-col cols="12" md="6">
            Application: {{ getStatus(singleJob.status) }}</v-col
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

      <v-card-text v-if="singleJob.description !== ''">
        <h3 class="subtitle-1">Job description</h3>

        <p class="caption text-justify">
          {{ singleJob ? singleJob.description : "" }}
        </p>
      </v-card-text>

      <v-card-text v-if="singleJob.vacancyResponsibilities.length !== 0">
        <h4 class="subtitle-2">Job Responsibilities</h4>
        <ul
          class="caption"
          v-for="resp in singleJob.vacancyResponsibilities"
          :key="resp.lineNo"
        >
          <li>{{ resp.description }}&nbsp;</li>
        </ul>
      </v-card-text>

      <v-card-text v-if="singleJob.vacancyQualifications.length !== 0">
        <h4 class="subtitle-2">Job Requirements</h4>

        <ul class="caption">
          <li v-for="req in singleJob.vacancyQualifications" :key="req.lineNo">
            {{ req.type }}- {{ req.qualificationDescription }}
            <p>{{ req.qualificationCode }} -{{ req.minQualification }}</p>
          </li>
        </ul>
      </v-card-text>
      <v-card-text v-if="singleJob.vacancyAttributes.length !== 0">
        <h4 class="subtitle-2">Mandatory Documents</h4>

        <ul class="caption">
          <li v-for="doc in singleJob.mandatoryDocs" :key="doc.entryNo">
            <p>{{ doc.description }}</p>
          </li>
        </ul>
      </v-card-text>
      <v-card-text v-if="singleJob.vacancyAttributes.length !== 0">
        <h4 class="subtitle-2">Personal Attributes</h4>

        <ul class="caption">
          <li v-for="i in singleJob.vacancyAttributes" :key="i.code">
            <p>{{ i.description }}</p>
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card v-if="isEmpty()">
      <v-skeleton-loader
        type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
      ></v-skeleton-loader
    ></v-card>

    <v-card tile flat color="white">
      <v-card-text class="primary lighten-5 px-10">
        <v-row>
          <v-col cols="12" md="8">
            <h2 class="text-h3 primary--text">Interested in this Job</h2>
            <h4 class="text-h5">Apply today</h4>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="d-flex flex-row justify-end align-center"
          >
            <v-btn
              x-large
              :disabled="isEmpty()"
              color="primary"
              :to="{ name: 'Check', params: { code: singleJob.code } }"
            >
              Apply now
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "jobCard",
  data: function () {
    return {
      departments: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getSingleJob", v.$route.params.code);
    });
  },
  computed: {
    singleJob: function () {
      return this.$store.getters["Home/homeGetters"]("singleJob");
    },
    routeParams() {
      console.log(this.$route.params.code);
      return this.$route.params.code;
    },
  },

  methods: {
    isEmpty() {
      const obj = this.singleJob;
      return Object.keys(obj).length === 0;
    },
    getStatus(val) {
      if (val === "Open") {
        return "Ongoing";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped></style>
