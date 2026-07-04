<script setup lang="ts">
import { ref } from "vue";
import { useUserService } from "~/composables/useUserService";
import { useNotification } from "~/composables/useNotification";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const registrationSuccess = ref(false); // 🟢 new state

const userService = useUserService();
const { fireNotification } = useNotification();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    fireNotification("error", "Passwords do not match");
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    await userService.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    registrationSuccess.value = true;
    fireNotification("success", "Verification email sent successfully");
  } catch (err: any) {
    error.value = err?.message || "Registration failed.";
    fireNotification("error", error.value);
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
      <!-- ✅ Show success state -->
      <template v-if="registrationSuccess">
        <v-icon color="success" size="64">mdi-email-check-outline</v-icon>
        <h2 class="mt-4 mb-2 text-light">Verification Email Sent!</h2>
        <p class="text-light mb-6">
          A verification link has been sent to <b>{{ email }}</b
          >.
          <br />
          Please check your inbox and click the link to verify your account.
        </p>
        <v-btn color="primary" class="glass-btn" to="/auth/login" block>
          Go to Login
        </v-btn>
      </template>

      <!-- 🧾 Registration form -->
      <template v-else>
        <h1 class="text-h4 font-weight-bold mb-6 text-light">Create Account</h1>

        <v-form
          @submit.prevent="handleRegister"
          class="d-flex flex-column gap-5"
        >
          <v-text-field
            v-model="name"
            label="Full Name"
            type="text"
            required
            class="glass-input"
          />

          <v-text-field
            v-model="email"
            label="Email Address"
            type="email"
            required
            class="glass-input"
          />

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            required
            class="glass-input"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
          />

          <v-text-field
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            required
            class="glass-input"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
          />

          <v-btn type="submit" :loading="loading" class="glass-btn" block>
            Register
          </v-btn>
        </v-form>

        <p v-if="error" class="text-error mt-3">{{ error }}</p>

        <p class="text-light mt-4">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-light font-weight-medium">
            Sign in
          </NuxtLink>
        </p>
      </template>
    </v-card>
  </v-card>
</template>

<style scoped>
.text-error {
  color: #ef4444;
}
</style>
