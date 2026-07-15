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
      height="80"
      color="transparent"
      flat
      class="d-flex align-center justify-center mt-2 rounded-xl"
    >
      <v-container class="d-flex align-center justify-center">
        <v-sheet
          flat
          color="#1a1a1a"
          class="d-flex align-center justify-space-between w-100 pa-3 px-6 rounded-xl"
          style="border: 1px solid rgba(255, 255, 255, 0.08)"
        >
          <div class="d-flex align-center">
            <!-- Mobile menu icon -->
            <v-btn
              v-if="!$vuetify.display.smAndUp"
              icon
              variant="text"
              color="white"
              class="mr-2"
              @click="drawer = true"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>

            <!-- Logo/Brand -->
            <div class="d-flex align-center">
              <v-icon color="primary" size="32" class="mr-2">
                mdi-cube-outline
              </v-icon>
              <span
                class="text-white text-h6 font-weight-bold"
                style="letter-spacing: 0.5px"
              >
                TaskForge
              </span>
            </div>
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
.v-app-bar {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.v-sheet {
  transition: all 0.3s ease;
}

.v-sheet:hover {
  border-color: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Make the app bar background transparent on scroll */
:deep(.v-toolbar__content) {
  padding: 0 !important;
}
</style>
