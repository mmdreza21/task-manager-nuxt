<script setup lang="ts">
import GamePage from "~/components/common/GamePage.vue";
</script>

<template>
  <GamePage
    title="The Valkyrie"
    build-path="/TheValkyrie/Build"
    loader-file="Web.loader.js"
    data-file="Web.data.br"
    framework-file="Web.framework.js.br"
    code-file="Web.wasm.br"
    product-name="The Valkyrie"
    :width="'960'"
    :height="'600'"
  />
</template>
