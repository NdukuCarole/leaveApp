<template>
  <v-container>
    <v-card v-if="!isEmpty()" class="mt-n2" flat>
      <v-card-title class="mb-0 pb-0">
        <v-spacer />
        <v-btn
          small
          class="mx-1"
          :to="{ name: 'Job', params: { code: specificJob.code } }"
        >
          View Job
        </v-btn>
        <v-btn
          class="mx-1"
          color="primary"
          small
          :to="{ name: 'Check', params: { code: specificJob.code } }"
        >
          Apply
        </v-btn>
      </v-card-title>

      <v-card-title>{{
        specificJob ? specificJob.fullTitle : "N/A"
      }}</v-card-title>
      <v-card-text>
        <v-row no-gutters class="caption">
          <v-col cols="12" md="6"
            >Department: {{ specificJob ? specificJob.description : "" }}</v-col
          >
          <!-- <v-col cols="12" md="6">Type: Full-time</v-col> -->
          <v-col cols="12" md="6">Position:{{ specificJob.fullTitle }}</v-col>
          <v-col cols="12" md="6">Location: N/A</v-col>
          <v-col cols="12" md="6"
            >Application: {{ getStatus(specificJob.status) }}</v-col
          >
          <v-col cols="12" md="12" class="mt-2"
            >Salary: KES
            {{
              specificJob ? specificJob.minAskingSalary : "" | currencyFormat
            }}-{{
              specificJob ? specificJob.maxAskingSalary : "" | currencyFormat
            }}
            / {{ specificJob ? specificJob.payFrequency : "" }}</v-col
          >
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text v-if="specificJob.description !== ''">
        <h3 class="subtitle-1">Job description</h3>

        <p class="caption text-justify">
          {{ specificJob ? specificJob.description : "" }}
        </p>
      </v-card-text>

      <v-card-text
        v-if="specificJob.vacancyResponsibilities.length !== 0"
        class="mt-n4"
      >
        <h4 class="subtitle-2">Job Responsibilities</h4>
        <ul
          class="caption"
          v-for="resp in specificJob.vacancyResponsibilities"
          :key="resp.lineNo"
        >
          <li>{{ resp.description }}&nbsp;</li>
        </ul>
      </v-card-text>

      <v-card-text
        v-if="specificJob.vacancyQualifications.length !== 0"
        class="mt-n4"
      >
        <h4 class="subtitle-2">Job Requirements</h4>

        <ul class="caption">
          <li
            v-for="req in specificJob.vacancyQualifications"
            :key="req.lineNo"
          >
            {{ req.type }}- {{ req.qualificationDescription }}
            <p>{{ req.qualificationCode }} -{{ req.minQualification }}</p>
          </li>
        </ul>
      </v-card-text>
      <v-card-text
        v-if="specificJob.vacancyAttributes.length !== 0"
        class="mt-n4"
      >
        <h4 class="subtitle-2">Personal Attributes</h4>

        <ul class="caption">
          <li v-for="i in specificJob.vacancyAttributes" :key="i.code">
            <p>{{ i.description }}</p>
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-skeleton-loader
        v-if="isEmpty()"
        type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
      ></v-skeleton-loader>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "selectedJobCard",
  props: { specificJob: Object },
  data: function () {
    return {
      departments: [],
    };
  },
  computed: {
    jobs: function () {
      return this.$store.getters["Home/homeGetters"]("jobs");
    },
  },

  methods: {
    buttonClick: function () {
      alert("button click");
    },

    listClick: function () {
      alert("List click");
    },
    checkUndefined() {
      if (this.specificJob === undefined) {
        return this.jobs[0];
      }
    },
    isEmpty() {
      const obj = this.specificJob;
      if (Object.keys(obj).length === 0) {
        return true;
      } else {
        return false;
      }
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
