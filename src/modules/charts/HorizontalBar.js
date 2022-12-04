import { HorizontalBar } from "vue-chartjs";

export default {
  mixins: [HorizontalBar],
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