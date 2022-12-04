<template>
  <v-dialog persistent v-model="dialog" max-width="70%">
    <v-card>
      <v-form v-model="isValid" ref="academicForm">
        <v-card-title class="primary">
          <span class="text-h5 font-weight-black">
            {{ params ? "Edit" : "Add" }} Academic
          </span>
        </v-card-title>
        <v-col cols="12" md="11">
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
            class="mt-1 mb-n3"
          >
            {{ $store.getters["Profile/alert"].message }}
          </v-alert>
        </v-col>

        <v-card-text class="mt-6">
          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                outlined
                v-model="formData.institution"
                :rules="rules.Field"
                ref="institution"
              >
                <template v-slot:label>
                  <div>Institution <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-select
                dense
                outlined
                label="type"
                :items="Types"
                v-model="formData.type"
                ref="type"
              >
                <template v-slot:label>
                  <div>
                    Type
                    <span class="red--text">*</span>
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4" v-if="checkType()"
              ><v-select
                dense
                outlined
                label="Certificate Awarded"
                :items="academicCodes"
                v-model="formData.qualificationCode"
                ref="CertificateAwarded"
                item-value="code"
                item-text="description"
                :rules="rules.Field"
              >
                <template v-slot:label>
                  <div>
                    Certificate Awarded
                    <span class="red--text">*</span>
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4" v-if="checkType()"
              ><v-select
                dense
                outlined
                label="Qualification"
                :items="qualificationCodes"
                v-model="formData.grade"
                ref="Qualification"
                item-value="code"
                item-text="description"
              >
                <template v-slot:label>
                  <div>
                    Qualification
                    <span class="red--text">*</span>
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4" v-if="!checkType()"
              ><v-select
                dense
                outlined
                label="Professional Qualification"
                :items="professionalCodes"
                v-model="formData.examiningBody"
                ref="examiningBody"
                item-value="code"
                item-text="description"
              >
                <template v-slot:label>
                  <div>
                    Professional Qualification
                    <!-- <span class="red--text">*</span> -->
                  </div>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                dense
                outlined
                type="date"
                v-model="formData.startDate"
                :rules="rules.Field"
                ref="StartDate"
              >
                <template v-slot:label>
                  <div>Start Date <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                outlined
                type="date"
                v-model="formData.endDate"
                :rules="rules.Field"
                ref="EndDate"
              >
                <template v-slot:label>
                  <div>End Date <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-select
                dense
                outlined
                label="Specilization"
                :items="specializations"
                v-model="formData.areaOfSpecialization"
                :rules="rules.Field"
                ref="areaOfSpecialization"
                item-value="code"
                item-text="description"
              >
                <template v-slot:label>
                  <div>
                    Specilization
                    <span class="red--text">*</span>
                  </div>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="redirect()"> Close </v-btn>
          <v-btn color="primary" @click="params ? Edit() : Save()">
            {{ params ? "Edit" : "Save" }}</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
    <Spinner />
  </v-dialog>
</template>

<script>
import { AuthService } from "../../../auth";
import Spinner from "@/plugins/loader/views/Spinner";

export default {
  name: "AcademicCard",
  components: { Spinner },

  data() {
    return {
      editable: true,
      dialog: true,
      isValid: false,
      formData: {
        areaOfSpecialization: "",
        certificateNo: "",
        endDate: "",
        examiningBody: "",
        grade: "",
        institution: "",
        profileID: "",
        qualificationCode: "",
        qualificationDescription: "",
        startDate: "",
        type: "",
      },
      Types: ["Educational", "Professional"],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.$route.params.line) {
        v.$store.dispatch("Profile/getOneQualification", v.$route.params.line);
      }
      v.$store.dispatch("Profile/getQualificationCodes");
      v.$store.dispatch("Profile/getSpecializations");
      v.$store.dispatch("Profile/getAcademicCodes");
      v.$store.dispatch("Profile/getProfessionalCodes");
    });
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
    params() {
      return this.$route.params.line;
    },

    academicDetails() {
      return this.$store.getters["Profile/academicGetters"](
        "singleQualification"
      );
    },

    qualificationCodes() {
      return this.$store.getters["Profile/academicGetters"](
        "qualificationCodes"
      );
    },
    academicCodes() {
      return this.$store.getters["Profile/academicGetters"]("academicCodes");
    },
    specializations() {
      return this.$store.getters["Profile/academicGetters"]("specializations");
    },
    professionalCodes() {
      return this.$store.getters["Profile/academicGetters"](
        "professionalCodes"
      );
    },
    qualificationDesc() {
      return this.academicCodes.filter(
        (d) => d.code === this.formData.qualificationCode
      );
    },
  },

  methods: {
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

    redirect() {
      this.$router.push({
        name: "Academic",
      });
    },

    Edit: function () {
      this.formData.profileID = this.user.profileID;
      const data = this.formData;
      this.$store.dispatch("Profile/updateAcademic", data);
    },

    remove: function (val) {
      this.$store.dispatch("Profile/removeAcademic", { ...val });
    },

    Save: function () {
      if (!this.isValid) {
        this.$refs.academicForm.validate();
      } else {
        console.log(this.formData);
        this.formData.profileID = this.user.profileID;
        this.formData.qualificationDescription =
          this.qualificationDesc[0].description;
        this.$store.dispatch("Profile/saveAcademic", this.formData);
      }
    },
    checkType() {
      if (this.formData.type === "Educational") {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    academicDetails: {
      handler: function () {
        this.formData = { ...this.academicDetails };
      },
    },
  },
};
</script>

<style scoped></style>
<!--  -->
