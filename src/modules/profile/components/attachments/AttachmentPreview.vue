<template>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Preview <v-spacer />
        <div class="d-flex flex-column">
          <v-btn
            class="primary align-self-center mt-3"
            @click="download(base64)"
          >
            Download File
            <v-icon class="mx-2">mdi-cloud_download</v-icon>
          </v-btn>
        </div></v-card-title
      >
      <!--BEGIN display attachment-->
      <v-card-text v-if="dialog" class="attachment">
        <!--BEGIN display pdf-->

        <pdf
          v-for="i in pageCount(base64)"
          :key="i"
          :page="i"
          :src="
            base64.length !== 0
              ? `data:${mimeType};base64, ${base64}`
              : imageUrl
          "
          class=""
        ></pdf>
      </v-card-text>
      <!--END display attachment-->
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" text v-on:click="setDialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import pdf from "vue-pdf";
// import { helpers } from "../../../../utils";

export default {
  components: {
    pdf,
  },

  name: "AttachmentPreview",
  props: {
    attachmentDetails: Object,
    dialog: Boolean,
    edit: Boolean,
  },

  data: function () {
    return { imageUrl: "", mimeType: "", base64Ext: "" };
  },
  computed: {
    setDialog: {
      /**
       * Open dialog
       * @returns {boolean}
       */
      get() {
        return this.dialog;
      },
      /**
       * Close dialog
       * @param val
       */
      set(val) {
        this.$emit("close-dialog", val);
      },
    },
    isImage() {
      return /png|jpeg|xml|gif|svg|jpg/.test(this.base64Ext);
    },
    base64() {
      return this.attachmentDetails.attachment;
    },
  },
  methods: {
    /**
     * Get image mime type
     * @param base64
     * @returns {*}
     */

    /**
     * Display attachment
     * @returns {string|string}
     */
    displayAttachment() {
      if (this.base64.length !== 0) {
        return this.base64
          ? `data:${this.mimeType};base64, ${this.base64}`
          : this.imageUrl;
      }
    },
    getFileExt(fileLink) {
      return fileLink.split(".")[1];
    },
    getFileLink(fileLink) {
      return process.env.VUE_APP_FILE_API + fileLink;
    },
    downloadLink(fileLink) {
      const a = document.createElement("a");
      a.href = process.env.VUE_APP_FILE_API + fileLink;
      a.download = process.env.VUE_APP_FILE_API + fileLink;
      a.click();
    },
    download(item) {
      var a = document.createElement("a");
      //   a.href = `data:base64,${item}`;
      a.href = "data:pdf;base64," + item;
      a.download = `Attachment.pdf`;
      a.click();
    },
    pageCount: function (value) {
      if (!value) return 0;
      const bin = atob(value);
      return bin.match(/\/Type\s*\/Page\b/g).length;
    },
  },
  watch: {},
};
</script>
