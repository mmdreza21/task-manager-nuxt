<script setup lang="ts">
defineProps({
  filters: Object,
  loading: Boolean,
});

const emit = defineEmits(["apply-filters"]);
</script>

<template>
  <v-card class="pa-6 mb-6" elevation="2" color="#1e1e1e">
    <v-card-title class="text-h6 font-weight-bold text-white mb-3">
      Filters
    </v-card-title>

    <v-divider class="mb-6" color="#333333" />

    <v-card-text>
      <v-form
        @submit.prevent="emit('apply-filters')"
        class="d-flex flex-column gap-4"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="filters!.priority"
              label="Priority"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-flag-outline"
              :items="[
                { text: 'Low', value: 0 },
                { text: 'Medium', value: 1 },
                { text: 'High', value: 2 },
              ]"
              item-title="text"
              item-value="value"
              hide-details="auto"
              bg-color="#2d2d2d"
              color="primary"
              base-color="#666666"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters!.createdAt"
              label="Created At"
              type="date"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-calendar-start"
              hide-details="auto"
              bg-color="#2d2d2d"
              color="primary"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="filters!.doneAt"
              label="Done At"
              type="date"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-calendar-check-outline"
              hide-details="auto"
              bg-color="#2d2d2d"
              color="primary"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-4">
          <v-btn type="submit" color="primary" :loading="loading">
            <v-icon start>mdi-filter-outline</v-icon>
            Apply Filters
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
