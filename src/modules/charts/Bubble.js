import { Bubble } from "vue-chartjs";
export default {
  extend: Bubble,
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
