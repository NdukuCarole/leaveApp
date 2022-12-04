<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: rgba(255, 255, 255, 0.65)"
  >
    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="px-5">
          <v-alert
            outlined
            dense
            v-if="$store.getters['Profile/alert'].status"
            border="left"
            :type="
              $store.getters['Profile/alert'].status === 'success'
                ? 'success'
                : 'error'
            "
            class="mb-10"
          >
            {{ $store.getters["Profile/alert"].message }}
          </v-alert>
          <v-card-title> Profile </v-card-title>

          <v-row>
            <v-col md="12" sm="12">
              <v-form v-model="isValid" ref="bioForm">
                <v-row dense>
                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.name"
                      :rules="rules.Field"
                      ref="LastName"
                    >
                      <template v-slot:label>
                        <div>Name <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field outlined dense v-model="formData.areaofWork">
                      <template v-slot:label>
                        <div>Wort Title <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" class="px-5"
                    ><v-select
                      dense
                      outlined
                      :items="['Single', 'Married']"
                      v-model="formData.maritalStatus"
                      :rules="rules.Field"
                      ref="maritalStatus"
                      item-value="code"
                      item-text="description"
                    >
                      <template v-slot:label>
                        <div>
                          Marital Status
                          <span class="red--text">*</span>
                        </div>
                      </template>
                    </v-select>
                  </v-col>

                  <v-col md="4" cols="12" class="px-5">
                    <v-select
                      dense
                      outlined
                      :items="['Miss', 'Mr']"
                      v-model="formData.title"
                      :rules="rules.Field"
                      ref="Title"
                      item-value="title"
                      item-text="titleDescription"
                    >
                      <template v-slot:label>
                        <div>Title <span class="red--text">*</span></div>
                      </template>
                    </v-select>
                  </v-col>

                  <v-col md="4" cols="12" class="px-5">
                    <v-select
                      dense
                      outlined
                      :items="['Male', 'Female']"
                      v-model="formData.gender"
                      :rules="rules.Field"
                      ref="Gender"
                    >
                      <template v-slot:label>
                        <div>Gender <span class="red--text">*</span></div>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>

          <v-divider class="mt-3"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="redirect()"> Cancel </v-btn>
            <v-btn color="primary" @click="saveProfile"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Spinner />
  </v-container>
</template>

<script>
import { AuthService } from "../../../auth";
import Spinner from "@/plugins/loader/views/Spinner";

export default {
  name: "Bio",
  components: { Spinner },
  data: function () {
    return {
      edit: false,
      isValid: false,
      formData: {
        address: "",
        firstName: "",
        gender: "",
        maritalStatus: "",
        title: "",
        areaofWork: "",
      },
    };
  },

  computed: {
    rules() {
      return {
        Field: [(v) => !!v || "Field is required"],
      };
    },
    user() {
      return AuthService.user;
    },
    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
  },

  methods: {
    saveProfile: function () {
      if (!this.isValid) {
        this.$refs.bioForm.validate();
      } else {
        this.$store.dispatch("Profile/saveBio", this.formData);
      }
    },

    redirect() {
      this.$router.push({
        name: "Application",
        params: { code: this.$route.params.code },
      });
    },
  },

  watch: {
    bio: {
      handler: function () {
        if (this.bio.length > 0) {
          this.formData = { ...this.bio[0] };
        }
      },
    },
  },
};
</script>

<style scoped>
.transform {
  text-transform: uppercase;
}
</style>
