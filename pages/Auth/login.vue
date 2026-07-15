<script setup lang="ts">
import { ref } from "vue";
definePageMeta({ middleware: "guest" });

const email = ref("");
const password = ref("");
const loading = ref(false);

const { fireNotification } = useNotification();

const rules = {
  required: (v: string) => !!v || "This field is required",
  email: (v: string) => /.+@.+\..+/.test(v) || "Invalid email format",
};

const login = async () => {
  loading.value = true;

  try {
    await useAuthService()
      .loginProcess(useAuthService().loginWithPass)
      .login({ email: email.value, password: password.value });
  } catch (error: any) {
    fireNotification("error", error?.message || "Login failed.");
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
          <v-card-title class="text-h5 font-weight-bold text-white mb-2">
            <v-icon color="primary" size="40" class="mb-2"
              >mdi-account-circle</v-icon
            >
            <br />
            Task Manager
          </v-card-title>

          <p class="text-grey-darken-1 mb-6">
            Manage your work smartly — sign in to continue
          </p>

          <v-divider color="grey-darken-4" class="mb-6" />

          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="comfortable"
              bg-color="grey-darken-4"
              color="primary"
              base-color="grey-darken-3"
              class="mb-4"
              hide-details="auto"
              required
            />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              bg-color="grey-darken-4"
              color="primary"
              base-color="grey-darken-3"
              class="mb-2"
              hide-details="auto"
              required
            />

            <div class="d-flex justify-end mb-4">
              <NuxtLink
                to="/auth/forgot-password"
                class="text-primary font-weight-medium"
                style="text-decoration: none"
              >
                Forgot password?
              </NuxtLink>
            </div>

            <v-btn
              type="submit"
              color="primary"
              variant="elevated"
              size="large"
              block
              :loading="loading"
              class="mb-4"
            >
              <v-icon start>mdi-login</v-icon>
              Login
            </v-btn>
          </v-form>

          <v-divider color="grey-darken-4" class="my-4" />

          <p class="text-grey-darken-1">
            Don't have an account?
            <NuxtLink
              to="/auth/register"
              class="text-primary font-weight-bold"
              style="text-decoration: none"
            >
              Create one
            </NuxtLink>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
