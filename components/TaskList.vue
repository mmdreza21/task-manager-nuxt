<script setup lang="ts">
import { ref } from "vue";
import type { Task } from "~/types/TaskTypes";

const taskService = useTaskService();

const loading = ref(false);
const error = ref("");

const { tasks } = defineProps({
  tasks: Array as PropType<Task[]>,
  loading: Boolean,
  error: String,
});

const changeStatus = async (taskId: string, newStatus: any) => {
  try {
    const { task, error: updateError } = await taskService.updateTaskStatus(
      taskId,
      newStatus,
    );
    if (updateError) throw updateError;

    const taskIndex = tasks!.findIndex((t: any) => t.id === taskId);
    if (taskIndex > -1) tasks![taskIndex].status = task.status;
  } catch (err) {
    error.value = "Failed to update task status.";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "success";
    case "Doing":
      return "info";
    case "ToReview":
      return "warning";
    case "Canceled":
      return "error";
    default:
      return "grey";
  }
};

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 2:
      return "error";
    case 1:
      return "warning";
    default:
      return "success";
  }
};

const getPriorityLabel = (priority: number) => {
  switch (priority) {
    case 2:
      return "High";
    case 1:
      return "Medium";
    default:
      return "Low";
  }
};
</script>

<template>
  <v-card color="#1a1a1a" class="pa-6 mb-6" elevation="0" rounded="lg" border>
    <v-card-title class="text-h6 font-weight-bold text-white mb-4">
      <v-icon start color="primary">mdi-format-list-checks</v-icon>
      Task List
    </v-card-title>
    <v-divider color="#333" />

    <!-- Loading -->
    <v-card-text v-if="loading" class="text-center py-6">
      <v-progress-circular indeterminate color="primary" size="48" />
      <p class="text-white mt-3">Loading tasks...</p>
    </v-card-text>

    <!-- Error -->
    <v-card-text v-else-if="error" class="text-center py-6">
      <v-icon color="error" size="48" class="mb-2">mdi-alert-circle</v-icon>
      <p class="text-error">{{ error }}</p>
    </v-card-text>

    <!-- Task List -->
    <v-list v-else-if="tasks?.length" color="transparent" class="py-0">
      <v-list-item
        v-for="task in tasks"
        :key="task.id"
        class="pa-3 mb-2"
        density="comfortable"
        lines="two"
        border
        rounded="lg"
        color="#242424"
      >
        <template v-slot:prepend>
          <v-avatar color="primary" size="40" variant="tonal">
            <v-icon color="white">mdi-checkbox-marked-circle-outline</v-icon>
          </v-avatar>
        </template>

        <v-list-item-content>
          <v-list-item-title class="text-white font-weight-bold">
            {{ task.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-grey">
            {{ task.desc || "No description" }}
          </v-list-item-subtitle>

          <!-- User and priority info -->
          <div class="d-flex align-center mt-2 ga-2 flex-wrap">
            <v-chip
              size="small"
              color="grey-darken-3"
              class="text-white"
              variant="outlined"
            >
              <v-icon start size="14">mdi-account</v-icon>
              {{ task.User?.name || "Unassigned" }}
            </v-chip>

            <v-chip
              :color="getStatusColor(task.status)"
              size="small"
              class="text-white"
              variant="flat"
            >
              {{ task.status }}
            </v-chip>

            <v-chip
              v-if="task.priority !== undefined"
              :color="getPriorityColor(task.priority)"
              size="small"
              class="text-white"
              variant="flat"
            >
              {{ getPriorityLabel(task.priority) }}
            </v-chip>

            <v-chip
              v-if="task.doneAt"
              size="small"
              color="grey-darken-3"
              class="text-white"
              variant="outlined"
            >
              <v-icon start size="14">mdi-calendar-check</v-icon>
              {{ new Date(task.doneAt).toLocaleDateString() }}
            </v-chip>
          </div>
        </v-list-item-content>

        <template v-slot:append>
          <v-select
            v-model="task.status"
            :items="['Todo', 'Doing', 'ToReview', 'Done', 'Canceled']"
            label="Status"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            bg-color="#242424"
            color="primary"
            base-color="#555"
            class="status-select"
            style="min-width: 140px"
            border
            @update:model-value="changeStatus(task.id, task.status)"
          >
            <template v-slot:item="{ item, props }">
              <v-list-item
                v-bind="props"
                :style="{
                  color:
                    item.value === 'Done'
                      ? '#4caf50'
                      : item.value === 'Doing'
                        ? '#2196f3'
                        : item.value === 'ToReview'
                          ? '#ff9800'
                          : item.value === 'Canceled'
                            ? '#f44336'
                            : '#9e9e9e',
                }"
              />
            </template>
            <template v-slot:selection="{ item }">
              <span
                :style="{
                  color:
                    item.value === 'Done'
                      ? '#4caf50'
                      : item.value === 'Doing'
                        ? '#2196f3'
                        : item.value === 'ToReview'
                          ? '#ff9800'
                          : item.value === 'Canceled'
                            ? '#f44336'
                            : '#9e9e9e',
                }"
              >
                {{ item.value }}
              </span>
            </template>
          </v-select>
        </template>
      </v-list-item>
    </v-list>

    <!-- Empty -->
    <v-card-text v-else class="text-center py-8">
      <v-icon color="grey" size="64" class="mb-3">mdi-inbox-outline</v-icon>
      <p class="text-h6 text-grey">No tasks available</p>
      <p class="text-grey caption">Create your first task to get started</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.text-grey {
  color: #888888 !important;
}

.text-error {
  color: #ef4444 !important;
}

.caption {
  color: #666 !important;
  font-size: 0.875rem !important;
}

/* Dark select menu */
:deep(.v-menu .v-overlay__content) {
  background: #242424 !important;
  border: 1px solid #333 !important;
  border-radius: 8px !important;
}

:deep(.v-list-item) {
  background: #242424 !important;
  color: #ffffff !important;
}

:deep(.v-list-item:hover) {
  background: rgba(124, 58, 237, 0.1) !important;
}

:deep(.v-field) {
  background-color: #242424 !important;
  border-color: #333 !important;
  border-radius: 8px !important;
}

:deep(.v-field__input) {
  color: #ffffff !important;
}

:deep(.v-field__label) {
  color: #888888 !important;
}

:deep(.v-field--focused .v-field__label) {
  color: #7c3aed !important;
}

:deep(.v-field__append-inner) {
  color: #888888 !important;
}

:deep(.v-field--variant-outlined .v-field__outline) {
  color: #333 !important;
}

:deep(.v-field--variant-outlined.v-field--focused .v-field__outline) {
  color: #7c3aed !important;
}

:deep(.v-select .v-field__input) {
  color: #ffffff !important;
}

:deep(.v-select .v-field__append-inner) {
  color: #888888 !important;
}

:deep(.v-chip--variant-flat) {
  font-weight: 500 !important;
}

:deep(.v-chip--variant-outlined) {
  border-color: #333 !important;
}

:deep(.v-avatar--variant-tonal) {
  background: rgba(124, 58, 237, 0.15) !important;
}
</style>
