<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthService } from "~/composables/useAuthService";

const { fireNotification } = useNotification();
const authService = useAuthService();

const user = ref<{ name: string; email: string } | null>(null);
const loading = ref(false);
const passwordData = ref({
  oldPassword: "",
  newPassword: "",
});
const saving = ref(false);

const getUser = async () => {
  loading.value = true;
  try {
    const res = await authService.getProfile();
    user.value = res;
  } catch (err: any) {
    fireNotification(err.message || "Failed to load profile", "error");
  } finally {
    loading.value = false;
  }
};

const changePassword = async () => {
  if (!passwordData.value.oldPassword || !passwordData.value.newPassword) {
    fireNotification("Please fill all fields", "error");
    return;
  }

  saving.value = true;
  try {
    await authService.changePassword(passwordData.value);
    fireNotification("Password changed successfully", "success");
    passwordData.value = { oldPassword: "", newPassword: "" };
  } catch (err: any) {
    fireNotification(err.message || "Failed to change password", "error");
  } finally {
    saving.value = false;
  }
};

function logout() {
  const token = useCookie("Authorization");
  token.value = "";
  navigateTo("/auth/login");
}

onMounted(() => {
  getUser();
});
</script>

<template>
  <v-container fluid class="fill-height mt-16">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card color="#1a1a1a" class="pa-8" elevation="2" rounded="lg" border>
          <v-card-title
            class="text-h5 font-weight-bold text-white text-center mb-6"
          >
            <v-icon color="primary" size="36" class="mr-2"
              >mdi-account-circle</v-icon
            >
            Profile
          </v-card-title>

          <v-divider color="#333" class="mb-6" />

          <!-- Loading -->
          <v-card-text v-if="loading" class="text-center py-6">
            <v-progress-circular indeterminate color="primary" size="48" />
            <p class="text-white mt-3">Loading profile...</p>
          </v-card-text>

          <!-- User Info -->
          <v-card-text v-else-if="user" class="pa-0">
            <v-list color="transparent" class="pa-0">
              <v-list-item class="mb-2" border rounded="lg" color="#242424">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-account</v-icon>
                </template>
                <v-list-item-title class="text-white">Name</v-list-item-title>
                <v-list-item-subtitle class="text-grey">{{
                  user.name
                }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item border rounded="lg" color="#242424">
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title class="text-white">Email</v-list-item-title>
                <v-list-item-subtitle class="text-grey">{{
                  user.email
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider color="#333" class="my-6" />

            <!-- Change Password -->
            <div class="text-h6 font-weight-bold text-white mb-4">
              Change Password
            </div>

            <v-form @submit.prevent="changePassword">
              <v-text-field
                v-model="passwordData.oldPassword"
                label="Old Password"
                type="password"
                placeholder="Enter your current password"
                variant="outlined"
                density="comfortable"
                bg-color="#242424"
                color="primary"
                base-color="#555"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="passwordData.newPassword"
                label="New Password"
                type="password"
                placeholder="Enter a new password"
                variant="outlined"
                density="comfortable"
                bg-color="#242424"
                color="primary"
                base-color="#555"
                class="mb-4"
                required
              />

              <v-btn
                type="submit"
                color="primary"
                variant="elevated"
                size="large"
                block
                :loading="saving"
                class="mb-3"
              >
                <v-icon start>mdi-lock-reset</v-icon>
                Update Password
              </v-btn>
            </v-form>

            <v-btn
              color="error"
              variant="tonal"
              size="large"
              block
              @click="logout"
            >
              <v-icon start>mdi-logout</v-icon>
              Logout
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-grey {
  color: #888888 !important;
}

:deep(.v-field) {
  background-color: #242424 !important;
  border-color: #333 !important;
  border-radius: 8px !important;
}

:deep(.v-field__input) {
  color: #ffffff !important;
}

:deep(.v-field__label) {
  color: #888888 !important;
}

:deep(.v-field--focused .v-field__label) {
  color: #7c3aed !important;
}

:deep(.v-field__append-inner) {
  color: #888888 !important;
}

:deep(.v-field--variant-outlined .v-field__outline) {
  color: #333 !important;
}

:deep(.v-field--variant-outlined.v-field--focused .v-field__outline) {
  color: #7c3aed !important;
}

:deep(.v-btn--variant-elevated) {
  text-transform: none !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
}

:deep(.v-btn--variant-tonal) {
  text-transform: none !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
}

:deep(.v-list-item) {
  background: #242424 !important;
  border-color: #333 !important;
}
</style>
