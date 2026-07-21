<script setup lang="ts">
import { useTasks } from "~/composables/useTasks";
import { useUsers } from "~/composables/useUsers";

import type { Task, TaskPriority, TaskStatus } from "~/types/task";

const props = defineProps<{
  modelValue: boolean;
  task: Task | null;
}>();

const emit = defineEmits<{
  (e: "saved"): void;
  (e: "update:modelValue", value: boolean): void;
}>();

const { createTask, updateTask } = useTasks();

const { fetchUsersForSelect } = useUsers();

const { fireNotification } = useNotification();

const saving = ref(false);

const loadingUsers = ref(false);

const users = ref<
  {
    id: string;
    name: string;
    email: string;
  }[]
>([]);

const form = ref();

const isEditing = computed(() => props.task !== null);

const isOpen = computed({
  get: () => props.modelValue,

  set: (value: boolean) => emit("update:modelValue", value),
});

const formData = ref({
  title: "",

  desc: "",

  priority: "MEDIUM" as TaskPriority,

  status: "Todo" as TaskStatus,

  assigneeId: "",
});

const priorityOptions = [
  {
    title: "Critical",
    value: "CRITICAL",
  },

  {
    title: "High",
    value: "HIGH",
  },

  {
    title: "Medium",
    value: "MEDIUM",
  },

  {
    title: "Low",
    value: "LOW",
  },
];

const statusOptions = [
  {
    title: "Todo",
    value: "Todo",
  },

  {
    title: "Doing",
    value: "Doing",
  },

  {
    title: "To Review",
    value: "ToReview",
  },

  {
    title: "Done",
    value: "Done",
  },

  {
    title: "Canceled",
    value: "Canceled",
  },
];

const rules = {
  required: (message: string) => (value: any) => !!value || message,
};

const loadUsers = async () => {
  try {
    loadingUsers.value = true;

    users.value = await fetchUsersForSelect();
  } catch (error: any) {
    fireNotification("red", error.message || "Failed loading users");
  } finally {
    loadingUsers.value = false;
  }
};

watch(
  () => props.task,

  (task) => {
    if (task) {
      formData.value = {
        title: task.title || "",

        desc: task.desc || "",

        priority: task.priority || "MEDIUM",

        status: task.status || "Todo",

        assigneeId: task.assigneeId || "",
      };
    }
  },
  {
    immediate: true,
  },
);

watch(
  isOpen,

  (show) => {
    if (show) {
      loadUsers();
    } else {
      resetForm();
    }
  },
);

const resetForm = () => {
  formData.value = {
    title: "",

    desc: "",

    priority: "MEDIUM",

    status: "Todo",

    assigneeId: "",
  };

  form.value?.resetValidation();
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    fireNotification("red", "Please fill required fields");

    return;
  }

  try {
    saving.value = true;

    const payload = {
      title: formData.value.title,

      desc: formData.value.desc,

      priority: formData.value.priority,

      status: formData.value.status,

      assigneeId: formData.value.assigneeId,
    };

    if (isEditing.value && props.task) {
      await updateTask(props.task.id, payload);

      fireNotification("green", "Task updated successfully");
    } else {
      await createTask(payload);

      fireNotification("green", "Task created successfully");
    }

    emit("saved");

    handleClose();
  } catch (error: any) {
    fireNotification("red", error.message || "Unable to save task");
  } finally {
    saving.value = false;
  }
};

const handleClose = () => {
  isOpen.value = false;

  resetForm();
};
</script>
<template>
  <v-dialog v-model="isOpen" max-width="560" persistent>
    <v-card>
      <v-card-title>
        {{ isEditing ? "Edit Task" : "Create Task" }}

        <v-spacer />

        <v-btn icon="mdi-close" variant="text" @click="handleClose" />
      </v-card-title>

      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.title"
            label="Title"
            variant="outlined"
            density="compact"
            :rules="[rules.required('Title required')]"
          />

          <v-textarea
            v-model="formData.desc"
            label="Description"
            variant="outlined"
            density="compact"
          />

          <v-select
            v-model="formData.priority"
            label="Priority"
            :items="priorityOptions"
            variant="outlined"
            density="compact"
          />

          <v-select
            v-model="formData.status"
            label="Status"
            :items="statusOptions"
            variant="outlined"
            density="compact"
          />

          <v-select
            v-model="formData.assigneeId"
            label="Assign To"
            :items="users"
            item-title="name"
            item-value="id"
            variant="outlined"
            density="compact"
            :loading="loadingUsers"
            :rules="[rules.required('Assignee required')]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="text" @click="handleClose"> Cancel </v-btn>

        <v-spacer />

        <v-btn color="primary" :loading="saving" @click="handleSubmit">
          {{ isEditing ? "Update" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
