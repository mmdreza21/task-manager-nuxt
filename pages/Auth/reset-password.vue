<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserService } from "~/composables/useUserService";
import { useNotification } from "~/composables/useNotification";

definePageMeta({ middleware: "guest" });

const route = useRoute();
const email = ref((route.query.email as string) || "");
const otp = ref("");
const newPassword = ref("");
const loading = ref(false);
const { fireNotification } = useNotification();

const rules = {
  required: (v: string) => !!v || "This field is required",
  otp: (v: string) => /^\d{4,6}$/.test(v) || "Invalid OTP code",
};

const resetPassword = async () => {
  loading.value = true;
  try {
    await useUserService().resetPassword({
      otp: otp.value,
      newPassword: newPassword.value,
    });

    fireNotification("success", "Password reset successfully!");
    navigateTo("/auth/login");
  } catch (error: any) {
    fireNotification("error", error?.message || "Failed to reset password");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card
    min-height="100vh"
    color="transparent"
    variant="flat"
    class="w-100 h-100 d-flex justify-center align-center"
  >
    <v-card
      color="transparent"
      class="glass-card pa-10 text-center"
      elevation="12"
      max-width="440"
      width="100%"
    >
      <div class="mb-8">
        <h1 class="text-h4 font-weight-bold mb-2 text-light">Reset Password</h1>
        <p class="text-body-2 text-dim">
          Enter the OTP sent to your email:
          <br />
          <span class="text-cyan-400">{{ email }}</span>
        </p>
      </div>

      <v-form @submit.prevent="resetPassword" class="d-flex flex-column gap-5">
        <!-- ✅ OTP Input Field -->
        <v-otp-input
          v-model="otp"
          length="6"
          type="text"
          :rules="[rules.required, rules.otp]"
          density="comfortable"
          class="glass-input"
          hide-details="auto"
          required
        />

        <v-text-field
          v-model="newPassword"
          label="New Password"
          type="password"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-lock-outline"
          density="comfortable"
          class="glass-input"
          hide-details="auto"
          required
        />

        <v-btn
          type="submit"
          :loading="loading"
          size="large"
          class="glass-btn mt-2"
          block
        >
          Reset Password
        </v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <p class="text-light">
        Back to
        <NuxtLink to="/auth/login" class="text-light font-weight-medium">
          Login
        </NuxtLink>
      </p>
    </v-card>
  </v-card>
</template>

<style scoped>
.text-error {
  color: #ef4444;
}
</style>
