<script setup lang="ts">
import type { TaskFilters } from "~/types/task";
import { useUsers } from "~/composables/useUsers";
const props = defineProps<{ filters: TaskFilters }>();
const emit = defineEmits<{
  (e: "update:filters", filters: TaskFilters): void;
}>();
const { fetchUsersForSelect } = useUsers();
const search = ref(props.filters.search || "");
const statusFilter = ref(props.filters.status || "all");
const priorityFilter = ref(props.filters.priority || "all");
const assigneeFilter = ref(props.filters.assigneeId || "all");
const users = ref<{ id: string; name: string; email: string }[]>([]);
const createdFrom = ref(props.filters.createdFrom || "");
const createdTo = ref(props.filters.createdTo || "");
const doneFrom = ref(props.filters.doneFrom || "");
const doneTo = ref(props.filters.doneTo || "");
const statusOptions = [
  { title: "All", value: "all" },
  { title: "Todo", value: "Todo" },
  { title: "Doing", value: "Doing" },
  { title: "To Review", value: "ToReview" },
  { title: "Done", value: "Done" },
  { title: "Canceled", value: "Canceled" },
];
const priorityOptions = [
  { title: "All", value: "all" },
  { title: "Critical", value: "CRITICAL" },
  { title: "High", value: "HIGH" },
  { title: "Medium", value: "MEDIUM" },
  { title: "Low", value: "LOW" },
];
const assigneeOptions = computed(() => {
  return [
    { title: "All Members", value: "all" },
    ...users.value.map((user) => ({ title: user.name, value: user.id })),
  ];
});
const loadUsers = async () => {
  try {
    users.value = await fetchUsersForSelect();
  } catch (error) {
    console.log(error);
  }
};

onMounted(loadUsers);
const emitFilters = () => {
  emit("update:filters", {
    ...props.filters,
    search: search.value,
    status: statusFilter.value,
    priority: priorityFilter.value,
    assigneeId: assigneeFilter.value,
    createdFrom: createdFrom.value || undefined,
    createdTo: createdTo.value || undefined,
    doneFrom: doneFrom.value || undefined,
    doneTo: doneTo.value || undefined,
    page: 1,
  });
};

const debouncedSearch = useDebounceFn(() => {
  emitFilters();
}, 500);
const handleSearch = () => {
  debouncedSearch();
};

const clearFilters = () => {
  search.value = "";
  statusFilter.value = "all";
  priorityFilter.value = "all";
  assigneeFilter.value = "all";
  createdFrom.value = "";
  createdTo.value = "";
  doneFrom.value = "";
  doneTo.value = "";
  emit("update:filters", {
    page: 1,
    limit: props.filters.limit || 10,
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
};

watch(
  () => props.filters,
  (filters) => {
    search.value = filters.search || "";
    statusFilter.value = filters.status || "all";
    priorityFilter.value = filters.priority || "all";
    assigneeFilter.value = filters.assigneeId || "all";
    createdFrom.value = filters.createdFrom || "";
    createdTo.value = filters.createdTo || "";
    doneFrom.value = filters.doneFrom || "";
    doneTo.value = filters.doneTo || "";
  },
  { deep: true },
);
</script>
<template>
  <v-card class="pa-6" color="transparent" variant="flat">
    <v-text-field
      v-model="search"
      placeholder="Search tasks..."
      prepend-inner-icon="mdi-magnify"
      variant="solo"
      flat
      hide-details
      class="mb-5 border rounded-lg"
      @update:model-value="handleSearch"
    />
    <v-row dense>
      <v-col cols="12" md="4">
        <v-select
          v-model="statusFilter"
          :items="statusOptions"
          label="Status"
          prepend-inner-icon="mdi-checkbox-marked-circle-outline"
          variant="solo"
          flat
          hide-details
          class="border rounded-lg"
          @update:model-value="emitFilters"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="priorityFilter"
          :items="priorityOptions"
          label="Priority"
          prepend-inner-icon="mdi-flag-outline"
          variant="solo"
          flat
          hide-details
          class="border rounded-lg"
          @update:model-value="emitFilters"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="assigneeFilter"
          :items="assigneeOptions"
          label="Assignee"
          prepend-inner-icon="mdi-account"
          variant="solo"
          flat
          hide-details
          class="border rounded-lg"
          @update:model-value="emitFilters"
        />
      </v-col>
    </v-row>
    <v-row dense class="mt-4">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="createdFrom"
          label="Created From"
          type="date"
          variant="solo"
          flat
          hide-details
          @change="emitFilters"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="createdTo"
          label="Created To"
          type="date"
          variant="solo"
          flat
          hide-details
          @change="emitFilters"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="doneFrom"
          label="Done From"
          type="date"
          variant="solo"
          flat
          hide-details
          @change="emitFilters"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="doneTo"
          label="Done To"
          type="date"
          variant="solo"
          flat
          hide-details
          @change="emitFilters"
        />
      </v-col>
    </v-row>
    <v-btn
      class="mt-5"
      height="50"
      variant="tonal"
      prepend-icon="mdi-refresh"
      rounded="lg"
      @click="clearFilters"
    >
      Clear Filters
    </v-btn>
  </v-card>
</template>
