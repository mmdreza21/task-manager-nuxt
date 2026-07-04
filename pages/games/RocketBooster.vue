<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const unityCanvas = ref<HTMLCanvasElement | null>(null);

let unityInstance: any = null;
let loader: HTMLScriptElement | null = null;

onMounted(() => {
  loader = document.createElement("script");
  loader.src = "/rockert-booster/Build/Rockert booster web.loader.js";

  loader.onload = () => {
    // @ts-ignore
    createUnityInstance(
      unityCanvas.value,
      {
        arguments: [],
        dataUrl: "/rockert-booster/Build/Rockert booster web.data.br",
        frameworkUrl:
          "/rockert-booster/Build/Rockert booster web.framework.js.br",
        codeUrl: "/rockert-booster/Build/Rockert booster web.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Rocket Booster",
        productVersion: "1.0",
      },
      (progress: number) => {
        console.log(`Loading ${Math.round(progress * 100)}%`);
      },
    )
      .then((instance: any) => {
        unityInstance = instance;
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
  <div class="d-flex justify-center align-center py-10">
    <canvas
      ref="unityCanvas"
      id="unity-canvas"
      width="960"
      height="600"
      tabindex="-1"
      style="
        width: 100%;
        max-width: 960px;
        aspect-ratio: 16 / 9;
        background: #231f20;
      "
    />
  </div>
</template>
