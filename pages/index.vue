<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  title: "Task Manager",
  description: "Your modern task management workspace",
});

const { user } = useAuthUser();
const router = useRouter();

const quickLinks = [
  {
    title: "Task Board",
    description:
      "Create, organize, and track your daily workload with clarity.",
    icon: "mdi-format-list-checks",
    to: "/tasks",
    color: "primary",
  },
  {
    title: "AI Assistant",
    description:
      "Get recommendations and support from your intelligent workspace.",
    icon: "mdi-robot",
    to: "/ai",
    color: "deep-purple",
  },
  {
    title: "Live Chat",
    description:
      "Jump into conversations, updates, and collaborative discussions.",
    icon: "mdi-forum",
    to: "/chat",
    color: "teal",
  },
  {
    title: "Games Hub",
    description:
      "Take a break and enjoy the built-in collection of casual games.",
    icon: "mdi-controller",
    to: "/games",
    color: "amber",
  },
  {
    title: "Profile",
    description:
      "Manage your account details, preferences, and security settings.",
    icon: "mdi-account-circle",
    to: "/profile/info",
    color: "indigo",
  },
  {
    title: "Authentication",
    description: "Sign in, register, or recover access to your account.",
    icon: "mdi-lock-open-variant",
    to: "/Auth/login",
    color: "cyan",
  },
];

const highlights = [
  {
    icon: "mdi-bullseye-arrow",
    title: "Focused planning",
    description:
      "Keep your goals, deadlines, and priorities in one clean view.",
  },
  {
    icon: "mdi-lightning-bolt",
    title: "Fast access",
    description:
      "Jump straight into tasks, chats, and AI tools without friction.",
  },
  {
    icon: "mdi-shield-check",
    title: "Secure experience",
    description:
      "Protected routes and account-based access keep your workspace safe.",
  },
];

const goToTasks = () => {
  if (user) {
    router.push("/tasks");
  } else {
    router.push("/Auth/login");
  }
};
</script>

<template>
  <v-container fluid class="py-8">
    <v-row align="center" justify="center" class="mb-8">
      <v-col cols="12" lg="7">
        <v-chip class="mb-4" color="primary" variant="tonal" size="small">
          <v-icon start size="16">mdi-sparkles</v-icon>
          A modern workspace for everything you do
        </v-chip>

        <h1 class="text-h2 font-weight-bold mb-4">
          Plan work.<br />
          <span class="text-primary">Move faster.</span>
        </h1>

        <p class="text-body-1 text-medium-emphasis mb-6">
          Organize your team, manage personal tasks, explore AI tools, and enjoy
          a polished experience from one landing page.
        </p>

        <div class="d-flex flex-wrap ga-3">
          <v-btn
            color="primary"
            size="large"
            rounded="lg"
            append-icon="mdi-arrow-right"
            @click="goToTasks"
          >
            {{ user ? "Open your workspace" : "Get started" }}
          </v-btn>
          <v-btn variant="outlined" size="large" rounded="lg" to="/chat">
            Explore chat
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" lg="5">
        <v-card class="pa-4" rounded="xl" variant="outlined" border="thin">
          <v-card-title class="text-h6 mb-2">Workspace overview</v-card-title>
          <v-card-text>
            <div class="d-flex align-center justify-space-between mb-3">
              <span class="text-medium-emphasis">Task flow</span>
              <span class="text-primary font-weight-bold">Organized</span>
            </div>
            <div class="d-flex align-center justify-space-between mb-3">
              <span class="text-medium-emphasis">AI tools</span>
              <span class="text-primary font-weight-bold">Ready</span>
            </div>
            <div class="d-flex align-center justify-space-between mb-3">
              <span class="text-medium-emphasis">Collaboration</span>
              <span class="text-primary font-weight-bold">Live</span>
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="text-medium-emphasis">Games</span>
              <span class="text-primary font-weight-bold">Included</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" class="text-center py-4">
        <h2 class="text-h5 font-weight-bold mb-2">Quick access to the app</h2>
        <p class="text-medium-emphasis">
          Pick the area you want to open and jump right in.
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="link in quickLinks"
        :key="link.title"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="h-100" rounded="xl" variant="outlined" hover>
          <v-card-item>
            <template #prepend>
              <v-avatar :color="link.color" variant="tonal" size="48">
                <v-icon :color="link.color">{{ link.icon }}</v-icon>
              </v-avatar>
            </template>
            <v-card-title>{{ link.title }}</v-card-title>
          </v-card-item>

          <v-card-text>{{ link.description }}</v-card-text>

          <v-card-actions>
            <v-btn
              :to="link.to"
              variant="text"
              color="primary"
              append-icon="mdi-arrow-right"
            >
              Open
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="7">
        <v-card rounded="xl" variant="outlined">
          <v-card-title class="mb-2">Built for your routine</v-card-title>
          <v-card-text>
            <v-list density="comfortable">
              <v-list-item v-for="item in highlights" :key="item.title">
                <template #prepend>
                  <v-icon color="primary">{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.description
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card color="primary" variant="tonal" rounded="xl" class="h-100">
          <v-card-text class="pa-6">
            <h3 class="text-h6 font-weight-bold mb-2">Ready when you are</h3>
            <p class="mb-4">
              Start with your tasks, explore the AI area, or jump into the chat
              experience.
            </p>
            <div class="d-flex flex-wrap ga-3">
              <v-btn color="primary" @click="goToTasks">Jump in</v-btn>
              <v-btn variant="outlined" to="/Auth/register"
                >Create account</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
