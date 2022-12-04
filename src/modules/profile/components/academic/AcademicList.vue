<template>
  <v-container class="mt-5">
    <v-data-table
      :headers="headers"
      :items="qualifications"
      dense
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-h6">Academics</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn
            outlined
            color="primary"
            dark
            small
            @click="openEditForm()"
            class="mb-2"
          >
            Add Academic
          </v-btn>
        </v-toolbar>
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
  name: "AcademicList",
  components: {},

  data() {
    return {
      type: "",
      edit: false,
      editable: true,
      dialog: false,

      headers: [
        {
          text: "Institution",
          align: "start",
          sortable: false,
          value: "institution",
        },
        { text: "Specialization", value: "areaOfSpecialization" },
        { text: "Qualififation", value: "qualificationCode" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getAcademic");
    });
  },

  computed: {
    qualifications() {
      return this.$store.getters["Profile/academicGetters"]("academic");
    },
  },

  methods: {
    openEditForm() {
      this.$router.push({
        name: "AcademicCard",
      });
    },
    update: function (val) {
      this.$router.push({
        name: "AcademicCard",
        params: { line: val.lineNo },
      });
    },
    closeDialog: function (val) {
      this.dialog = val;
    },

    remove: function (val) {
      //Todo Confirmation
      this.$store.dispatch("Profile/removeAcademic", { ...val });
    },
  },
};
</script>

<style scoped></style>
<!--  -->
