<script setup lang="ts">
import type { CreateTaskDto, Task } from "~/types/TaskTypes";
definePageMeta({
  title: "صفحه اصلی",
  description: "صفحه اصلی",
});
const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref("");

const taskService = useTaskService();

const filters = ref({
  priority: 1,
  createdAt: null,
  doneAt: null,
});

const user = useAuthUser().getUserState;

async function loadTasks() {
  loading.value = true;
  error.value = "";
  try {
    const { tasks: fetchedTasks, error: fetchError } =
      await taskService.getTasks(filters.value);

    if (fetchError) throw fetchError;
    tasks.value = fetchedTasks;
  } catch (err) {
    error.value = "Failed to load tasks.";
  } finally {
    loading.value = false;
  }
}

const createTask = async (newTask: CreateTaskDto) => {
  try {
    if (!user.loggedIn) {
      useNotification().fireNotification("red", "please login first!");
      return;
    }
    const { task, error: createError } = await taskService.createTask(newTask);
    if (createError) throw createError;
    tasks.value.push(task);
  } catch (err) {
    error.value = "Failed to create task.";
  }
};

const changeStatus = async (id: string, status: any) => {
  try {
    const { task, error: updateError } = await taskService.updateTaskStatus(
      id,
      status,
    );
    if (updateError) throw updateError;

    const index = tasks.value.findIndex((t) => t.id === id);
    if (index > -1) tasks.value[index] = task;
  } catch (err) {
    error.value = "Failed to update task status.";
  }
};
const tab = ref(0);
const createModal = ref(false);

onMounted(loadTasks);
const config = useRuntimeConfig();
console.log("BASEURL =", config.public.BASEURL);
</script>

<template>
  <v-container class="py-4 pt-16">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-fab
          @click="createModal = true"
          class="ms-4 text-gray900 mb-10 mr-10"
          base-color="primary"
          location="bottom end"
          size="large"
        >
          create new task</v-fab
        >
        <TaskFilters
          :filters="filters"
          @apply-filters="loadTasks"
          :loading="loading"
        />

        <v-tabs v-model="tab" class="my-5" density="comfortable" hide-slider>
          <v-tab v-for="(t, i) in ['To-Do', 'Done']" :key="i" :value="i">
            {{ t }}
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item>
            <TaskList
              class="my-2"
              :tasks="tasks.filter((task: any) => task.status !== 'Done')"
              @change-status="changeStatus"
              :loading="loading"
              :error="error"
            />
          </v-tabs-window-item>

          <v-tabs-window-item>
            <TaskList
              class="my-2"
              :tasks="tasks.filter((task: any) => task.status === 'Done')"
              @change-status="changeStatus"
              :loading="loading"
              :error="error"
            />
          </v-tabs-window-item>
        </v-tabs-window>

        <CommonBaseDialog title="Create Task " v-model="createModal">
          <CreateTaskForm @create-task="createTask" />
        </CommonBaseDialog>
      </v-col>
    </v-row>
  </v-container>
</template>
