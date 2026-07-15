import type { UserSignDTO } from "./UserTypes";

export interface Task {
  id: string;
  title: string;
  desc?: string;
  priority: number;
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
  User: UserSignDTO
  createdAt: string;
  doneAt?: string;
}

export interface CreateTaskDto {
  title: string;
  desc?: string;
  priority?: number;
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
}

export interface ChangeStatusDto {
  status: "Todo" | "Doing" | "ToReview" | "Done" | "Canceled";
}
