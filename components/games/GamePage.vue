<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

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

const router = useRouter();

const unityCanvas = ref<HTMLCanvasElement | null>(null);

const loading = ref(true);
const progress = ref(0);
const isFullscreen = ref(false);

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

function goBack() {
  if (unityInstance) {
    try {
      unityInstance.Quit();
    } catch (e) {
      console.warn(e);
    }
    unityInstance = null;
  }
  router.push("/games");
}

function toggleFullscreen() {
  const container = document.querySelector("#unity-container");
  if (!container) return;

  if (!document.fullscreenElement) {
    // Enter fullscreen on the container
    container.requestFullscreen?.() ||
      (container as any).webkitRequestFullscreen?.();
    isFullscreen.value = true;

    // Also tell Unity to enter fullscreen if available
    if (unityInstance) {
      try {
        unityInstance.SetFullscreen(1);
      } catch (e) {
        console.warn("Unity fullscreen API not available");
      }
    }
  } else {
    // Exit fullscreen
    document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.();
    isFullscreen.value = false;

    // Tell Unity to exit fullscreen
    if (unityInstance) {
      try {
        unityInstance.SetFullscreen(0);
      } catch (e) {
        console.warn("Unity fullscreen API not available");
      }
    }
  }
}

// Listen for fullscreen change events
function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement;
}

onMounted(async () => {
  try {
    loading.value = true;
    progress.value = 0;

    // Add fullscreen change listener
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);

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
  // Remove event listeners
  document.removeEventListener("fullscreenchange", onFullscreenChange);
  document.removeEventListener("webkitfullscreenchange", onFullscreenChange);

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
  <div class="game-wrapper">
    <div id="unity-container" class="unity-container">
      <!-- Loading overlay -->
      <div v-if="loading" class="loading-overlay">
        <v-progress-circular indeterminate color="primary" size="64" />

        <h2 class="mt-4 text-h5">Loading {{ title }}...</h2>

        <v-progress-linear
          class="mt-6"
          :model-value="progress"
          color="primary"
          rounded
          height="10"
          style="width: 300px"
        />

        <div class="mt-2">{{ progress }}%</div>
      </div>

      <!-- Unity Canvas -->
      <canvas
        ref="unityCanvas"
        id="unity-canvas"
        tabindex="-1"
        :width="width"
        :height="height"
        class="unity-canvas"
        :style="{
          display: loading ? 'none' : 'block',
        }"
      />

      <!-- Controls -->
      <div v-if="!loading" class="controls">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          @click="goBack"
        >
          Back
        </v-btn>

        <v-btn
          color="primary"
          variant="outlined"
          :prepend-icon="
            isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
          "
          @click="toggleFullscreen"
        >
          {{ isFullscreen ? "Exit Fullscreen" : "Fullscreen" }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: #1a1a1a;
}

.unity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #231f20;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  width: 100%;
  max-width: 1000px;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 400px;
  width: 100%;
}

.loading-overlay h2 {
  color: white;
}

.loading-overlay .mt-2 {
  color: rgba(255, 255, 255, 0.7);
}

.unity-canvas {
  width: 100%;
  max-width: 960px;
  aspect-ratio: 960 / 600;
  background: #231f20;
  border-radius: 4px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 960px;
  margin-top: 16px;
  padding: 0 4px;
}

/* Fullscreen styles for the container only */
.unity-container:fullscreen {
  width: 100vw;
  height: 100vh;
  max-width: none;
  border-radius: 0;
  padding: 0;
  background: #000;
  justify-content: center;
}

.unity-container:fullscreen .unity-canvas {
  max-width: none;
  width: 100vw;
  height: 100vh;
  aspect-ratio: auto;
  border-radius: 0;
}

.unity-container:fullscreen .controls {
  display: none;
}

/* WebKit fullscreen support */
.unity-container:-webkit-full-screen {
  width: 100vw;
  height: 100vh;
  max-width: none;
  border-radius: 0;
  padding: 0;
  background: #000;
  justify-content: center;
}

.unity-container:-webkit-full-screen .unity-canvas {
  max-width: none;
  width: 100vw;
  height: 100vh;
  aspect-ratio: auto;
  border-radius: 0;
}

.unity-container:-webkit-full-screen .controls {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .game-wrapper {
    padding: 10px;
  }

  .unity-container {
    padding: 10px;
  }

  .controls {
    flex-direction: row;
    gap: 10px;
  }

  .controls .v-btn {
    font-size: 12px;
    padding: 6px 12px;
  }

  .loading-overlay {
    padding: 20px;
    min-height: 300px;
  }

  .loading-overlay .v-progress-linear {
    width: 200px !important;
  }
}
</style>
