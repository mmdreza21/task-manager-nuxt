<script setup lang="ts">
import type { TaskFilters, TaskWithAssignees } from "~/types/task";

import CreateTaskForm from "~/components/tasks/CreateTaskForm.vue";
import TaskDetailsModal from "~/components/tasks/TaskDetailsModal.vue";
import TaskFiltersPanel from "~/components/tasks/TaskFilters.vue";
import TaskList from "~/components/tasks/TaskList.vue";

const filters = ref<TaskFilters>({
  page: 1,

  limit: 10,

  search: "",

  status: "all",

  priority: "all",

  assigneeId: "all",

  createdFrom: undefined,

  createdTo: undefined,

  doneFrom: undefined,

  doneTo: undefined,

  sortBy: "createdAt",

  sortOrder: "desc",
});

const listKey = ref(0);

const showTaskForm = ref(false);

const showTaskDetails = ref(false);

const selectedTask = ref<TaskWithAssignees | null>(null);

const detailTask = ref<TaskWithAssignees | null>(null);

const refreshTasks = () => {
  listKey.value++;
};

const openCreate = () => {
  selectedTask.value = null;

  showTaskForm.value = true;
};

const openEdit = (task: TaskWithAssignees) => {
  selectedTask.value = task;

  showTaskForm.value = true;
};

const openDetails = (task: TaskWithAssignees) => {
  detailTask.value = task;

  showTaskDetails.value = true;
};

const closeTaskForm = (isOpen: boolean) => {
  showTaskForm.value = isOpen;

  if (!isOpen) {
    selectedTask.value = null;
  }
};

const closeTaskDetails = (isOpen: boolean) => {
  showTaskDetails.value = isOpen;

  if (!isOpen) {
    detailTask.value = null;
  }
};
</script>

<template>
  <div class="task-container">
    <!-- Header -->

    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4 font-weight-bold">Task Manager</h1>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        variant="flat"
        rounded="lg"
        @click="openCreate"
      >
        New Task
      </v-btn>
    </div>

    <!-- Filters -->

    <TaskFiltersPanel v-model:filters="filters" />

    <!-- Task Table -->

    <TaskList
      :key="listKey"
      v-model:filters="filters"
      @edit-task="openEdit"
      @view-task="openDetails"
    />

    <!-- Create / Edit -->

    <CreateTaskForm
      :model-value="showTaskForm"
      :task="selectedTask"
      @update:model-value="closeTaskForm"
      @saved="refreshTasks"
    />

    <!-- Details -->

    <TaskDetailsModal
      :model-value="showTaskDetails"
      :task="detailTask"
      @update:model-value="closeTaskDetails"
    />
  </div>
</template>

<style scoped>
.task-container {
  max-width: 1400px;

  margin: 0 auto;
}
</style>
