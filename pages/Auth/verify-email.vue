<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserService } from "~/composables/useUserService";
import { useNotification } from "~/composables/useNotification";

const status = ref<"loading" | "success" | "error">("loading");
const resendVerificationBtn = ref(true);

const route = useRoute();
const { fireNotification } = useNotification();
const userService = useUserService();

const token = route.query.token as string;
onMounted(async () => {
  if (!token) {
    status.value = "error";
    fireNotification("error", "Invalid or missing token.");
    return;
  }

  try {
    await userService.verifyEmail(token);
    status.value = "success";
    fireNotification("success", "Your email has been successfully verified!");
  } catch (error) {
    console.error(error);
    status.value = "error";
    fireNotification("error", "Verification link is invalid or expired.");
  }
});

const email = route.query.email as string;
async function resendVerification() {
  try {
    await userService.reSendVerificationEmail(email);
    resendVerificationBtn.value = false;
    useRouter().push("/auth/login");
  } catch (error) {
    console.error(error);
    fireNotification("error", "Failed to resend verification email.");
  }
}
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="5" xl="4">
        <!-- Loading State -->
        <v-card
          v-if="status === 'loading'"
          color="#1a1a1a"
          class="pa-8 text-center"
          elevation="2"
          rounded="lg"
          border
        >
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            class="mb-4"
          />
          <p class="text-white">Verifying your email...</p>
        </v-card>

        <!-- Success State -->
        <v-card
          v-else-if="status === 'success'"
          color="#1a1a1a"
          class="pa-8 text-center"
          elevation="2"
          rounded="lg"
          border
        >
          <v-icon color="success" size="64" class="mb-4"
            >mdi-check-circle-outline</v-icon
          >
          <v-card-title class="text-h5 font-weight-bold text-white mb-4">
            Email Verified!
          </v-card-title>
          <p class="text-grey-darken-1 mb-6">
            Your email has been successfully verified. You can now login to your
            account.
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
        </v-card>

        <!-- Error State -->
        <v-card
          v-else-if="status === 'error'"
          color="#1a1a1a"
          class="pa-8 text-center"
          elevation="2"
          rounded="lg"
          border
        >
          <v-icon color="error" size="64" class="mb-4"
            >mdi-alert-circle-outline</v-icon
          >
          <v-card-title class="text-h5 font-weight-bold text-white mb-4">
            Invalid or Expired Link
          </v-card-title>
          <p class="text-grey-darken-1 mb-6">
            The verification link is invalid or has expired. Please request a
            new one.
          </p>
          <v-btn
            v-if="resendVerificationBtn"
            color="primary"
            variant="elevated"
            size="large"
            block
            :disabled="!resendVerificationBtn"
            @click="resendVerification"
          >
            <v-icon start>mdi-email-send</v-icon>
            Resend Verification Email
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
