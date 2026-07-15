<script setup lang="ts">
const auth = useAuthUser();

const userState = computed(() => auth.getUserState);
</script>

<template>
  <div class="auth-section">
    <!-- Logged out -->
    <div v-if="!userState.loggedIn">
      <v-btn
        v-if="$vuetify.display.mdAndUp"
        text="Login / Sign Up"
        color="primary"
        variant="elevated"
        class="text-none px-6"
        to="/auth/login"
      />
      <v-btn v-else icon variant="text" color="white" to="/auth/login">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </div>

    <!-- Logged in -->
    <div v-else>
      <v-btn
        v-if="$vuetify.display.mdAndUp"
        to="/profile/info"
        color="primary"
        variant="tonal"
        class="text-none px-4"
        :text="
          userState.user?.name
            ? userState.user.name
            : userState.user?.email
              ? userState.user.email.split('@')[0]
              : 'Profile'
        "
      >
        <v-icon start>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn v-else icon variant="text" color="white" to="/profile/info">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.auth-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Simple dark theme overrides */
:deep(.v-btn--variant-elevated) {
  background-color: #1976d2 !important;
  color: #ffffff !important;
  text-transform: none !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
}

:deep(.v-btn--variant-elevated:hover) {
  background-color: #1565c0 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4) !important;
}

:deep(.v-btn--variant-tonal) {
  background-color: rgba(25, 118, 210, 0.12) !important;
  color: #ffffff !important;
  text-transform: none !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
}

:deep(.v-btn--variant-tonal:hover) {
  background-color: rgba(25, 118, 210, 0.2) !important;
}

:deep(.v-btn--variant-text) {
  color: #ffffff !important;
}

:deep(.v-btn--variant-text:hover) {
  color: #1976d2 !important;
}
</style>
