<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-btn text small :to="{ name: 'Application' }">
          <v-icon left>mdi-arrow-left</v-icon>
          back
        </v-btn>
        <v-spacer />
        <v-chip-group>
          <v-chip class="ma-2" color="blue" text-color="white">
            <v-avatar left class="blue darken-4">
              {{ allApplications }}
            </v-avatar>
            Applications
          </v-chip>

          <v-chip class="ma-2" color="warning" text-color="white">
            <v-avatar left class="warning darken-4"> 0 </v-avatar>
            In review
          </v-chip>

          <v-chip class="ma-2" color="error" text-color="white">
            <v-avatar left class="error darken-4"> 0 </v-avatar>
            Rejected
          </v-chip>

          <v-chip class="ma-2" color="green" text-color="white">
            <v-avatar left class="green darken-4"> 0 </v-avatar>
            Accepted
          </v-chip>
        </v-chip-group>
        <v-spacer />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col
            :cols="$vuetify.breakpoint.smAndDown ? '12' : '12'"
            v-if="applications.length !== 0"
          >
            <v-list>
              <v-list-item-group color="primary" v-model="selected">
                <template>
                  <v-list-item three-line v-for="i in applications" :key="i.no">
                    <template v-slot:default>
                      <v-list-item-content>
                        <v-list-item-title> {{ i.name }} </v-list-item-title>
                        <v-list-item-subtitle>
                          From : {{ i.startDate }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          To: {{ i.endDate }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="caption">
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text class="mb-5 primary--text">
                          Days: {{ i ? i.days : "" }}
                        </v-list-item-action-text>
                        <v-list-item-action-text class="mb-5 primary--text">
                          <v-chip
                            color="primary"
                            @click="viewAttachment(i.attachment)"
                            >View Report</v-chip
                          >
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!--BEGIN preview-->
    <AttachmentPreview
      :attachmentDetails="attachmentDetails"
      :dialog="dialog"
      v-on:close-dialog="closeAttachDialog"
    />
    <!--END preview-->
  </v-container>
</template>

<script>
import AttachmentPreview from "./attachmentPreview.vue";
export default {
  name: "my-applications",
  components: {
    AttachmentPreview,
  },

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Application/getApplications");
    });
  },
  data() {
    return {
      attachmentDetails: "",
      dialog: false,
      selected: 0,
    };
  },

  computed: {
    applications: function () {
      return this.$store.getters["Application/appGetters"]("applications");
    },
    allApplications() {
      return this.applications ? this.applications.length : 0;
    },
  },
  methods: {
    closeAttachDialog: function (val) {
      this.attachDialog = val;
    },

    viewAttachment: function (val) {
      this.attachmentDetails = val;
      this.dialog = true;
    },
  },
};
</script>

<style scoped></style>
