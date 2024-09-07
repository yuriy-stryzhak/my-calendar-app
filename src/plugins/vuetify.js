/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#FFD900",
          grayMiddle: "#999999",
          grayDark: "#afafaf",
          grayLight: "#DFDEDA",
          black: "#000000",
          blue: "#267CD4",
          red: "#FF0505",
          green: "#38C357",
          cultured: "#f8f8f8",
          platinum: "#e5e5e5",
          white: "#ffffff",
          gray: "#B0B0B0",
          grayWeb: "#808080",
        }
      },
    },
  },
})
