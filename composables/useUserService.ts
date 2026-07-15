import { useNotification } from "./useNotification";

export const useUserService = () => {
  const { $customFetch } = useNuxtApp();
  const config = useRuntimeConfig();
  const { fireNotification } = useNotification();

  class UserService {
    async sendVerification(email: string) {
      try {
        return await $customFetch(`/users/send-verification`, {
          method: "POST",
          body: { email },
        });
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Failed to send OTP",
          "error"
        );
        throw error;
      }
    }

    async verifyEmail(token: string) {
      try {
        return await $customFetch(`/users/verify?token=${token}`, {});
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Invalid OTP",
          "error"
        );
        throw error;
      }
    }

    async register(payload: { name: string; email: string; password: string }) {
      try {
        return await $customFetch(`/users`, {
          method: "POST",
          body: payload,
        });
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Registration failed",
          "error"
        );
        throw error;
      }
    }

    async changePassword(oldPassword: string, newPassword: string) {
      try {
        return await $customFetch(`/users/change-password`, {
          method: "POST",
          body: { oldPassword, newPassword },
        });
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Change password failed",
          "error"
        );
        throw error;
      }
    }

    async forgotPassword(payload: { email: string }) {
      try {
        return await $customFetch(`/users/forgot-password`, {
          method: "POST",
          body: payload,
        });
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Failed to send OTP",
          "error"
        );
        throw error;
      }
    }

    async resetPassword(payload: { otp: string; newPassword: string }) {
      try {
        return await $customFetch(`/users/reset-password`, {
          method: "POST",
          body: payload,
        });
      } catch (error: any) {
        fireNotification(
          error?.response?._data?.message || "Reset password failed",
          "error"
        );
        throw error;
      }
    }

    async getProfile() {
      try {
        return await $customFetch(`/users/profile`, {
          method: "GET",
        });
      } catch (error: any) {
        fireNotification("Failed to load user profile", "error");
        throw error;
      }
    }

    async updateProfile(data: { name: string }) {
      try {
        return await $customFetch(`/users`, {
          method: "PATCH",
          body: data,
        });
      } catch (error: any) {
        fireNotification("Profile update failed", "error");
        throw error;
      }
    }
    async reSendVerificationEmail(email: string) {
      try {
        return await $customFetch(`/users/send-verification-email`, {
          method: "POST",
          body: { email },
        });
      } catch (error: any) {
        fireNotification("verification email successfully sent.", "success");
        throw error;
      }
    }
  }

  return new UserService();
};
