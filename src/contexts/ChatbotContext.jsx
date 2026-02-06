import { createContext, useContext, useState } from "react";

const ChatbotContext = createContext(null);

/**
 * ChatbotProvider component
 * Provides chatbot state and controls to children
 */
export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);
  const toggleChatbot = () => setIsOpen((prev) => !prev);

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

/**
 * useChatbot hook
 * Access chatbot context
 */
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return context;
}
