import type { Task, CreateTaskDto, ChangeStatusDto } from "~/types/TaskTypes";
import qs from "qs";
export const useTaskService = () => {
  class TaskService {
    // Fetch tasks with optional filters
    async getTasks(filters: {
      priority?: number | 1;
      createdAt?: string | null;
      doneAt?: string | null;
    }): Promise<{ tasks: Task[]; error: any }> {
      const res: { tasks: Task[]; error: any } = {
        tasks: [],
        error: null,
      };
      try {
        const params = {
          ...filters,
          ...(filters.createdAt && {
            createdAt: new Date(filters.createdAt).toISOString(),
          }),
          ...(filters.doneAt && {
            doneAt: new Date(filters.doneAt).toISOString(),
          }),
        };
        const data = await useNuxtApp().$customFetch<Task[]>(`task/all`, {
          method: "GET",
          params,
        });
        res.tasks = data;
      } catch (error: any) {
        res.error = error;
      }
      return res;
    }

    // Create a new task
    async createTask(
      taskData: CreateTaskDto
    ): Promise<{ task: Task; error: any }> {
      const res: { task: Task; error: any } = {
        task: {} as Task,
        error: null,
      };
      try {
        const data = await useNuxtApp().$customFetch<Task>("/task", {
          method: "POST",
          body: taskData,
        });
        res.task = data;
      } catch (error: any) {
        res.error = error;
      }
      return res;
    }

    // Update the status of a task
    async updateTaskStatus(
      taskId: string,
      status: ChangeStatusDto["status"]
    ): Promise<{ task: Task; error: any }> {
      const res: { task: Task; error: any } = {
        task: {} as Task,
        error: null,
      };
      try {
        const data = await useNuxtApp().$customFetch<Task>(
          `/task/${taskId}/status`,
          {
            method: "PATCH",
            body: { status },
          }
        );
        res.task = data;
      } catch (error: any) {
        res.error = error;
      }
      return res;
    }
  }

  return new TaskService();
};
