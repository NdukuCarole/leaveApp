<template>
  <v-dialog persistent v-model="dialog" max-width="60%">
    <v-form v-model="isValid" ref="expForm">
      <v-card>
        <v-card-title class="primary">
          <span class="text-h5 font-weight-black">
            {{ params ? "Edit" : "Add" }} Experience
          </span>
        </v-card-title>

        <v-card-text class="mt-10">
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
            class="mt-2"
          >
            {{ $store.getters["Profile/alert"].message }}
          </v-alert>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.nameOfFirm"
                  :rules="rules.Field"
                  ref="nameOfFirm"
                >
                  <template v-slot:label>
                    <div>
                      Employer
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select
                  dense
                  outlined
                  :items="sectors"
                  v-model="formData.sector"
                  :rules="rules.Field"
                  ref="Sector"
                  item-value="code"
                  item-text="description"
                >
                  <template v-slot:label>
                    <div>
                      Sector
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.positionHeld"
                  :rules="rules.Field"
                  ref="positionHeld"
                >
                  <template v-slot:label>
                    <div>
                      Position Held
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  type="date"
                  v-model="formData.fromDate"
                  :rules="rules.FromDate"
                  ref="FromDate"
                >
                  <template v-slot:label>
                    <div>
                      From Date
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col v-if="!current" cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  type="date"
                  v-model="formData.toDate"
                  :rules="rules.ToDate"
                  ref="ToDate"
                >
                  <template v-slot:label>
                    <div>
                      To Date
                      <span v-if="!current" class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-switch
                  inset
                  v-model="current"
                  label="Current"
                  class="mt-0 ml-1"
                />
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  dense
                  outlined
                  v-model="formData.responsibilitiesDescription"
                  :rules="rules.Field"
                  ref="Field"
                  rows="3"
                >
                  <template v-slot:label>
                    <div>
                      Key Responsibilities
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="redirectBack()"> Close </v-btn>
          <v-btn color="primary" @click="params ? Edit() : Save()">
            {{ params ? "Edit" : "Save" }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
    <Spinner />
  </v-dialog>
</template>

<script>
import { AuthService } from "../../../auth";
import { EventBus } from "@/utils/eventBus";
import Spinner from "@/plugins/loader/views/Spinner";
export default {
  name: "ExperienceCard",
  components: { Spinner },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.$route.params.line) {
        v.$store.dispatch("Profile/getSingleExp", v.$route.params.line);
      }
      v.$store.dispatch("Profile/getSectors");
    });
  },
  mounted() {
    EventBus.$on("redirectToExperience", () => {
      this.$router.push({
        name: "Academic",
      });
    });
  },

  data: () => ({
    current: false,
    dialog: true,
    isValid: false,
    formData: {
      profileID: "",
      sector: "",
      nameOfFirm: "",
      fromDate: "",
      toDate: "",
      positionHeld: "",
      responsibilitiesDescription: "",
    },
  }),

  computed: {
    params() {
      return this.$route.params.line;
    },
    rules() {
      return {
        Field: [(v) => !!v || "Field is required"],
      };
    },
    user() {
      return AuthService.user;
    },

    experienceDetails: function () {
      return this.$store.getters["Profile/experienceGetters"]("singleExp");
    },
    sectors() {
      return this.$store.getters["Profile/bioGetters"]("sectors");
    },
  },

  methods: {
    Save: function () {
      if (!this.isValid) {
        this.$refs.expForm.validate();
      } else {
        this.formData.profileID = this.user.profileID;
        this.$store.dispatch("Profile/saveExperience", this.formData);
      }
    },
    Edit: function () {
      this.formData.profileID = this.user.profileID;
      const data = this.formData;
      this.$store.dispatch("Profile/editExperience", data);
      console.log(data);
    },
    redirectBack() {
      this.$router.push({
        name: "Experience",
      });
    },
  },
  watch: {
    experienceDetails: {
      handler: function () {
        this.formData = { ...this.experienceDetails };
      },
    },
  },
};
</script>

<style scoped></style>
