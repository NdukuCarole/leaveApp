const listener = {
  mounted: function () {
    // Global Event Listeners
    Event.$on("ApiError", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiSuccess", (message) => {
      this.$toast.success(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiInfo", (message) => {
      this.$toast.info(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiWarning", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("duplicate", () => {
      this.$toasted.show("Cannot add duplicate timesheet", {
        position: "top-center",
        keepOnHover: true,
        iconPack: "fontawesome",
        duration: 7000,
        type: "error",
        icon: "exclamation-circle",
        closeOnSwipe: true,
      });
    });

    Event.$on("reload", () => {
      this.$router.go();
    });

    Event.$on("returnToApplication", (data) => {
      this.$router.replace({ path: data.path, query: { id: data.query } });
    });

    Event.$on("back", () => {
      this.$router.back();
    });
    Event.$on("closeLogin", () => {
      this.toggle = true;
    });
  },
};
export default listener;
