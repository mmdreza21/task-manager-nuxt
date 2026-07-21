import type { CreateAgentDto, AgentResponse } from "~/types/AgentTypes";

export const useAgentService = () => {
  class AgentService {
    async sendMessage(
      payload: CreateAgentDto
    ): Promise<{ data: AgentResponse | null; error: any }> {
      const res = {
        data: null as AgentResponse | null,
        error: null,
      };

      try {
        const data = await useNuxtApp().$apiClient<AgentResponse>("/agent", {
          method: "POST",
          body: payload,
        });

        res.data = data;
      } catch (error: any) {
        res.error = error;
      }

      return res;
    }
  }

  return new AgentService();
};
