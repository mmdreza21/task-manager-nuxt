<script setup lang="ts">
import GamePage from "~/components/common/GamePage.vue";
</script>

<template>
  <GamePage
    title="Star Blaster"
    build-path="/StarBlaster/Build"
    loader-file="Web.loader.js"
    data-file="Web.data.br"
    framework-file="Web.framework.js.br"
    code-file="Web.wasm.br"
    product-name="Star Blaster"
    :width="'480'"
    :height="'720'"
  />
</template>
