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
          <v-card-title> Leave </v-card-title>

          <v-row>
            <v-col md="12" sm="12">
              <v-form v-model="isValid" ref="leaveForm">
                <v-row dense>
                  <v-col md="6" cols="12" class="px-5">
                    <v-text-field
                      outlined
                      dense
                      v-model="formData.name"
                      :rules="rules.Field"
                      ref="LastName"
                    >
                      <template v-slot:label>
                        <div>Staff Name <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>

                  <v-col md="6" cols="12" class="px-5">
                    <v-select
                      dense
                      outlined
                      :items="['Annual', 'Paternity', 'Maternity']"
                      v-model="formData.type"
                      :rules="rules.Field"
                      ref="Title"
                      item-value="title"
                      item-text="titleDescription"
                    >
                      <template v-slot:label>
                        <div>
                          Type of Leave <span class="red--text">*</span>
                        </div>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col md="6" cols="12" class="px-5">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData.startDate"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          menu
                          outlined
                          dense
                          height="10"
                          class="issue-text-field mt-n2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template v-slot:label>
                            Start Date <span class="red--text">*</span>
                          </template>
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="formData.startDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateMenu = false">
                          Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="dateMenu = false">
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col md="6" cols="12" class="px-5">
                    <v-text-field outlined dense v-model="formData.days">
                      <template v-slot:label>
                        <div>Leave Days <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col md="6" cols="12" class="px-5">
                    <v-menu
                      v-model="enddateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData.endDate"
                          prepend-inner-icon="mdi-calendar"
                          readonly
                          menu
                          outlined
                          dense
                          height="10"
                          class="mt-n2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template v-slot:label>
                            End Date <span class="red--text">*</span>
                          </template>
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="formData.endDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="enddateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="enddateMenu = false"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col md="6" cols="12" class="px-5">
                    <v-select
                      dense
                      outlined
                      :items="['Male', 'Female']"
                      v-model="formData.handover"
                      :rules="rules.Field"
                      ref="handover"
                      item-text="name"
                      item-value="id"
                    >
                      <template v-slot:label>
                        <div>Handover <span class="red--text">*</span></div>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="8" md="6" class="px-5">
                    <v-file-input
                      accept="jpeg/png"
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
                  <v-col md="6" cols="12" class="px-5">
                    <v-text-field outlined dense v-model="formData.comments">
                      <template v-slot:label>
                        <div>Comments <span class="red--text">*</span></div>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>

          <v-divider class="mt-3"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn text @click=""> Cancel </v-btn> -->
            <v-btn color="primary" @click="saveApplication()"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Spinner />
  </v-container>
</template>

<script>
import { AuthService } from "../../auth";
import Spinner from "@/plugins/loader/views/Spinner";
import { helper } from "@/utils";

export default {
  name: "Apply",

  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Application/getUsers");
    });
  },
  components: { Spinner },
  data: function () {
    return {
      edit: false,
      isValid: false,
      Doc: undefined,
      menu: false,
      dateMenu: false,
      enddateMenu: false,
      formData: {
        days: "",
        handover: "",
        startDate: "",
        endDate: "",
        name: "",
        attachment: "",
        comments: "",
        type: "",
        applicantId: "",
      },
    };
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
    handover() {
      return this.$store.getters["Application/appGetters"]("users");
    },
  },

  methods: {
    saveApplication: function () {
      this.formData.applicantId = this.user.id;
      this.$store.dispatch(
        "Application/saveApplication",
        helper.prepareFormData({ ...this.formData })
      );
    },
    uploadFile: async function (value) {
      if (value) {
        this.formData.attachment = value;
      }
    },
  },

  watch: {},
};
</script>

<style scoped>
.transform {
  text-transform: uppercase;
}
</style>
