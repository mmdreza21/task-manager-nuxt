<script setup lang="ts">
import type { CreateTaskDto } from "~/types/TaskTypes";

const newTask = ref<CreateTaskDto>({
  title: "",
  desc: "",
  priority: 1,
  status: "Todo",
});

const { loggedIn } = useAuthUser().getUserState;

const emit = defineEmits(["create-task"]);

const submitTask = () => {
  emit("create-task", newTask.value);
  newTask.value = { title: "", desc: "", priority: 1, status: "Todo" };
};
</script>

<template>
  <v-divider class="mb-6" color="#333333" />

  <div
    v-if="!loggedIn"
    class="pa-4 mb-6 rounded-lg text-center"
    color="#2d2d2d"
    style="background-color: #2d2d2d; border: 1px solid #444444"
  >
    <p class="text-h6 font-weight-bold text-white">Please login first!</p>
    <v-btn color="primary" variant="elevated" class="mt-2" to="/auth/login">
      Go to Login
    </v-btn>
  </div>

  <v-card-text v-else>
    <v-form @submit.prevent="submitTask" class="d-flex flex-column ga-4">
      <v-text-field
        v-model="newTask.title"
        label="Task Title"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-format-title"
        hide-details="auto"
        required
        bg-color="#2d2d2d"
        color="primary"
      />

      <v-textarea
        v-model="newTask.desc"
        label="Task Description"
        variant="outlined"
        density="comfortable"
        auto-grow
        prepend-inner-icon="mdi-text"
        bg-color="#2d2d2d"
        color="primary"
      />

      <v-select
        v-model="newTask.priority"
        label="Priority"
        variant="outlined"
        density="comfortable"
        :items="[
          { text: 'Low', value: 0 },
          { text: 'Medium', value: 1 },
          { text: 'High', value: 2 },
        ]"
        item-title="text"
        item-value="value"
        prepend-inner-icon="mdi-flag-outline"
        center-affix
        hide-details="auto"
        bg-color="#2d2d2d"
        color="primary"
        base-color="#666666"
      />

      <v-btn
        color="primary"
        type="submit"
        variant="elevated"
        size="large"
        block
        class="mt-2"
      >
        <v-icon start>mdi-plus</v-icon>
        Create Task
      </v-btn>
    </v-form>
  </v-card-text>
</template>
