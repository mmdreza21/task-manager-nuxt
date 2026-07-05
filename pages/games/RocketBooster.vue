<script setup lang="ts">
import GamePage from "~/components/common/GamePage.vue";
</script>

<template>
  <GamePage
    title="Rocket Booster"
    build-path="/rockert-booster/Build"
    loader-file="Rockert booster web.loader.js"
    data-file="Rockert booster web.data.br"
    framework-file="Rockert booster web.framework.js.br"
    code-file="Rockert booster web.wasm.br"
    product-name="Rocket Booster"
    width="960"
    height="600"
  />
</template>
