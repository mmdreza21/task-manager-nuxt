<script setup lang="ts">
import type { DataTableHeader } from "vuetify";

import type {
  TaskFilters,
  TaskWithAssignees,
  TaskStatus,
  TaskPriority,
} from "~/types/task";

import { useTasks } from "~/composables/useTasks";
import moment from "jalali-moment";

const { fetchTasks, deleteTask: removeTask } = useTasks();

const props = defineProps<{
  filters: TaskFilters;
}>();

const emit = defineEmits<{
  (e: "edit-task", task: TaskWithAssignees): void;

  (e: "view-task", task: TaskWithAssignees): void;

  (e: "update:filters", filters: TaskFilters): void;
}>();

const page = computed({
  get: () => props.filters.page,

  set: (value: number) => {
    emit("update:filters", {
      ...props.filters,
      page: value,
    });
  },
});

const tasks = ref<TaskWithAssignees[]>([]);

const loading = ref(false);

const totalItems = ref(0);
const errorMessage = ref("");
const loadTasks = async () => {
  loading.value = true;

  try {
    const result = await fetchTasks(props.filters);

    tasks.value = result.data;

    totalItems.value = result.total;
  } catch (error: any) {
    errorMessage.value = error.message || "Unable to load tasks";
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.filters,

  loadTasks,

  {
    deep: true,
    immediate: true,
  },
);

const deleteTask = async (id: string) => {
  await removeTask(id);

  await loadTasks();
};

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return moment(date).locale("fa").format("YYYY/MM/DD _ HH:mm");
};

const headers: DataTableHeader[] = [
  {
    title: "Title",
    key: "title",
  },

  {
    title: "Status",
    key: "status",
  },

  {
    title: "Priority",
    key: "priority",
  },

  {
    title: "Created By",
    key: "createdBy",
  },

  {
    title: "Assigned To",
    key: "assignee",
  },

  {
    title: "Done At",
    key: "doneAt",
  },

  {
    title: "Actions",
    key: "actions",
  },
];

const statusMeta: Record<TaskStatus, any> = {
  Todo: {
    label: "Todo",
    class: "status-todo",
  },

  Doing: {
    label: "Doing",
    class: "status-doing",
  },

  ToReview: {
    label: "Review",
    class: "status-review",
  },

  Done: {
    label: "Done",
    class: "status-done",
  },

  Canceled: {
    label: "Canceled",
    class: "status-canceled",
  },
};

const priorityMeta: Record<TaskPriority, any> = {
  LOW: {
    label: "Low",
    class: "priority-low",
  },

  MEDIUM: {
    label: "Medium",
    class: "priority-medium",
  },

  HIGH: {
    label: "High",
    class: "priority-high",
  },

  CRITICAL: {
    label: "Critical",
    class: "priority-critical",
  },
};
</script>
<template>
  <v-card class="task-card" rounded="xl" elevation="0">
    <v-alert
      v-if="errorMessage"
      type="error"
      variant="tonal"
      class="ma-4"
      closable
      @click:close="errorMessage = ''"
    >
      {{ errorMessage }}

      <v-btn variant="text" size="small" @click="loadTasks"> Retry </v-btn>
    </v-alert>

    <v-data-table-server
      :headers="headers"
      :items="tasks"
      :loading="loading"
      :items-per-page="props.filters.limit"
      v-model:page="page"
      :items-length="totalItems"
      item-value="id"
      hover
    >
      <template #loading>
        <div class="pa-8 text-center">
          <v-progress-circular indeterminate />
        </div>
      </template>

      <template #no-data>
        <div class="pa-10 text-center">
          <v-icon size="48"> mdi-inbox-outline </v-icon>

          <div class="mt-2">No tasks found</div>
        </div>
      </template>

      <template #item.status="{ item }">
        <v-chip
          size="small"
          class="task-chip"
          :class="statusMeta[item.status]?.class"
        >
          <v-icon icon="mdi-circle" size="7" start />

          {{ statusMeta[item.status]?.label || item.status }}
        </v-chip>
      </template>

      <template #item.priority="{ item }">
        <v-chip
          size="small"
          class="task-chip"
          :class="priorityMeta[item.priority]?.class"
        >
          <v-icon icon="mdi-flag-outline" size="15" start />

          {{ priorityMeta[item.priority]?.label || item.priority }}
        </v-chip>
      </template>

      <template #item.createdBy="{ item }">
        <v-avatar size="30">
          {{ item.creator?.name?.slice(0, 2).toUpperCase() || "?" }}
        </v-avatar>

        <span class="ml-2">
          {{ item.creator?.name || "Unknown" }}
        </span>
      </template>

      <template #item.assignee="{ item }">
        <v-avatar size="30">
          {{ item.assignee?.name?.slice(0, 2).toUpperCase() || "?" }}
        </v-avatar>

        <span class="ml-2">
          {{ item.assignee?.name || "Unassigned" }}
        </span>
      </template>

      <template #item.doneAt="{ item }">
        {{ formatDate(item.doneAt) }}
      </template>

      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-pencil"
          variant="text"
          size="small"
          @click="$emit('edit-task', item)"
        />

        <v-btn
          icon="mdi-delete"
          variant="text"
          color="error"
          size="small"
          @click="deleteTask(item.id)"
        />

        <v-btn
          icon="mdi-dots-vertical"
          variant="text"
          size="small"
          @click="$emit('view-task', item)"
        />
      </template>

      <template #bottom>
        <div class="d-flex justify-end pa-4">
          <CommonPagination
            v-model="page"
            :total-items="totalItems"
            :items-per-page="props.filters.limit"
          />
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>
.task-card {
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow: hidden;
}

