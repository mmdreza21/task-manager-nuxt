<script setup lang="ts">
import GamePage from "~/components/common/GamePage.vue";
</script>

<template>
  <GamePage
    title="Echoes Of Eldoria"
    build-path="/EchoesOfEldoria/Build"
    loader-file="EchoesOfEldoria.loader.js"
    data-file="EchoesOfEldoria.data.br"
    framework-file="EchoesOfEldoria.framework.js.br"
    code-file="EchoesOfEldoria.wasm.br"
    product-name="Echoes Of Eldoria"
    :width="'960'"
    :height="'600'"
  />
</template>
