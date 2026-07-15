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
            <v-icon color="primary" size="36" class="mr-2"
              >mdi-lock-reset</v-icon
            >
            Forgot Password
          </v-card-title>

          <p class="text-grey-darken-1 mb-6">
            Enter your email to receive a verification code
          </p>

          <v-divider color="grey-darken-4" class="mb-6" />

          <v-form @submit.prevent="sendOtp">
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

            <v-btn
              type="submit"
              color="primary"
              variant="elevated"
              size="large"
              block
              :loading="loading"
              class="mb-4"
            >
              <v-icon start>mdi-send</v-icon>
              Send OTP
            </v-btn>
          </v-form>

          <v-divider color="grey-darken-4" class="my-4" />

          <p class="text-grey-darken-1">
            Remember your password?
            <NuxtLink
              to="/auth/login"
              class="text-primary font-weight-bold"
              style="text-decoration: none"
            >
              Go back to login
            </NuxtLink>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
