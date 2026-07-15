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
const registrationSuccess = ref(false);

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
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="5" xl="4">
        <v-card
          color="#1a1a1a"
          class="pa-8 text-center"
          elevation="2"
          rounded="lg"
          border
        >
          <!-- Success state -->
          <template v-if="registrationSuccess">
            <v-icon color="success" size="64" class="mb-4"
              >mdi-email-check-outline</v-icon
            >
            <v-card-title class="text-h6 font-weight-bold text-white mb-2">
              Verification Email Sent!
            </v-card-title>
            <p class="text-grey-darken-1 mb-6">
              A verification link has been sent to
              <b class="text-white">{{ email }}</b
              >.
              <br />
              Please check your inbox and click the link to verify your account.
            </p>
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              block
              to="/auth/login"
            >
              <v-icon start>mdi-login</v-icon>
              Go to Login
            </v-btn>
          </template>

          <!-- Registration form -->
          <template v-else>
            <v-card-title class="text-h font-weight-bold text-white mb-2">
              <v-icon color="primary" size="36" class="mr-2"
                >mdi-account-plus</v-icon
              >
              Create Account
            </v-card-title>

            <p class="text-grey-darken-1 mb-6">
              Sign up to start managing your tasks
            </p>

            <v-divider color="grey-darken-4" class="mb-6" />

            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="name"
                label="Full Name"
                type="text"
                variant="outlined"
                density="comfortable"
                bg-color="grey-darken-4"
                color="primary"
                base-color="grey-darken-3"
                prepend-inner-icon="mdi-account"
                class="mb-4"
                hide-details="auto"
                required
              />

              <v-text-field
                v-model="email"
                label="Email Address"
                type="email"
                variant="outlined"
                density="comfortable"
                bg-color="grey-darken-4"
                color="primary"
                base-color="grey-darken-3"
                prepend-inner-icon="mdi-email"
                class="mb-4"
                hide-details="auto"
                required
              />

              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                variant="outlined"
                density="comfortable"
                bg-color="grey-darken-4"
                color="primary"
                base-color="grey-darken-3"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                class="mb-4"
                hide-details="auto"
                required
              />

              <v-text-field
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Confirm Password"
                variant="outlined"
                density="comfortable"
                bg-color="grey-darken-4"
                color="primary"
                base-color="grey-darken-3"
                prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="
                  showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                class="mb-4"
                hide-details="auto"
                required
              />

              <v-btn
                type="submit"
                color="primary"
                variant="elevated"
                size="large"
                block
                :loading="loading"
                class="mb-4"
              >
                <v-icon start>mdi-account-plus</v-icon>
                Register
              </v-btn>
            </v-form>

            <v-divider color="grey-darken-4" class="my-4" />

            <p class="text-grey-darken-1">
              Already have an account?
              <NuxtLink
                to="/auth/login"
                class="text-primary font-weight-bold"
                style="text-decoration: none"
              >
                Sign in
              </NuxtLink>
            </p>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
