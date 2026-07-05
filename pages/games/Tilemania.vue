<script setup lang="ts">
import GamePage from "~/components/common/GamePage.vue";
</script>

<template>
  <GamePage
    title="Tilemania"
    build-path="/Tilemania/Build"
    loader-file="Tilemania.loader.js"
    data-file="Tilemania.data.br"
    framework-file="Tilemania.framework.js.br"
    code-file="Tilemania.wasm.br"
    product-name="Tilemania"
    :width="'960'"
    :height="'600'"
  />
</template>
