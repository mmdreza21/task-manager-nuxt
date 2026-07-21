import type { User } from "./UserTypes";

export interface Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
  priority: TaskPriority;
  doneAt: string | null;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  assigneeId: string;
  creator?: User;
  assignee?: User;
}

export type TaskStatus =
  | "Todo"
  | "Doing"
  | "ToReview"
  | "Done"
  | "Canceled";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export interface TaskWithAssignees extends Task {
  creator?: User;
  assignee?: User;
  assignees: User[];
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  assigneeId?: string | "all";
  search?: string;
  createdFrom?: string;
  createdTo?: string;
  doneFrom?: string;
  doneTo?: string;
  sortBy?: "createdAt" | "updatedAt" | "doneAt";
  sortOrder?: "asc" | "desc";
  page: number;
  limit: number;
}

export interface TaskPageResponse {
  data: TaskWithAssignees[],
  total: number,
  page: number,
  totalPages: number
}

export interface TaskListResponse {
  tasks: TaskWithAssignees[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateTaskPayload {
  title: string;
  desc?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeId: string;
}

export interface UpdateTaskPayload {
  title?: string;
  desc?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeId?: string;
}