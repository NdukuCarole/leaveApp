<template>
  <v-container class="mb-5">
    <v-card tile flat v-if="!checkLoggedIn">
      <Application />
    </v-card>
    <Login v-if="checkLoggedIn" />

    <v-card v-if="checkLoggedIn" class="overflow-hidden" height="450">
      <v-row>
        <v-col cols="12" md="8">
          <v-card flat>
            <v-skeleton-loader
              type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line,list-item-three-line, list-item-three-line"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card flat>
            <v-skeleton-loader
              type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
            ></v-skeleton-loader>
          </v-card> </v-col
      ></v-row>
    </v-card>
  </v-container>
</template>

<script>
import Login from "../../auth/components/login.vue";
import Application from "./application.vue";
import AuthService from "@/modules/auth/authService";
export default {
  name: "checkAuth",
  data: function () {
    return {
      type: "",
      toggle: false,
      code: "",
      showQuestions: false,
      selectedItem: 0,
    };
  },
  components: {
    Login,
    Application,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getSingleJob", v.$route.params.code);
      if (AuthService.check()) {
        v.$router.replace({
          name: "Academic",
        });
      }
    });
  },

  computed: {
    user() {
      return AuthService.user;
    },
    checkLoggedIn() {
      return this.user === null;
    },
    singleJob: function () {
      return this.$store.getters["Home/homeGetters"]("singleJob");
    },
  },
  methods: {
    openForm(val) {
      this.type = val;
      this.$router.push({
        name: val.code,
      });
    },
    openQuestions() {
      this.showQuestions = true;
    },
    checkArray() {
      const check = this.requirements.every(({ complete }) => !complete);
      console.log(check);
      return true;
    },
  },
};
</script>

<style scoped></style>
