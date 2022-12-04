import { EventBus } from "@/utils/eventBus";

export default {
  methods: {
    encodeRoute: function (param) {
      return btoa(param);
    },

    decodeRoute: function (param) {
      return atob(param);
    },
  },

  mounted() {
    EventBus.$on("route-change", (params) => {
      this.$router.push({ name: params });
    });
  },
};
