<script setup lang="ts">
const emit = defineEmits(["change-bg"]);
function changeBackground() {
  emit("change-bg");
}

const drawer = ref(false);
</script>
<template>
  <div class="d-flex align-center justify-center w-100 rounded-xl">
    <!-- MOBILE SIDEBAR -->
    <LayoutHeaderSideBar v-model="drawer" />

    <v-app-bar
      height="100"
      color="transparent"
      flat
      class="d-flex align-center justify-center mt-1 rounded-xl"
    >
      <v-container class="d-flex align-center justify-center">
        <v-sheet
          flat
          color="transparent"
          class="header-card d-flex align-center justify-space-between w-100 pa-3 px-5 rounded-xl"
        >
          <div class="d-flex align-center">
            <!-- Mobile menu icon -->
            <v-icon
              v-if="!$vuetify.display.smAndUp"
              icon="mdi-menu"
              class="mr-2"
              @click="drawer = true"
            />

            <v-btn
              icon
              size="44"
              class="glass-icon-btn hidden-md-and-down"
              @click="changeBackground"
            >
              <v-icon>mdi-image-auto-adjust</v-icon>
            </v-btn>
          </div>

          <!-- Desktop links -->
          <LayoutLinks v-if="$vuetify.display.lgAndUp" />

          <LayoutAuthSection />
        </v-sheet>
      </v-container>
    </v-app-bar>
  </div>
</template>

<style scoped>
/* 🌫️ Frosted Header Glass Effect */
.glass-header {
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 30px rgba(25, 118, 210, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.glass-icon-btn {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff !important;
  transition: all 0.3s ease;
  padding: 8px;
}
/* 🧊 Header inner content */
.header-content {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  transition: all 0.3s ease;
}

.header-content:hover {
  border: 1px solid rgba(100, 181, 246, 0.45);
  box-shadow: 0 4px 25px rgba(100, 181, 246, 0.3);
}

/* ✨ Logo Glow */
.common-logo-cyc {
  filter: drop-shadow(0 0 6px rgba(25, 118, 210, 0.6));
}

/* 🪶 Smooth layout fix */
.v-container {
  max-width: 1200px !important;
}
</style>