:deep(.v-table) {
  background: transparent !important;
}

:deep(.v-table .v-table__wrapper) {
  background: transparent !important;
}

:deep(th) {
  font-weight: 600;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.5) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(th),
:deep(td) {
  padding-inline: 20px !important;
}

:deep(td) {
  height: 64px;
  color: rgba(255, 255, 255, 0.87) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
}

:deep(tbody tr:hover) {
  background: rgba(255, 255, 255, 0.03) !important;
}

:deep(.v-data-table-footer) {
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

:deep(.v-data-table-footer .v-pagination__item) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.v-data-table-footer .v-pagination__item--is-active) {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

:deep(.v-data-table-footer .v-pagination__item:hover) {
  background: rgba(255, 255, 255, 0.05) !important;
}

.task-chip {
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid transparent !important;
}

/* Status Chips - Dark Theme with subtle borders */
.status-todo {
  background: rgba(255, 255, 255, 0.05) !important;
  color: rgba(255, 255, 255, 0.6) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.status-canceled {
  background: rgba(220, 38, 38, 0.15) !important;
  color: #f87171 !important;
  border-color: rgba(220, 38, 38, 0.2) !important;
}

.status-in-progress {
  background: rgba(37, 99, 235, 0.15) !important;
  color: #60a5fa !important;
  border-color: rgba(37, 99, 235, 0.2) !important;
}

.status-done {
  background: rgba(22, 163, 74, 0.15) !important;
  color: #4ade80 !important;
  border-color: rgba(22, 163, 74, 0.2) !important;
}

.status-review {
  background: rgba(217, 119, 6, 0.15) !important;
  color: #fbbf24 !important;
  border-color: rgba(217, 119, 6, 0.2) !important;
}

/* Priority Chips - Dark Theme with subtle borders */
.priority-low {
  background: rgba(22, 163, 74, 0.15) !important;
  color: #4ade80 !important;
  border-color: rgba(22, 163, 74, 0.2) !important;
}

.priority-medium {
  background: rgba(217, 119, 6, 0.15) !important;
  color: #fbbf24 !important;
  border-color: rgba(217, 119, 6, 0.2) !important;
}

.priority-high {
  background: rgba(239, 68, 68, 0.15) !important;
  color: #f87171 !important;
  border-color: rgba(239, 68, 68, 0.2) !important;
}

.priority-critical {
  background: rgba(185, 28, 28, 0.2) !important;
  color: #fca5a5 !important;
  border-color: rgba(185, 28, 28, 0.25) !important;
}

.assignee-avatar {
  background: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 12px;
  font-weight: 600;
}

.assignee-name {
  color: rgba(255, 255, 255, 0.7) !important;
  font-weight: 500;
}

.text-grey {
  color: rgba(255, 255, 255, 0.35) !important;
}

/* Action Buttons - Dark Theme */
:deep(.v-btn--icon) {
  color: rgba(255, 255, 255, 0.3) !important;
  transition: all 0.2s ease !important;
}

:deep(.v-btn--icon:hover) {
  color: rgba(255, 255, 255, 0.7) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  transform: scale(1.05);
}

:deep(.v-btn--icon.v-btn--color-error) {
  color: rgba(239, 68, 68, 0.5) !important;
}

:deep(.v-btn--icon.v-btn--color-error:hover) {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #f87171 !important;
}

/* Empty state - Dark Theme */
:deep(.v-data-table__empty-wrapper) {
  color: rgba(255, 255, 255, 0.3) !important;
  padding: 48px 0 !important;
}

:deep(.v-data-table__empty-wrapper .v-icon) {
  color: rgba(255, 255, 255, 0.1) !important;
}

/* Loading state */
:deep(.v-progress-circular) {
  color: rgba(255, 255, 255, 0.3) !important;
}

/* Scrollbar styling for dark theme */
:deep(.v-table__wrapper::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.v-table__wrapper::-webkit-scrollbar-track) {
  background: rgba(255, 255, 255, 0.02);
}

:deep(.v-table__wrapper::-webkit-scrollbar-thumb) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

:deep(.v-table__wrapper::-webkit-scrollbar-thumb:hover) {
  background: rgba(255, 255, 255, 0.2);
}
</style>
