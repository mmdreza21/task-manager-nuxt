<script setup lang="ts">
import { ref } from "vue";

/* current background index - dark theme backgrounds */
const currentBg = ref(3);
const totalBgs = 10;

/* Dark theme background gradients */
const bgGradients = [
  "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  "linear-gradient(135deg, #0f0f0f 0%, #1e1e1e 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  "linear-gradient(135deg, #1c1c1c 0%, #2c2c2c 100%)",
  "linear-gradient(135deg, #111111 0%, #222222 100%)",
  "linear-gradient(135deg, #0d0d0d 0%, #1d1d1d 100%)",
  "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
  "linear-gradient(135deg, #0f0f0f 0%, #1f1f1f 100%)",
  "linear-gradient(135deg, #141414 0%, #242424 100%)",
];

const currentBgStyle = computed(() => {
  return {
    background: bgGradients[currentBg.value] || bgGradients[0],
    minHeight: "100vh",
    transition: "background 0.5s ease",
    color: "#ffffff",
  };
});
</script>

<template>
  <v-app>
    <div class="bg-login" :style="currentBgStyle">
      <LayoutHeader @change-bg="currentBg = (currentBg + 1) % totalBgs" />
      <main class="pt-10 mt-16">
        <CommonSnakeBarNotife />
        <slot />
      </main>
    </div>
  </v-app>
</template>

<style scoped>
.bg-login {
  min-height: 100vh;
  transition: background 0.5s ease;
}

main {
  position: relative;
  z-index: 1;
}
</style>
