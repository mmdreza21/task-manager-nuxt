// composables/useUsers.ts
import type { PaginatedUserResponse, User, UserFilters } from "~/types/UserTypes";
import { useNotification } from "./useNotification";

export const useUsers = () => {
    const { $apiClient } = useNuxtApp();
    const { fireNotification } = useNotification();

    class UserService {
        // Get all users with filters and pagination
        async fetchUsers(filters: UserFilters): Promise<{
            users: User[];
            total: number;
            page: number;
            totalPages: number;
        }> {
            try {
                // Build query parameters
                const query = new URLSearchParams({
                    page: String(filters.page || 1),
                    limit: String(filters.limit || 10),
                });

                // Add filters
                if (filters.search?.trim()) {
                    query.append("search", filters.search.trim());
                }

                if (filters.role && filters.role !== "all") {
                    query.append("role", filters.role);
                }

                if (filters.isEmailVerified !== undefined && filters.isEmailVerified !== null) {
                    query.append("isEmailVerified", String(filters.isEmailVerified));
                }

                // Add sorting
                const sortBy = filters.sortBy || "createdAt";
                const sortOrder = filters.sortOrder || "desc";
                query.append("sortBy", sortBy);
                query.append("sortOrder", sortOrder);

                // Make API request
                const response = await $apiClient<PaginatedUserResponse>(`/users/all?${query}`, {
                    method: 'GET'
                });

                return {
                    users: response.data,
                    total: response.items,
                    page: response.page,
                    totalPages: response.totalPages,
                };
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to fetch users");
                throw error;
            }
        }

        // Get users for select/dropdown (minimal data)
        async fetchUsersForSelect(search?: string): Promise<{ id: string; name: string; email: string }[]> {
            try {
                const query = new URLSearchParams();
                if (search?.trim()) {
                    query.append("search", search.trim());
                }

                const response = await $apiClient<{ id: string; name: string; email: string }[]>(`/users/select?${query}`, {
                    method: 'GET'
                });

                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to fetch users for select");
                throw error;
            }
        }

        // Get current user profile
        async fetchProfile(): Promise<User> {
            try {
                const response = await $apiClient<User>("/users/profile", {
                    method: 'GET'
                });

                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to fetch profile");
                throw error;
            }
        }

        // Get a single user by ID
        async fetchUserById(id: string): Promise<User> {
            try {
                const response = await $apiClient<User>(`/users/${id}`, {
                    method: 'GET'
                });

                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to fetch user");
                throw error;
            }
        }

        // Update user
        async updateUser(data: Partial<User>): Promise<User> {
            try {
                const response = await $apiClient<User>("/users", {
                    method: 'PATCH',
                    body: data
                });

                fireNotification("green", "User updated successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to update user");
                throw error;
            }
        }

        // Change password
        async changePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>("/users/change-password", {
                    method: 'POST',
                    body: { oldPassword, newPassword }
                });

                fireNotification("green", "Password changed successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to change password");
                throw error;
            }
        }

        // Send email verification
        async sendEmailVerification(email: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>("/users/send-verification-email", {
                    method: 'POST',
                    body: { email }
                });

                fireNotification("green", "Verification email sent successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to send verification email");
                throw error;
            }
        }

        // Verify email with OTP
        async verifyEmail(email: string, otp: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>("/users/verify-email", {
                    method: 'POST',
                    body: { email, otp }
                });

                fireNotification("green", "Email verified successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to verify email");
                throw error;
            }
        }

        // Verify email with token
        async verifyEmailToken(token: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>(`/users/verify?token=${token}`, {
                    method: 'GET'
                });

                fireNotification("green", "Email verified successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to verify email");
                throw error;
            }
        }

        // Forgot password - send OTP
        async forgotPassword(email: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>("/users/forgot-password", {
                    method: 'POST',
                    body: { email }
                });

                fireNotification("green", "Password reset OTP sent successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to send reset OTP");
                throw error;
            }
        }

        // Reset password with OTP
        async resetPassword(otp: string, newPassword: string): Promise<{ message: string }> {
            try {
                const response = await $apiClient<{ message: string }>("/users/reset-password", {
                    method: 'POST',
                    body: { otp, newPassword }
                });

                fireNotification("green", "Password reset successfully!");
                return response;
            } catch (error: any) {
                fireNotification("red", error.message || "Failed to reset password");
                throw error;
            }
        }
    }

    return new UserService();
};