<template>
  <v-dialog persistent v-model="dialog" max-width="70%">
    <v-form v-model="isValid" ref="refForm">
      <v-card>
        <v-card-title class="primary">
          <span class="text-h5 font-weight-black">
            {{ params ? "Edit" : "Add" }} Referee
          </span>
        </v-card-title>

        <v-card-text class="mt-2">
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
                  v-model="formData.name"
                  :rules="rules.Field"
                  ref="name"
                >
                  <template v-slot:label>
                    <div>
                      Name
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.phoneNo"
                  :rules="rules.Field"
                  v-on:keypress="NumbersOnly"
                  ref="phoneNo"
                >
                  <template v-slot:label>
                    <div>
                      Phone No
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.eMail"
                  :rules="rules.Field"
                  ref="eMail"
                >
                  <template v-slot:label>
                    <div>
                      Email
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.address"
                  :rules="rules.Field"
                  ref="address"
                >
                  <template v-slot:label>
                    <div>
                      Address
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.placeOfWork"
                  :rules="rules.Field"
                  ref="placeOfWork"
                >
                  <template v-slot:label>
                    <div>
                      Place of Work
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  dense
                  outlined
                  v-model="formData.designation"
                  :rules="rules.Field"
                  ref="designation"
                >
                  <template v-slot:label>
                    <div>
                      Designation
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="redirect()"> Close </v-btn>
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
import Spinner from "@/plugins/loader/views/Spinner";
import { EventBus } from "@/utils/eventBus";

export default {
  name: "RefereeCard",
  components: { Spinner },

  data: () => ({
    isValid: false,
    dialog: true,
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
  }),

  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.$route.params.line) {
        v.$store.dispatch("Profile/getOneReferee", v.$route.params.line);
      }
    });
  },
  mounted() {
    EventBus.$on("redirectToReferee", () => {
      this.$router.push({
        name: "Referees",
      });
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
    refereeDetails() {
      return this.$store.getters["Profile/refereeGetters"]("singleReferee");
    },
    params() {
      return this.$route.params.line;
    },
  },

  methods: {
    redirect() {
      this.$router.push({
        name: "Referees",
      });
    },
    Save: function () {
      if (!this.isValid) {
        this.$refs.refForm.validate();
      } else {
        this.formData.profileID = this.user.profileID;
        this.$store.dispatch("Profile/saveReferee", this.formData);
      }
    },
    Edit: function () {
      this.formData.profileID = this.user.profileID;
      const data = this.formData;
      this.$store.dispatch("Profile/editReferee", data);
      console.log(data);
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

  watch: {
    refereeDetails: {
      handler: function () {
        this.formData = { ...this.refereeDetails };
      },
    },
  },
};
</script>

<style scoped></style>
