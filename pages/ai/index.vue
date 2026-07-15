<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import { useAgentService } from "~/composables/useAgentService";

definePageMeta({
  title: "AI Chat",
  description: "Chat with AI agent",
});

const agentService = useAgentService();

const messageText = ref("");
const loading = ref(false);
const error = ref("");

const messages = ref<{ from: "me" | "ai"; text: string }[]>([]);

const model = ref("groq"); // later selectable

const stream = useAgentStream();

const sendMessage = () => {
  if (!messageText.value.trim()) return;

  const userText = messageText.value;
  loading.value = true;

  messages.value.push({ from: "me", text: userText });
  messages.value.push({ from: "ai", text: "" });

  const aiIndex = messages.value.length - 1;

  stream.connect(
    userText,
    (token) => {
      messages.value[aiIndex].text += token;
    },
    () => {
      loading.value = false; // ✅ done
    },
    (err) => {
      loading.value = false;
      error.value = "Stream error";
      console.error(err);
    },
  );

  messageText.value = "";
};

watch(
  messages,
  () => {
    nextTick(() => {
      const el = document.querySelector(".chat-messages");
      el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  },
  { deep: true },
);
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-card
          color="#1a1a1a"
          class="chat-card d-flex flex-column"
          elevation="2"
          rounded="lg"
          border
        >
          <!-- Header -->
          <v-card-title
            class="chat-header pa-4 d-flex align-center justify-space-between"
          >
            <div class="d-flex align-center">
              <v-icon color="primary" size="28" class="mr-2"
                >mdi-robot-outline</v-icon
              >
              <div>
                <h3 class="text-h6 font-weight-bold text-white mb-0">
                  AI Agent
                </h3>
                <span class="text-grey caption">
                  <v-icon size="12" color="success" class="mr-1"
                    >mdi-circle</v-icon
                  >
                  Model: {{ model }}
                </span>
              </div>
            </div>
          </v-card-title>

          <v-divider color="grey-darken-4" />

          <!-- Messages -->
          <div class="chat-messages flex-grow-1 pa-4 overflow-y-auto">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="d-flex mb-3"
              :class="msg.from === 'me' ? 'justify-end' : 'justify-start'"
            >
              <v-card
                class="message pa-3 rounded-lg"
                :class="msg.from === 'me' ? 'message-out' : 'message-in'"
                elevation="0"
              >
                <div class="text-body-2 text-white">
                  {{ msg.text }}
                </div>
              </v-card>
            </div>

            <div v-if="loading" class="text-grey text-center pa-4">
              <v-progress-circular
                indeterminate
                size="24"
                color="primary"
                class="mr-2"
              />
              AI is thinking…
            </div>

            <div v-if="error" class="text-error text-center pa-4">
              {{ error }}
            </div>
          </div>

          <v-divider color="grey-darken-4" />

          <!-- Input -->
          <div class="chat-input pa-3 d-flex align-center">
            <v-text-field
              v-model="messageText"
              placeholder="Ask anything..."
              variant="outlined"
              density="comfortable"
              hide-details
              class="flex-grow-1"
              bg-color="grey-darken-4"
              color="primary"
              base-color="grey-darken-3"
              @keyup.enter="sendMessage"
            >
              <template v-slot:prepend-inner>
                <v-icon color="grey">mdi-message-text-outline</v-icon>
              </template>
            </v-text-field>
            <v-btn
              color="primary"
              variant="elevated"
              icon
              class="ms-3"
              :loading="loading"
              @click="sendMessage"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.chat-card {
  width: 80vw;
  max-width: 900px;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  flex-shrink: 0;
}

.chat-messages {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #444;
}

.message {
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.message-in {
  background: #242424 !important;
  border-top-left-radius: 0 !important;
  border: 1px solid #333;
}

.message-out {
  background: rgba(124, 58, 237, 0.15) !important;
  border-top-right-radius: 0 !important;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.chat-input {
  flex-shrink: 0;
}

.text-grey {
  color: #888888 !important;
}

.text-error {
  color: #ef4444 !important;
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

:deep(.v-field__prepend-inner) {
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
  min-width: 44px !important;
  border-radius: 8px !important;
}

:deep(.v-btn--variant-elevated:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4) !important;
}

:deep(.v-card) {
  border-color: #333 !important;
}

:deep(.v-divider) {
  border-color: #333 !important;
}
</style>
