<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.replace("/auth/login");
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card
          color="#1a1a1a"
          class="pa-8 text-center"
          elevation="2"
          rounded="lg"
          border
        >
          <v-card-title class="text-h5 font-weight-bold text-white mb-4">
            <v-icon color="primary" size="40" class="mb-2"
              >mdi-account-circle</v-icon
            >
            <br />
            Welcome!
          </v-card-title>

          <v-divider color="grey-darken-4" class="mb-6" />

          <div class="d-flex flex-column ga-4">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              block
              to="/auth/login"
            >
              <v-icon start>mdi-login</v-icon>
              Login
            </v-btn>

            <v-btn
              color="primary"
              variant="tonal"
              size="large"
              block
              to="/auth/register"
            >
              <v-icon start>mdi-account-plus</v-icon>
              Register
            </v-btn>
          </div>

          <v-divider color="grey-darken-4" class="my-4" />

          <p class="text-grey-darken-1">Redirecting you to login...</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
