<template>
  <v-card flat>
    <div>
      <v-menu
        offset-y
        left
        nudge-bottom="14"
        min-width="230"
        content-class="user-profile-menu-content"
      >
        <template v-slot:activator="{ on, attrs }">
          <div>
            <v-avatar size="40px" v-bind="attrs" v-on="on">
              <v-img
                :src="ProfilePicture"
                class="rounded"
                contain
                v-if="ProfilePicture !== ''"
              ></v-img>
              <v-img src="../../../assets/profile.jpg" v-else />
            </v-avatar>

            <span class="text-subtitle-1 font-weight-semibold mb-n1">
              <span
                >{{ user ? user.profile.firstName : "" }}{{ "" }}
                {{ user ? user.profile.lastName : "" }}</span
              >
            </span>
          </div>
        </template>
        <v-list>
          <v-divider></v-divider>

          <!-- Profile -->
          <v-list-item link @click="openBio()">
            <v-list-item-icon class="me-2">
              <v-icon size="22"> md-pencil </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-card>
</template>

<script>
import AuthService from "@/modules/auth/authService";
export default {
  name: "profileHeader",

  data: function () {
    return {
      dialog: false,
    };
  },
  components: {},

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getBio");
      v.$store.dispatch("Profile/getContact");
    });
  },

  mounted() {},

  computed: {
    user() {
      return AuthService.user;
    },
    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },

    setDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit("close-dialog", val);
      },
    },
    ProfilePicture() {
      let profile = this.bio[0];
      if (this.image_url) return this.image_url;

      return profile
        ? profile.base64ProfilePic
          ? `data:image/jpeg;base64,${profile.base64ProfilePic}` ||
            `data:image/png;base64,${profile.base64ProfilePic}`
          : ""
        : "";
    },
  },

  methods: {
    openBio: function () {
      this.$router.replace({
        name: "updateProfile",
        params: { code: this.$route.params.code },
      });
    },
    closeDialog: function (val) {
      this.dialog = val;
    },
  },
};
</script>

<style scoped>
.v-input__append-outer {
  margin-top: 8px;
}
</style>
