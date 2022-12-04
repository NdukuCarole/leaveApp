<template>
  <v-container class="mt-5">
    <v-data-table
      :headers="headers"
      :items="experience"
      dense
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-h6">My Experience</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            color="primary"
            dark
            small
            class="mb-2"
            @click="openEditForm()"
          >
            Add Experience
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.toDate="{ item }">
        {{ formatDate(item.toDate) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" color="blue" @click="update(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="remove(item)"> mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Experience",
  components: {
    // ExperienceCardVue,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getExperience");
    });
  },

  data: () => ({
    headers: [
      {
        text: "PositionHeld",
        align: "start",
        sortable: false,
        value: "positionHeld",
      },
      { text: "Firm", value: "nameOfFirm" },
      { text: "From", value: "fromDate" },
      { text: "To", value: "toDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    experience() {
      return this.$store.getters["Profile/experienceGetters"]("experience");
    },
  },

  methods: {
    openEditForm() {
      this.$router.push({
        name: "ExperienceCard",
      });
    },

    update: function (val) {
      this.$router.push({
        name: "ExperienceCard",
        params: { line: val.lineNo },
      });
    },

    remove(val) {
      const data = {
        fromDate: val.fromDate,
        lineNo: val.lineNo,
        nameOfFirm: val.nameOfFirm,
        positionHeld: val.positionHeld,
        profileID: val.profileID,
        responsibilitiesDescription: val.responsibilitiesDescription,
        sector: val.sector,
        toDate: val.toDate,
      };

      console.log(data);
      this.$store.dispatch("Profile/deleteExperience", data);
    },
    formatDate(val) {
      if (val === "0001-01-01") {
        return "Present";
      } else {
        return val;
      }
    },
  },
};
</script>

<style scoped></style>
