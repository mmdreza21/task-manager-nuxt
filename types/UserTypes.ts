import type { ApiCallCommon } from "./ApiCallCommon";

export type UserLoginDTO = {
  email: string;
  password: string;
};
export type UserSignDTO = {
  name: string;
  email: string;
  password: string;
};

export type UserOtpLoginDTO = {
  email: string;
  otp: string;
  password: string;
};

export type OAthReqDTO = {
  token: string;
  referred_by?: string;
};

export type SendOtpDTO = {
  email: string;
};

export type OtpReqDTO = {
  email: string;
  otp: string;
};

export type SuccessLogin = {
  expires_in: number;
  access_token: string;
  token_type: string;
};

export type signUpResponse = {
  user: {
    email: string;
    email_verified_at: string;
  };
};

export type UserType = ApiCallCommon & {
  email: string;
  roles: string;
  name: string;
};

export type AuthStoreType = {
  user: UserType | null;
  loggedIn: boolean;
};

export type userUpdateDto = Pick<UserType, "email" | "roles" | "name">;
// types/user.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'AdminOfSite' | 'User';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  search?: string;
  role?: string;
  isEmailVerified?: boolean;
  page: number;
  limit: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedUserResponse {
  data: User[];
  items: number;
  page: number;
  totalPages: number;
}

export interface UserSelectOption {
  id: string;
  name: string;
  email: string;
}