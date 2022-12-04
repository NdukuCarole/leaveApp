<template>
  <v-dialog persistent v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title class="primary">
        <span class="text-h5 font-weight-black">
          {{ params ? "Edit" : "Add" }} Attachment
        </span>
      </v-card-title>
      <v-form v-model="isValid" ref="attachForm">
        <v-card-text class="mt-2">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-select
                  dense
                  outlined
                  :items="attachmentDocTypes"
                  v-model="formData.documentCode"
                  ref="Type"
                  item-value="code"
                  item-text="description"
                  :rules="rules.Field"
                >
                  <template v-slot:label>
                    <div>
                      Type
                      <span class="red--text">*</span>
                    </div>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-file-input
                  accept="application/pdf"
                  :rules="rules.Field"
                  dense
                  prepend-icon="mdi-paperclip"
                  outlined
                  @change="uploadFile"
                  v-model="Doc"
                  ><template v-slot:label>
                    <div>
                      Attachment
                      <span class="red--text">*</span>
                    </div>
                  </template></v-file-input
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text></v-form
      >

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="redirect()"> Close </v-btn>
        <v-btn color="primary" @click="params ? Edit() : Save()">
          {{ params ? "Edit" : "Save" }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <Spinner />
  </v-dialog>
</template>

<script>
import { helper } from "../../../../utils";
import { AuthService } from "../../../auth";
import Spinner from "@/plugins/loader/views/Spinner";
import { EventBus } from "@/utils/eventBus";

export default {
  name: "AttachmentCard",
  components: { Spinner },

  data: () => ({
    formData: {
      documentCode: "",
      relatedRecordId: "",
      attachment: "",
    },
    isValid: false,
    Doc: undefined,
    dialog: true,
  }),

  mounted() {
    EventBus.$on("redirectToAttachment", () => {
      this.$router.push({
        name: "Attachments",
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (v.$route.params.line) {
        v.$store.dispatch("Profile/getOneAttachment", v.$route.params.line);
      }
      v.$store.dispatch("Profile/getAttachmentDocTypes");
    });
  },

  computed: {
    rules() {
      return {
        Field: [(v) => !!v || "Field is required"],
        attachment: [
          (v) => !!v || "Attachment is required",

          (v) =>
            (!!v && v.size < 10000000) || "Attachment should be less than 10MB",

          (v) =>
            (!!v && v.type.includes("application/pdf")) ||
            "Attachment must be a Pdf",
        ],
      };
    },

    attachmentDocTypes() {
      return this.$store.getters["Profile/attachmentGetters"](
        "attachmentDocTypes"
      );
    },

    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
    user() {
      return AuthService.user;
    },
    attachmentDetails() {
      return this.$store.getters["Profile/attachmentGetters"](
        "singleAttachment"
      );
    },
    params() {
      return this.$route.params.line;
    },
  },

  methods: {
    redirect() {
      this.$router.push({
        name: "Attachments",
      });
    },
    Save: function () {
      if (!this.isValid) {
        this.$refs.attachForm.validate();
      } else {
        this.formData.relatedRecordId = this.bio[0].id;
        console.log(this.formData);
        const data = {
          attachData: helper.prepareFormData({ ...this.formData }),
          profileID: this.user.profileID,
        };
        this.$store.dispatch(
          `Profile/saveAttachment`,
          data
          // helper.prepareFormData({ ...this.formData }),
          // this.user.profileID
        );
      }
    },
    uploadFile: async function (value) {
      if (value) {
        this.formData.attachment = value;
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
    Edit: function () {
      this.formData.relatedRecordId = this.bio[0].id;
      const patchData = {
        id: this.formData.id,
        attachment: this.formData.attachment,
      };
      delete this.formData.id;
      const data = {
        attachData: helper.prepareFormData({ ...patchData }),
        profileID: this.user.profileID,
      };
      this.$store.dispatch(`Profile/editAttachment`, data);
    },
  },

  watch: {
    attachmentDetails() {
      this.formData = { ...this.attachmentDetails };
    },
  },
};
</script>

<style scoped></style>
