<script setup lang="ts">
import type { TaskWithAssignees } from "~/types/task";
import type { User } from "~/types/UserTypes";

const props = defineProps<{
  modelValue: boolean;
  task: TaskWithAssignees | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const close = () => {
  isOpen.value = false;
};

const getUserInitials = (user?: User | null) => {
  if (!user) return "?";

  return (
    user.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?"
  );
};

const getUserName = (user?: User | null) => {
  if (!user) return "Unknown";
  return user.name || user.email || "Unknown";
};

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(date));
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Todo: "info",
    Doing: "primary",
    ToReview: "warning",
    Done: "success",
    Canceled: "error",
  };

  return colors[status] || "grey";
};

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "error",
    CRITICAL: "deep-purple",
  };

  return colors[priority] || "grey";
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    Todo: "Todo",
    Doing: "Doing",
    ToReview: "To Review",
    Done: "Done",
    Canceled: "Canceled",
  };

  return labels[status] || status;
};

const getPriorityLabel = (priority: string) => {
  const labels: Record<string, string> = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: "Critical",
  };

  return labels[priority] || priority;
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="600" persistent>
    <v-card v-if="task" class="details-card" elevation="0">
      <v-card-title class="d-flex align-center px-6 pt-5 pb-3">
        <span class="text-h6 font-weight-bold"> Task Details </span>

        <v-spacer />

        <v-btn icon="mdi-close" variant="text" size="small" @click="close" />
      </v-card-title>

      <v-card-text class="px-6 pb-4">
        <h2 class="text-h5 font-weight-bold mb-2">
          {{ task.title }}
        </h2>

        <p class="text-body-2 text-medium-emphasis mb-6">
          {{ task.desc || "No description provided." }}
        </p>

        <v-row dense>
          <v-col cols="6">
            <div class="detail-label">Status</div>

            <v-chip
              size="small"
              :color="getStatusColor(task.status)"
              variant="tonal"
            >
              {{ getStatusLabel(task.status) }}
            </v-chip>
          </v-col>

          <v-col cols="6">
            <div class="detail-label">Priority</div>

            <v-chip
              size="small"
              :color="getPriorityColor(task.priority)"
              variant="tonal"
            >
              {{ getPriorityLabel(task.priority) }}
            </v-chip>
          </v-col>

          <v-col cols="6" class="mt-4">
            <div class="detail-label">Created At</div>

            <div>
              {{ formatDate(task.createdAt) }}
            </div>
          </v-col>

          <v-col cols="6" class="mt-4">
            <div class="detail-label">Done At</div>

            <div>
              {{ formatDate(task.doneAt) }}
            </div>
          </v-col>

          <v-col cols="12" class="mt-2">
            <div class="detail-label">Created By</div>

            <div>
              {{ getUserName(task.creator) }}
            </div>
          </v-col>

          <v-col cols="12" class="mt-2">
            <div class="detail-label">Current Assignee</div>

            <div>
              {{ getUserName(task.assignee) }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="px-6 pb-5 pt-0 justify-end">
        <v-btn variant="tonal" @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.details-card {
  border: 1px solid #d9dde3;
  border-radius: 12px !important;
}

.detail-label {
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.assignee-pill {
  padding: 5px 10px 5px 5px;
  border-radius: 99px;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
}

.assignee-avatar {
  background: #e5e7eb;
  color: #374151;
  font-size: 11px;
  font-weight: 700;
}

:deep(.v-chip) {
  font-weight: 500;
}
</style>
