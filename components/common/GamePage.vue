<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

interface Props {
  title: string;
  buildPath: string;

  loaderFile: string;
  dataFile: string;
  frameworkFile: string;
  codeFile: string;

  companyName?: string;
  productName?: string;
  productVersion?: string;

  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  companyName: "DefaultCompany",
  productVersion: "1.0",
  width: "960",
  height: "600",
});

const unityCanvas = ref<HTMLCanvasElement | null>(null);

const loading = ref(true);
const progress = ref(0);

let unityInstance: any = null;
let loaderScript: HTMLScriptElement | null = null;

async function loadUnityLoader(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${src}"]`,
    ) as HTMLScriptElement | null;

    if (existing) {
      loaderScript = existing;
      resolve();
      return;
    }

    loaderScript = document.createElement("script");
    loaderScript.src = src;

    loaderScript.onload = () => resolve();
    loaderScript.onerror = reject;

    document.body.appendChild(loaderScript);
  });
}

onMounted(async () => {
  try {
    loading.value = true;
    progress.value = 0;

    await loadUnityLoader(`${props.buildPath}/${props.loaderFile}`);

    // @ts-ignore
    unityInstance = await createUnityInstance(
      unityCanvas.value,
      {
        arguments: [],

        dataUrl: `${props.buildPath}/${props.dataFile}`,

        frameworkUrl: `${props.buildPath}/${props.frameworkFile}`,

        codeUrl: `${props.buildPath}/${props.codeFile}`,

        streamingAssetsUrl: "StreamingAssets",

        companyName: props.companyName,
        productName: props.productName,
        productVersion: props.productVersion,
      },
      (p: number) => {
        progress.value = Math.round(p * 100);
      },
    );

    loading.value = false;
  } catch (err) {
    console.error(err);
    alert(err);
  }
});

onUnmounted(async () => {
  if (unityInstance) {
    try {
      await unityInstance.Quit();
    } catch (e) {
      console.warn(e);
    }

    unityInstance = null;
  }

  // Remove loader script
  if (loaderScript) {
    loaderScript.remove();
    loaderScript = null;
  }

  // Cleanup Unity globals
  // @ts-ignore
  delete window.createUnityInstance;

  // @ts-ignore
  delete window.Module;
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

      <h2 class="mt-4 text-h5">Loading {{ title }}...</h2>

      <v-progress-linear
        class="mt-6"
        :model-value="progress"
        color="primary"
        rounded
        height="10"
      />

      <div class="mt-2">{{ progress }}%</div>
    </div>

    <canvas
      ref="unityCanvas"
      id="unity-canvas"
      tabindex="-1"
      :width="width"
      :height="height"
      :style="{
        width: '100%',
        maxWidth: `${width}px`,
        aspectRatio: `${width} / ${height}`,
        background: '#231f20',
        display: loading ? 'none' : 'block',
      }"
    />
  </v-container>
</template>
