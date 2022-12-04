<template>
  <v-container class="fill-height">
    <v-card-text>
      <v-skeleton-loader
        type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
      ></v-skeleton-loader
    ></v-card-text>

    <v-dialog v-model="dialog" max-width="75%" persistent>
      <template>
        <v-card>
          <v-toolbar color="primary" dark flat dense>
            <template v-slot:extension>
              <v-tabs v-model="tabs" centered>
                <v-tab v-for="n in headers" :key="n.title">
                  <v-icon>{{ n.icon }}</v-icon
                  >{{ n.title }}
                </v-tab>
              </v-tabs>
            </template>
            <v-spacer />
          </v-toolbar>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card flat>
                <Bio />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <Contact />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card> </template
    ></v-dialog>
  </v-container>
</template>

<script>
import Bio from "./bio/Bio";
import Contact from "./contact/Contact";
export default {
  name: "updateProfile",
  components: { Bio, Contact },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getBio");
      v.$store.dispatch("Profile/getMaritalStatus");
      v.$store.dispatch("Profile/getTitles");
      v.$store.dispatch("Profile/getSectors");
      v.$store.dispatch("Profile/getContact");
    });
  },

  data: function () {
    return {
      edit: false,
      dialog: true,
      formData: {
        LastName: "",
        FirstName: "",
        SecondName: "",
        Gender: "",
        Title: "",
        DateOfBirth: "",
        IDImage: undefined,
        ID: "",
        Nationality: "KE",
        Discipline: "",
        Disability: false,
        DisabilityDescription: "",
        Image: undefined,
      },
      rules: {
        required: [(value) => !!value || "Required."],
      },
      editable: false,
      tabs: null,
      headers: [
        { title: "Profile", icon: "mdi-account" },
        { title: "Contacts", icon: "mdi-phone" },
      ],
    };
  },

  mounted() {},

  computed: {
    setDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit("close-dialog", val);
      },
    },
  },

  methods: {},
};
</script>

<style scoped>
.v-input__append-outer {
  margin-top: 8px;
}
</style>
