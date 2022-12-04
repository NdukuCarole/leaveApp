<template>
  <div
    class="file--attachment d-flex flex-column"
    :style="{
      border: `${Outlined ? '4' : '0'}px dashed ${fileStyles.borderColor}`,
    }"
  >
    <div
      v-ripple="{ center: true }"
      class="file--avatar--outline align-self-center"
    >
      <v-avatar
        :color="fileStyles.buttonColor"
        size="110"
        class="file--avatar"
        @click="$refs.uploader.click()"
      >
        <v-icon :color="fileStyles.iconColor" size="80"> {{ Icon }} </v-icon>
      </v-avatar>
    </div>
    <div
      v-if="uploadedFile.size > 2000000"
      class="align-self-center red--text font-weight-bold mt-3"
    >
      File is greater than 2mbs
    </div>
    <div
      v-if="uploadedFile.name === undefined"
      class="align-self-center font-weight-bold mt-3"
    >
      Add {{ IsImage ? "Profile Picture" : "file attachment" }} ({{ Accept }})
    </div>
    <div v-else class="align-self-center font-weight-bold mt-3">
      <v-chip :color="fileStyles.nameColor" class="white--text" label>
        <v-icon class="mx-1"> attach_file </v-icon>
        {{ uploadedFile.name }}
      </v-chip>
    </div>
    <input
      ref="uploader"
      type="file"
      class="d-none"
      :accept="Accept"
      style="visibility: hidden"
      @change="upload()"
    />
  </div>
</template>
<script>
export default {
  name: "FileUpload",
  props: { Outlined: Boolean, Icon: String, Accept: String, IsImage: Boolean },
  data: function () {
    return {
      uploadedFile: {},
      fileStyles: {
        borderColor: "grey",
        buttonColor: "indigo lighten-3",
        iconColor: "indigo darken-4",
        nameColor: "",
      },
      error: false,
    };
  },
  watch: {
    uploadedFile() {
      if (this.uploadedFile.name !== undefined) {
        if (this.uploadedFile.size > 2000000) {
          this.fileStyles = {
            borderColor: "red",
            buttonColor: "deep-orange lighten-3",
            iconColor: "deep-orange darken-4",
            nameColor: "deep-orange",
          };
          this.error = true;
        } else {
          this.fileStyles = {
            borderColor: "green",
            buttonColor: "green lighten-3",
            iconColor: "green darken-4",
            nameColor: "green",
          };
          this.error = false;
        }
      }
    },
  },
  methods: {
    upload() {
      const file = this.$refs.uploader.files[0];
      this.uploadedFile = file;
      this.$emit("updateFile", { file, error: this.error });
    },
  },
};
</script>
<style>
.file--attachment {
  border: 4px dashed grey;
  border-radius: 10px;
  padding: 2.5% 0 2.5% 0;
}
.file--avatar {
  cursor: pointer;
}
.file--avatar--outline {
  padding: 7.5px;
  border-radius: 100%;
  background-color: #e8eaf6;
}
</style>
