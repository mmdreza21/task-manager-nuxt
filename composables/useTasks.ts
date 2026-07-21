// composables/useTasks.ts
import type {
  Task,
  TaskFilters,
  TaskPageResponse,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "~/types/task";
import { useNotification } from "./useNotification";

export const useTasks = () => {
  const { $apiClient } = useNuxtApp();
  const { fireNotification } = useNotification();

  const buildQuery = (filters: TaskFilters) => {
    const query = new URLSearchParams({
      page: String(filters.page ?? 1),
      limit: String(filters.limit ?? 10),
    });

    if (
      filters.status &&
      filters.status !== "all"
    ) {
      query.append(
        "status",
        filters.status,
      );
    }

    if (
      filters.priority &&
      filters.priority !== "all"
    ) {
      query.append(
        "priority",
        filters.priority,
      );
    }

    if (
      filters.assigneeId &&
      filters.assigneeId !== "all"
    ) {
      query.append(
        "assigneeId",
        filters.assigneeId,
      );
    }

    if (filters.search?.trim()) {
      query.append(
        "search",
        filters.search.trim(),
      );
    }

    query.append(
      "sortBy",
      filters.sortBy ?? "createdAt",
    );

    query.append(
      "sortOrder",
      filters.sortOrder ?? "desc",
    );

    return query.toString();
  };

  const fetchTasks = async (
    filters: TaskFilters,
  ): Promise<TaskPageResponse> => {
    try {
      const query = buildQuery(filters);
      return await $apiClient<TaskPageResponse>(
        `/task/all?${query}`,
        {
          method: "GET",
        },
      );
    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to fetch tasks",
      );
      throw error;
    }
  };

  const fetchAllTasks = async (
    filters: TaskFilters,
  ): Promise<TaskPageResponse> => {
    try {
      const query = buildQuery(filters);

      return await $apiClient<TaskPageResponse>(
        `/task/all?${query}`,
        {
          method: "GET",
        },
      );

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to fetch all tasks",
      );
      throw error;
    }
  };

  const fetchTaskById = async (
    id: string,
  ): Promise<Task> => {
    try {
      return await $apiClient<Task>(
        `/task/${id}`,
        {
          method: "GET",
        },
      );

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to fetch task",
      );
      throw error;
    }
  };

  const createTask = async (
    task: CreateTaskPayload,
  ): Promise<Task> => {
    try {
      const payload = {
        title: task.title,
        desc: task.desc ?? "",
        priority: task.priority ?? "LOW",
        status: task.status ?? "Todo",
        assigneeId: task.assigneeId,
      };

      const response =
        await $apiClient<Task>(
          "/task",
          {
            method: "POST",
            body: payload,
          },
        );

      fireNotification(
        "green",
        "Task created successfully!",
      );

      return response;

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to create task",
      );
      throw error;
    }
  };

  const updateTask = async (
    id: string,
    task: UpdateTaskPayload,
  ): Promise<Task> => {
    try {
      const response =
        await $apiClient<Task>(
          `/task/${id}`,
          {
            method: "PATCH",
            body: task,
          },
        );

      fireNotification(
        "green",
        "Task updated successfully!",
      );

      return response;

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to update task",
      );

      throw error;
    }
  };

  const updateTaskStatus = async (
    id: string,
    status: Task["status"],
  ): Promise<Task> => {
    try {
      const response =
        await $apiClient<Task>(
          `/task/${id}/status`,
          {
            method: "PATCH",
            body: {
              status,
            },
          },
        );

      fireNotification(
        "green",
        "Task status updated!",
      );

      return response;

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to update task status",
      );

      throw error;
    }
  };

  const deleteTask = async (
    id: string,
  ): Promise<void> => {
    try {
      await $apiClient(
        `/task/${id}`,
        {
          method: "DELETE",
        },
      );

      fireNotification(
        "green",
        "Task deleted successfully!",
      );

    } catch (error: any) {
      fireNotification(
        "red",
        error.message || "Failed to delete task",
      );

      throw error;
    }
  };

  return {
    fetchTasks,
    fetchAllTasks,
    fetchTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
};