<template>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Preview <v-spacer />
        <div class="d-flex flex-column">
          <v-btn class="primary align-self-center mt-3" @click="download()">
            Download File
            <v-icon class="mx-2">mdi-cloud_download</v-icon>
          </v-btn>
        </div></v-card-title
      >
      <!--BEGIN display attachment-->
      <v-card-text v-if="dialog" class="attachment">
        <!--BEGIN display pdf-->

        <pdf :src="`${url}${this.attachmentDetails}`"></pdf>
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
export default {
  components: {
    pdf,
  },

  name: "AttachmentPreview",
  props: {
    attachmentDetails: String,
    dialog: Boolean,
    edit: Boolean,
  },

  data: function () {
    return {
      url: process.env.VUE_APP_FILE,
    };
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

    Img() {
      return this.attachmentDetails;
    },
    viewPdf() {
      return "data:application/pdf;base64," + this.attachmentDetails;
    },
  },
  methods: {
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
    download() {
      const imgUrl = `${this.url}${this.attachmentDetails}`;
      var a = document.createElement("a");
      //   a.href = `data:base64,${item}`;
      a.href = imgUrl;
      a.download = `Attachment.jpg`;
      a.click();
    },
  },
  watch: {},
};
</script>
