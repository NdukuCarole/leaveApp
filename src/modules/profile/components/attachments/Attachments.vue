<template>
  <v-card flat>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="attachments"
        dense
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-h6">My Attachments</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn
              outlined
              color="primary"
              dark
              small
              class="mb-2"
              @click="openEditForm()"
            >
              Add Attachment
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                color="green"
                class="mr-2"
                @click="viewAttachment(item)"
              >
                mdi-eye
              </v-icon>
            </template>
            <span>View</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                color="blue"
                class="mr-2"
                @click="update(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                color="red"
                class="mr-2"
                @click="remove(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
          <!-- <v-icon small class="mr-2" color="blue" @click="update(item)">
            mdi-pencil
          </v-icon> -->

          <!-- <v-icon small color="red" @click="remove(item)"> mdi-delete </v-icon> -->
        </template>
      </v-data-table>

      <!--BEGIN preview-->
      <AttachmentPreviewVue
        :attachmentDetails="attachmentDetails"
        :dialog="attachDialog"
        :edit="edit"
        v-on:close-dialog="closeAttachDialog"
      />
      <!--END preview-->
    </v-col>
  </v-card>
</template>

<script>
import AttachmentPreviewVue from "./AttachmentPreview.vue";
import { AuthService } from "../../../auth";
export default {
  name: "Attachments",
  components: {
    AttachmentPreviewVue,
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Profile/getBio");
      v.$store.dispatch("Profile/getAttachmentDocTypes");
      v.$store.dispatch("Profile/getAttachment", v.user.profileID);
    });
  },

  data: () => ({
    attachDialog: false,
    edit: false,
    attachmentDetails: {},

    headers: [
      {
        text: "Type",
        align: "start",
        value: "documentCode",
      },
      { text: "", value: "actions" },
    ],
  }),

  computed: {
    attachments() {
      return this.$store.getters["Profile/attachmentGetters"]("attachments");
    },
    user() {
      return AuthService.user;
    },
    bio() {
      return this.$store.getters["Profile/bioGetters"]("bio");
    },
  },

  methods: {
    openEditForm() {
      this.$router.push({
        name: "AttachmentCard",
      });
    },
    update: function (val) {
      this.$router.push({
        name: "AttachmentCard",
        params: { line: val.lineNo },
      });
    },
    closeAttachDialog: function (val) {
      this.attachDialog = val;
    },
    remove(val) {
      const data = {
        id: val.id,
        attachment: val.attachment,
      };
      const delData = {
        attachData: data,
        profileID: this.user.profileID,
      };
      this.$store.dispatch("Profile/deleteAttachment", delData);
    },
    viewAttachment: function (val) {
      this.attachmentDetails = val;
      this.edit = true;
      this.attachDialog = true;
    },
  },

  watch: {
    searchedReferee() {
      this.formData = { ...this.searchedReferee };
    },
  },
};
</script>

<style scoped></style>
