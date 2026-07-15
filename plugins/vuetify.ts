import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "nuxt/app";
import "@mdi/font/css/materialdesignicons.css";

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    // 🌈 Primary System - Elegant Purple/Blue gradient
    primary: "#7C3AED", // Violet 600
    primaryLight: "#A78BFA", // Violet 400
    primaryDark: "#4C1D95", // Violet 900
    secondary: "#6B7280", // Gray 500
    accent: "#EC4899", // Pink 500

    // ✅ State Colors - Muted but vibrant
    success: "#10B981", // Emerald 500
    info: "#3B82F6", // Blue 500
    warning: "#F59E0B", // Amber 500
    error: "#EF4444", // Red 500

    // ⚙️ Neutral Grays (for surfaces & text) - Smooth dark transition
    white: "#F3F4F6", // Off-white for text
    black: "#0F0F0F", // Pure dark
    gray50: "#1A1A1A",
    gray100: "#242424",
    gray200: "#2D2D2D",
    gray300: "#3D3D3D",
    gray400: "#555555",
    gray500: "#777777",
    gray600: "#999999",
    gray700: "#BBBBBB",
    gray800: "#DDDDDD",
    gray900: "#F3F4F6",

    // 🧊 Backgrounds - Smooth dark surfaces
    surface: "#1A1A1A", // Card backgrounds
    background: "#0F0F0F", // Main app background
    cardBg: "#1E1E1E", // Card background
    border: "#2D2D2D", // Subtle borders

    // 💬 Custom use cases
    heading: "#F3F4F6",
    body: "#D1D5DB",
    inputBg: "#242424",
    overlay: "rgba(0, 0, 0, 0.7)", // Dark overlay
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
    },
    ssr: true,
    theme: {
      defaultTheme: "darkTheme",
      themes: {
        darkTheme,
      },
    },
    components,
    directives,
  });
  app.vueApp.use(vuetify);
  return {
    provide: {
      vuetify,
    },
  };
});