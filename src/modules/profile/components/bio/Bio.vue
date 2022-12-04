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
            <v-col md="3" sm="12" class="mt-n3">
              <v-card elevation="0">
                <v-img
                  :src="ProfilePicture"
                  height="100px"
                  class="rounded"
                  contain
                ></v-img>

                <v-card-subtitle class="text-center">
                  Attach a passport Size colored photo
                </v-card-subtitle>

                <v-card-actions>
                  <v-file-input
                    outlined
                    dense
                    ref="Image"
                    type="file"
                    v-model="formData.Image"
                    @change="attachProfilePicture"
                    accept="image/png, image/jpeg"
                    append-icon="mdi-paperclip"
                  >
                    <template v-slot:label>
                      <div>Attach Photo <span class="red--text">*</span></div>
                    </template>
                  </v-file-input>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-divider vertical />

            <v-col md="9" sm="12">
              <v-form v-model="isValid" ref="bioForm">
                <v-row dense>
                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.lastName"
                      :rules="rules.Field"
                      ref="LastName"
                    >
                      <template v-slot:label>
                        <div>Last Name <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.firstName"
                      :rules="rules.Field"
                      ref="FirstName"
                    >
                      <template v-slot:label>
                        <div>First Name <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.secondName"
                      ref="SecondName"
                    >
                      <template v-slot:label>
                        <div>Other Names <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" class="px-5"
                    ><v-select
                      dense
                      outlined
                      :items="marital"
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
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.idNo"
                      :rules="rules.Field"
                      ref="idNo"
                    >
                      <template v-slot:label>
                        <div>ID No <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.linkedInURL"
                      :rules="rules.Field"
                      ref="linkedInURL"
                    >
                      <template v-slot:label>
                        <div>LinkedIn URL <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col md="4" cols="12" class="px-5">
                    <v-select
                      dense
                      outlined
                      :items="titles"
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

                  <v-col md="4" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      type="date"
                      v-model="formData.dateOfBirth"
                      :rules="rules.Field"
                      ref="DateOfBirth"
                    >
                      <template v-slot:label>
                        <div>
                          Date of Birth <span class="red--text">*</span>
                        </div>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" class="px-5">
                    <v-textarea
                      outlined
                      dense
                      rows="2"
                      v-model="formData.professionalSummary"
                      :rules="rules.Field"
                      ref="professionalSummary"
                    >
                      <template v-slot:label>
                        <div>
                          Professional Summary<span class="red--text">*</span>
                        </div>
                      </template>
                    </v-textarea>
                  </v-col>

                  <v-col md="6" cols="12" class="px-5">
                    <v-switch
                      v-model="formData.Disability"
                      ref="Disability"
                      inset
                      label="Any form of disability"
                      class="mt-0"
                    />

                    <v-textarea
                      v-if="formData.Disability && editable"
                      v-model="formData.DisabilityDescription"
                      :rules="rules.DisabilityDescription"
                      ref="DisabilityDescription"
                      outlined
                      label="Specify disability"
                      rows="2"
                    >
                      <template v-slot:label>
                        <div>
                          Specify disability <span class="red--text">*</span>
                        </div>
                      </template>
                    </v-textarea>
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
      image_url: "",
      editable: true,
      edit: false,
      isValid: false,
      formData: {
        Image: undefined,
        address: "",
        anyFormOfDisability: false,
        city: "",
        countryCode: "",
        dateOfBirth: "",
        disabilityDescription: "",
        email: "",
        firstName: "",
        gender: "",
        idNo: "",
        lastName: "",
        linkedInURL: "",
        maritalStatus: "",
        nationality: "KE",
        professionalSummary: "",
        profileID: "",
        searchName: "",
        secondName: "",
        title: "",
        base64ProfilePic: undefined,
      },
      getImageinbs64: "",
    };
  },

  computed: {
    rules() {
      return {
        profImage: [
          (v) => {
            return this.editable &&
              AuthService.user.profile &&
              !AuthService.user.profile.picture
              ? !!v || "Profile Picture is required"
              : true;
          },
          (v) => {
            return this.editable && !!v
              ? v.size < 10000000 || "Attachment should be less than 10MB"
              : true;
          },
          (v) => {
            return this.editable && !!v
              ? v.type.includes("image") || "Attachment must be an image"
              : true;
          },
        ],
        Field: [(v) => !!v || "Field is required"],
      };
    },
    user() {
      return AuthService.user;
    },
    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
    marital() {
      return this.$store.getters["Profile/bioGetters"]("maritalStatus");
    },
    titles() {
      return this.$store.getters["Profile/bioGetters"]("titles");
    },
    sectors() {
      return this.$store.getters["Profile/bioGetters"]("sectors");
    },

    ProfilePicture() {
      let profile = this.bio[0];

      if (this.image_url) return this.image_url;

      return profile
        ? profile.base64ProfilePic
          ? `data:image/jpeg;base64,${profile.base64ProfilePic}` ||
            `data:image/png;base64,${profile.base64ProfilePic}`
          : "../../../../assets/profile.jpg"
        : "../../../../assets/profile.jpg";
    },

    profImage() {
      return `data:image/jpeg;base64,${this.bio[0].base64ProfilePic}`;
    },
  },

  methods: {
    saveProfile: function () {
      if (!this.isValid) {
        this.$refs.bioForm.validate();
      } else {
        this.formData.Image = this.formData.base64ProfilePic;
        this.formData.profileID = this.user.profileID;
        this.$store.dispatch("Profile/saveBio", this.formData);
      }
    },
    convertTobase64: async function (url) {
      const data = await fetch(url);
      const blob = await data.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const base64data = reader.result;
        console.log(base64data);
        const strImage = base64data.replace(/^data:image\/[a-z]+;base64,/, "");
        this.formData.base64ProfilePic = strImage;
        return base64data;
      };
    },

    attachProfilePicture: function () {
      this["image_url"] = URL.createObjectURL(this.formData["Image"]);
      this.getImageinbs64 = this.convertTobase64(this.image_url);
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
