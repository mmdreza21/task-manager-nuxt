<template>
  <v-pagination
    v-model="currentPage"
    :length="totalPages"
    :total-visible="7"
    color="primary"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  totalItems: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / props.itemsPerPage));
});
</script>
