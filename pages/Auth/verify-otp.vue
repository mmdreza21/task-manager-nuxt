<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

definePageMeta({ middleware: "guest" });

const route = useRoute();
const email = ref((route.query.email as string) || "");
const otp = ref("");
const newPassword = ref("");
const loading = ref(false);
const showPassword = ref(false);

const { fireNotification } = useNotification();

const rules = {
  required: (v: string) => !!v || "This field is required",
  otp: (v: string) => /^\d{4,6}$/.test(v) || "Invalid OTP code",
  password: (v: string) =>
    v.length >= 6 || "Password must be at least 6 characters",
};

// const verifyAndReset = async () => {
//   loading.value = true;
//   try {
//     await useUserService().verifyEmailOtp({
//       email: email.value,
//       otp: otp.value,
//     });
//     await useAuthService().resetPassword({
//       email: email.value,
//       password: newPassword.value,
//     });
//     fireNotification("Password reset successfully!", "success");
//     navigateTo("/auth/login");
//   } catch (error: any) {
//     fireNotification(error?.message || "Verification failed", "error");
//   } finally {
//     loading.value = false;
//   }
// };
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
              >mdi-shield-check</v-icon
            >
            Verify OTP
          </v-card-title>

          <p class="text-grey-darken-1 mb-6">
            Enter the verification code sent to
            <br />
            <span class="text-primary font-weight-bold">{{ email }}</span>
          </p>

          <v-divider color="grey-darken-4" class="mb-6" />

          <v-form @submit.prevent="">
            <v-text-field
              v-model="otp"
              label="Verification Code"
              type="text"
              :rules="[rules.required, rules.otp]"
              prepend-inner-icon="mdi-numeric"
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
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
              label="New Password"
              :rules="[rules.required, rules.password]"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
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
              <v-icon start>mdi-check</v-icon>
              Verify & Reset
            </v-btn>
          </v-form>

          <v-divider color="grey-darken-4" class="my-4" />

          <p class="text-grey-darken-1">
            Back to
            <NuxtLink
              to="/auth/login"
              class="text-primary font-weight-bold"
              style="text-decoration: none"
            >
              Login
            </NuxtLink>
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
