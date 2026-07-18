<script setup lang="ts">
import { ref, computed } from "vue";
import { useChatService, type ChatMessage } from "~/composables/useChatService";
import { useCookie } from "#app";

const messageText = ref("");
const token = useCookie("Authorization");
const chat = useChatService(token.value || "");

const { messages, sendMessage, userCount, connect } = chat;

const isLoggedIn = useAuthUser().loggedIn;

const { data: chatHistory } = await useAsyncData<ChatMessage[]>(
  "chat-messages",
  () => useNuxtApp().$customFetch("/chat/messages"),
);

if (chatHistory.value) {
  messages.value = chatHistory.value;
}

// ✅ Wrapper to prevent sending events instead of strings
const sendMessageWrapper = () => {
  if (!messageText.value.trim() || !isLoggedIn) return;
  sendMessage(messageText.value);
  messageText.value = "";
};

onMounted(() => {
  if (isLoggedIn) {
    connect();
  }
});
</script>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-alert
        v-if="!isLoggedIn"
        type="warning"
        variant="tonal"
        density="compact"
        class="ma-3"
        border="start"
        border-color="warning"
      >
        <div class="d-flex align-center">
          <span class="text-body-2">Please login to use the chat</span>
        </div>
      </v-alert>
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
              <v-icon color="primary" size="28" class="mr-2">mdi-chat</v-icon>
              <div>
                <h3 class="text-h6 font-weight-bold text-white mb-0">Chat</h3>
                <span class="text-grey caption">
                  <v-icon size="14" color="success" class="mr-1"
                    >mdi-circle</v-icon
                  >
                  {{ userCount }} Online users
                </span>
              </div>
            </div>
          </v-card-title>

          <v-divider color="#333" />

          <!-- Messages -->
          <div class="chat-messages flex-grow-1 pa-4 overflow-y-auto">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="d-flex mb-3"
              :class="msg.from.name === 'me' ? 'justify-end' : 'justify-start'"
            >
              <v-card
                min-width="100"
                class="message pa-3 rounded-lg"
                :class="msg.from.name === 'me' ? 'message-out' : 'message-in'"
                elevation="0"
              >
                <small class="text-caption d-block mt-1 text-grey">
                  {{ msg.from.name === "me" ? "You" : msg.from.name }}
                </small>
                <div class="text-body-2 text-white">
                  {{ msg.message }}
                </div>
              </v-card>
            </div>
          </div>

          <v-divider color="#333" />

          <!-- Message input -->
          <div class="chat-input pa-3 d-flex align-center">
            <v-text-field
              v-model="messageText"
              placeholder="Type a message..."
              variant="outlined"
              density="comfortable"
              hide-details
              class="flex-grow-1"
              bg-color="#242424"
              color="primary"
              base-color="#555"
              :disabled="!isLoggedIn"
              @keyup.enter="sendMessageWrapper"
            >
              <template v-slot:prepend-inner>
                <v-icon color="grey">mdi-emoticon-outline</v-icon>
              </template>
            </v-text-field>
            <v-btn
              color="primary"
              variant="elevated"
              icon
              class="ms-3"
              :disabled="!isLoggedIn"
              @click="sendMessageWrapper"
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
  width: 480px;
  max-width: 95%;
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
</style>
