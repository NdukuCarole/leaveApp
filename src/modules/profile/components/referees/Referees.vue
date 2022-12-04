<template>
  <v-card flat>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="referees"
        dense
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-h6">My Referees</v-toolbar-title>
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
              Add Referee
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" color="blue" @click="update(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="red" @click="remove(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: "Referee",

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getReferee");
    });
  },
  data: () => ({
    dialog: false,
    edit: false,
    refereeDetails: {},
    formData: {
      Name: "",
      Address: "",
      Email: "",
      PhoneNo: "",
      PlaceOfWork: "",
      Designation: "",
      MemberNo: "",
    },
    searchForm: {
      search: "",
    },
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Place of Work", value: "placeOfWork" },
      { text: "Designation", value: "designation" },

      { text: "status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    referees() {
      return this.$store.getters["Profile/refereeGetters"]("referees");
    },
  },

  methods: {
    openEditForm() {
      this.$router.push({
        name: "RefereesCard",
      });
    },

    update: function (val) {
      this.$router.push({
        name: "RefereesCard",
        params: { line: val.lineNo },
      });
    },

    remove(val) {
      this.$store.dispatch("Profile/deleteReferee", val);
    },

    NumbersOnly(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped></style>
