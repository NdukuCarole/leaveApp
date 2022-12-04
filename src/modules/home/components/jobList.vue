<template>
  <div>
    <v-container>
      <v-card flat class="pa-5">
        <v-row>
          <v-col cols="12" md="7">
            <v-card tile flat class="py-3">
              <h1 class="mb-2">Life’s not about a job, it’s about purpose.</h1>
              <h5 class="subtitle-1 mb-5">
                Join our passionate community of solvers. Help organizations
                build trust and deliver sustained outcomes
              </h5>

              <v-btn color="primary" tile @click="$refs.search.focus()">
                Search jobs
                <v-icon right>mdi-magnify</v-icon>
              </v-btn>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" v-if="$vuetify.breakpoint.mdAndUp">
            <v-img contain src="/img/career.svg" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container>
      <v-card flat class="pa-5" id="search-jobs">
        <v-card-text>
          <v-text-field
            outlined
            label="Search"
            placeholder="Search by Title or keyword"
            color="primary"
            ref="search"
            v-model="search"
          />
          <div class="d-flex">
            <v-chip-group active-class="primary" column v-model="departments">
              <v-chip
                filter
                v-for="cat in categories"
                :key="cat.code"
                @click="filterJobs(cat)"
              >
                {{ cat.description }}
              </v-chip>
            </v-chip-group>
            <!-- <div>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="ml-2"
                    @click="clearFilter()"
                    small
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-close-circle
                  </v-icon>
                </template>
                <span>Remove Filter</span>
              </v-tooltip>
            </div> -->
          </div>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="7" v-if="jobs.length !== 0">
              <v-list>
                <v-list-item-group v-model="selectedJob" color="primary">
                  <template v-for="(item, index) in allitems()">
                    <v-list-item three-line :key="item.code">
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title
                            class="font-weight-bold primary--text overline"
                            >{{ item.fullTitle }}</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            {{ item.description }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle class="caption">
                            {{ getCategory(item.category) }}
                          </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-list-item-action-text class="mb-5 primary--text">
                            Contract
                          </v-list-item-action-text>
                          <v-btn
                            :text="!active"
                            :to="{
                              name: 'Job',
                              params: { code: item.code },
                            }"
                          >
                            View Job
                            <v-icon right>mdi-arrow-right</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider
                      v-if="index < jobs.length - 1"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" md="7" v-if="jobs.length === 0">
              <v-skeleton-loader
                type="card-heading, list-item-two-line, list-item-two-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
            <v-divider vertical></v-divider>

            <v-col cols="12" md="5">
              <selectedJobCard :specificJob="specificJob" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import selectedJobCard from "./selectedJobCard";
export default {
  name: "jobList",
  components: {
    selectedJobCard,
  },

  data: function () {
    return {
      departments: [],
      filterItems: {},
      selectedJob: 0,
      specificJob: {},
      index: 0,
      search: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Home/getCategories");
      v.$store.dispatch("Home/getJobs");
      v.$store.dispatch("Landing/getCompanyInfo");
    });
  },
  computed: {
    categories: function () {
      return this.$store.getters["Home/homeGetters"]("categories");
    },
    jobs: function () {
      return this.$store.getters["Home/homeGetters"]("jobs");
    },
    firstJob: function () {
      return this.jobs[this.selectedJob];
    },
    filteredItems() {
      const data = this.jobs.filter((item) => {
        if (!this.search) return this.jobs;
        return (
          item.fullTitle.toLowerCase().includes(this.search.toLowerCase()) ||
          item.description.toLowerCase().includes(this.search.toLowerCase()) ||
          item.category.toLowerCase().includes(this.search.toLowerCase())
        );
      });
      return data;
    },
  },

  methods: {
    openjobCard(val) {
      this.specificJob = val;
    },
    filterJobs(val) {
      this.filterItems = val;
    },
    buttonClick: function () {
      alert("button click");
    },
    checkFilterItems() {
      if (Object.keys(this.filterItems).length !== 0) {
        return true;
      } else {
        return false;
      }
    },
    filteredCat() {
      if (Object.keys(this.filterItems).length !== 0) {
        const data = this.jobs.filter(
          (d) => d.category === this.filterItems.code
        );
        return data;
      } else {
        return this.jobs;
      }
    },

    listClick: function () {
      alert("List click");
    },

    allitems() {
      if (this.checkFilterItems()) {
        return this.filteredCat();
      } else if (this.filteredItems.length !== 0) {
        return this.filteredItems;
      } else {
        this.jobs;
      }
    },
    clearFilter() {
      const obj = this.filterItems;
      delete obj.code;
      delete obj.description;

      console.log(obj);
    },
    getCategory(val) {
      if (val) {
        const data = this.categories.filter((d) => d.code === val);
        return data[0].description;
      } else {
        return "";
      }
    },
  },
  watch: {
    firstJob(newValue) {
      this.specificJob = newValue;
    },
  },
};
</script>

<style scoped></style>
