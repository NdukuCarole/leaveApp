<template>
  <v-container class="">
    <v-card elevation="0">
      <div class="row align-items-center mt-2">
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
          class=""
        >
          {{ $store.getters["Profile/alert"].message }}
        </v-alert>
      </div>

      <v-card-title>
        Contacts
        <v-toolbar dense elevation="0">
          <v-spacer />
        </v-toolbar>
      </v-card-title>
      <v-form v-model="isValid" ref="contactForm">
        <v-card-text class="">
          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.eMail"
                :rules="rules.Field"
                ref="eMail"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Email <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                v-model="formData.phoneNo"
                :rules="rules.Field"
                ref="phoneNo"
                type="text"
                v-on:keypress="NumbersOnly"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Phone <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                v-model="formData.phoneNo2"
                type="text"
                v-on:keypress="NumbersOnly"
                ref="phoneNo2"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Alternative Contact</div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                v-model="formData.address"
                :rules="rules.Field"
                ref="address"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Address <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                v-model="formData.placeOfWork"
                :rules="rules.Field"
                ref="placeOfWork"
                type="text"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Place Of Work <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.location"
                :rules="rules.Field"
                ref="location"
                dense
                outlined
              >
                <template v-slot:label>
                  <div>Location <span class="red--text">*</span></div>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="redirect()"> Cancel </v-btn>
        <v-btn
          color="primary"
          @click="checkContact() ? editContact() : saveContact()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <Spinner />
  </v-container>
</template>

<script>
import { AuthService } from "../../../auth";
import Spinner from "@/plugins/loader/views/Spinner";
import { EventBus } from "@/utils/eventBus";

export default {
  name: "Contact",
  components: { Spinner },

  data() {
    return {
      type: "",
      edit: true,
      isValid: false,
      formData: {
        profileID: "",
        phoneNo: "",
        eMail: "",
        address: "",
        placeOfWork: "",
        designation: "",
        address2: "",
        phoneNo2: "",
        location: "",
        city: "",
        type: "Personal",
        countryCode: "KE",
      },
    };
  },
  mounted() {
    this.$store.dispatch("Profile/getContact");
    EventBus.$on("directToApplication", () => {
      this.$router.push({
        name: "My Applications",
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

    contact() {
      return this.$store.getters["Profile/contactGetters"]("contact");
    },
  },

  methods: {
    saveContact: function () {
      if (!this.isValid) {
        this.$refs.contactForm.validate();
      } else {
        delete this.formData.status;
        this.formData.profileID = this.user.profileID;

        this.$store.dispatch("Profile/saveContact", this.formData);
      }
    },
    checkContact() {
      if (this.contact[0].address !== "") {
        return true;
      } else {
        return false;
      }
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
    editContact() {
      this.formData.profileID = this.user.profileID;

      this.$store.dispatch("Profile/editContact", this.formData);
    },
    redirect() {
      this.$router.push({
        name: "Application",
        params: { code: this.$route.params.code },
      });
    },
  },

  watch: {
    contact: {
      handler: function () {
        if (this.contact.length > 0) {
          this.formData = { ...this.contact[0] };
        }
      },
    },
  },
};
</script>

<style scoped></style>
<!--  -->
