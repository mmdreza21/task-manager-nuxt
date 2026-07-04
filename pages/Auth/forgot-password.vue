<script setup lang="ts">
import { ref } from "vue";

definePageMeta({ middleware: "guest" });

const email = ref("");
const loading = ref(false);
const { fireNotification } = useNotification();

const rules = {
  required: (v: string) => !!v || "This field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "Invalid email format",
};

const sendOtp = async () => {
  loading.value = true;
  try {
    await useUserService().forgotPassword({ email: email.value });
    fireNotification("OTP sent to your email.", "success");
    navigateTo(`/auth/reset-password?email=${encodeURIComponent(email.value)}`);
  } catch (error: any) {
    fireNotification("error", error?.message || "Failed to send OTP");
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
        <h1 class="text-h4 font-weight-bold mb-2 text-light">
          Forgot Password
        </h1>
        <p class="text-body-2 text-dim">
          Enter your email to receive a verification code
        </p>
      </div>

      <v-form @submit.prevent="sendOtp" class="d-flex flex-column gap-5">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-email-outline"
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
          Send OTP
        </v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <p class="text-light">
        Remember your password?
        <NuxtLink to="/auth/login" class="text-light font-weight-medium">
          Go back to login
        </NuxtLink>
      </p>
    </v-card>
  </v-card>
</template>
