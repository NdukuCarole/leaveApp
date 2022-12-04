import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal,
        secondary: colors.indigo.darken4,
        accent: colors.blueGrey.darken4,
        error: colors.red.accent3,
        background: colors.grey.lighten3,
        aside: colors.teal,
        info: colors.teal.darken1,
        landingBackground: colors.grey.lighten3,
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
});
