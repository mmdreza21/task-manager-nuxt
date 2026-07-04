<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);

const loading = ref(true);
const progress = ref(0);

let unityInstance: any = null;
let loader: HTMLScriptElement | null = null;

onMounted(() => {
  loader = document.createElement("script");
  loader.src = "/StarBlaster/Build/Web.loader.js";

  loader.onload = () => {
    // @ts-ignore
    createUnityInstance(
      unityCanvas.value,
      {
        arguments: [],
        dataUrl: "/StarBlaster/Build/Web.data.br",
        frameworkUrl: "/StarBlaster/Build/Web.framework.js.br",
        codeUrl: "/StarBlaster/Build/Web.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Star Blaster",
        productVersion: "1.0",
      },
      (p: number) => {
        progress.value = Math.round(p * 100);
      },
    )
      .then((instance: any) => {
        unityInstance = instance;
        loading.value = false;
      })
      .catch(console.error);
  };

  document.body.appendChild(loader);
});

onUnmounted(async () => {
  if (unityInstance) {
    await unityInstance.Quit();
  }

  loader?.remove();
});
</script>
<template>
  <v-container class="d-flex flex-column align-center py-10">
    <div v-if="loading" class="text-center mb-6" style="width: 500px">
      <h2 class="mb-4">Loading Star Blaster...</h2>

      <v-progress-linear
        :model-value="progress"
        color="primary"
        height="12"
        rounded
      />

      <div class="mt-3">{{ progress }}%</div>
    </div>

    <canvas
      ref="unityCanvas"
      width="960"
      height="600"
      :style="{
        width: '100%',
        maxWidth: '960px',
        aspectRatio: '16 / 9',
        background: '#000',
        borderRadius: '12px',
        display: loading ? 'none' : 'block',
      }"
    />
  </v-container>
</template>
