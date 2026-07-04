<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);

const loading = ref(true);
const progress = ref(0);

let unityInstance: any = null;
let loader: HTMLScriptElement | null = null;

onMounted(() => {
  loader = document.createElement("script");
  loader.src = "/EchoesOfEldoria/Build/EchoesOfEldoria.loader.js";

  loader.onload = () => {
    // @ts-ignore
    createUnityInstance(
      unityCanvas.value,
      {
        arguments: [],
        dataUrl: "/EchoesOfEldoria/Build/EchoesOfEldoria.data.br",
        frameworkUrl: "/EchoesOfEldoria/Build/EchoesOfEldoria.framework.js.br",
        codeUrl: "/EchoesOfEldoria/Build/EchoesOfEldoria.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Echoes Of Eldoria",
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
      .catch((err: any) => {
        console.error(err);
        alert(err);
      });
  };

  document.body.appendChild(loader);
});

onUnmounted(async () => {
  if (unityInstance) {
    try {
      await unityInstance.Quit();
      unityInstance = null;
    } catch (e) {
      console.warn("Unity cleanup error:", e);
    }
  }

  if (loader) {
    loader.remove();
    loader = null;
  }
});
</script>

<template>
  <v-container
    fluid
    class="d-flex flex-column justify-center align-center py-10 mt-10"
  >
    <div
      v-if="loading"
      class="text-center mb-8"
      style="width: 100%; max-width: 500px"
    >
      <v-progress-circular indeterminate color="primary" size="64" />

      <h2 class="mt-4 text-h5">Loading Echoes Of Eldoria...</h2>

      <v-progress-linear
        class="mt-6"
        :model-value="progress"
        color="primary"
        rounded
        height="10"
      />

      <div class="mt-2 text-body-1">{{ progress }}%</div>
    </div>

    <canvas
      ref="unityCanvas"
      id="unity-canvas"
      width="960"
      height="600"
      tabindex="-1"
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
