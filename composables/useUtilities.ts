export const useUtilities = () => {
  interface menuItems {
    activate?: boolean;
    title: string;
    icon?: string;
    to?: string;
    child?: Array<{
      title?: string;
      icon?: string;
      text?: string;
      to?: string;
      color?: string;
    }>;
  }

  const menuItems: Ref<menuItems[]> = ref([
    { title: "Home", to: "/" },
    { title: "Tasks", to: "/tasks" },
    { title: "Chat", to: "/chat" },
    { title: "AI Chat", to: "/ai" },
    { title: "My Unity Games", to: "/games" },
  ]);

  return {
    menuItems,
  };
};
