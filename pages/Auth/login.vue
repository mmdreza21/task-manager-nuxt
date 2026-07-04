<script setup lang="ts">
import { ref } from "vue";
definePageMeta({ middleware: "guest" });

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const { fireNotification } = useNotification();

const rules = {
  required: (v: string) => !!v || "This field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "Invalid email format",
};

const login = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    // Simulate API call (replace with actual call)
    const res = await useAuthService()
      .loginProcess(useAuthService().loginWithPass)
      .login({ email: email.value, password: password.value });
  } catch (error: any) {
    errorMessage.value = error?.message || "Login failed.";
    // fireNotification("error", errorMessage.value);
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
        <h1 class="text-h4 font-weight-bold mb-2 text-light">Task Manager</h1>
        <p class="text-body-2 text-dim">
          Manage your work smartly — sign in to continue
        </p>
      </div>

      <v-form @submit.prevent="login" class="d-flex flex-column gap-5">
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

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-lock-outline"
          density="comfortable"
          class="glass-input my-5"
          hide-details="auto"
          required
        />

        <div class="d-flex justify-end">
          <NuxtLink
            to="/auth/forgot-password"
            class="text-light font-weight-medium"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <v-btn
          type="submit"
          :loading="loading"
          size="large"
          class="glass-btn mt-2"
          block
        >
          Login
        </v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <p class="text-light">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-light font-weight-medium">
          Create one
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
