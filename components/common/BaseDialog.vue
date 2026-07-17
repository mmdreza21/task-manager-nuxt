<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const dialogModel = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (dialogModel.value = val),
);
watch(dialogModel, (val) => emit("update:modelValue", val));

const display = useDisplay();
const isMobile = computed(() => display.mdAndDown.value);
</script>

<template>
  <v-dialog
    v-model="dialogModel"
    max-width="700px"
    :fullscreen="isMobile"
    :hide-overlay="isMobile"
    transition="dialog-bottom-transition"
  >
    <v-card
      color="#1a1a1a"
      class="pa-6"
      elevation="0"
      rounded="lg"
      border
      :class="isMobile ? 'bottom-card' : ''"
    >
      <!-- Header -->
      <v-card-title class="text-h6 font-weight-bold text-white mb-4">
        <v-icon start color="primary">mdi-dialog</v-icon>
        {{ title || "Dialog" }}
      </v-card-title>

      <v-divider color="#333" class="mb-4" />

      <!-- Content -->
      <v-card-text>
        <slot />
      </v-card-text>

      <!-- Close button -->
      <v-card-actions class="pt-4">
        <v-spacer />
        <v-btn
          color="grey-darken-3"
          variant="outlined"
          @click="dialogModel = false"
          class="text-white"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.bottom-card {
  margin: 0 auto;
  width: 90%;
  max-width: 700px;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.text-white {
  color: #ffffff !important;
}

:deep(.v-card) {
  background: #1a1a1a !important;
  border-color: #333 !important;
}

:deep(.v-divider) {
  border-color: #333 !important;
}

:deep(.v-btn--variant-outlined) {
  border-color: #333 !important;
}

:deep(.v-btn--variant-outlined:hover) {
  background: rgba(124, 58, 237, 0.1) !important;
  border-color: #7c3aed !important;
}
</style>
