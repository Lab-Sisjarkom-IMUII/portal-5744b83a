import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { sendChatMessage } from "../services/chatbotService";
import { getSessionId } from "../utils/session";
import { TypingIndicator } from "./TypingIndicator";
import { ChatbotProjectCard } from "./ChatbotProjectCard";
import { Button } from "./Button";
import { useChatbot } from "../contexts/ChatbotContext";

/**
 * Chatbot component
 * Floating chatbot dengan chat window untuk search project
 */
export function Chatbot() {
  const { isOpen: contextIsOpen, openChatbot, closeChatbot } = useChatbot();
  const [isOpen, setIsOpen] = useState(contextIsOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [sessionId] = useState(() => getSessionId());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const dragControls = useDragControls();

  // Detect mobile (Tailwind sm breakpoint: 640px)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    // Fallback for older browsers
    // eslint-disable-next-line deprecation/deprecation
    mediaQuery.addListener(update);
    // eslint-disable-next-line deprecation/deprecation
    return () => mediaQuery.removeListener(update);
  }, []);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: `welcome-${Date.now()}`,
        type: "bot",
        content: "Halo! Saya chatbot IMUII Portal. Saya bisa membantu Anda mencari project yang sesuai dengan kebutuhan Anda. Coba tanyakan seperti 'carikan project tentang kosan' atau 'project yang menggunakan React'.",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Streaming effect untuk bot message
  useEffect(() => {
    if (isStreaming && streamingMessage) {
      const timer = setTimeout(() => {
        // Character-by-character display sudah dihandle di handleSendMessage
        // Effect ini hanya untuk trigger re-render
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, streamingMessage]);

  /**
   * Stream message character by character
   */
  const streamMessage = useCallback((fullMessage, onComplete) => {
    setIsStreaming(true);
    setStreamingMessage("");
    
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setStreamingMessage(fullMessage.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
        onComplete();
      }
    }, 30); // 30ms per character untuk smooth effect
  }, []);

  /**
   * Handle send message
   */
  const handleSendMessage = async () => {
    const messageText = inputValue.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call chatbot API
      const response = await sendChatMessage(messageText, sessionId);

      if (response.success && response.message) {
        // Stream bot message
        await new Promise((resolve) => {
          streamMessage(response.message, () => {
            // After streaming complete, add bot message with projects
            // Projects akan langsung muncul setelah message karena sudah di-include di message object
            const botMessage = {
              id: `bot-${Date.now()}`,
              type: "bot",
              content: response.message,
              projects: response.projects || [],
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setStreamingMessage("");
            resolve();
          });
        });
      } else {
        // Error response from API
        const errorMessage = {
          id: `bot-error-${Date.now()}`,
          type: "bot",
          content: response.message || "Maaf, terjadi kesalahan. Silakan coba lagi.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // Handle error - show user-friendly error message
      let errorContent = "Maaf, terjadi kesalahan. Silakan coba lagi.";
      
      if (error.message) {
        // Use error message if available
        errorContent = error.message;
      } else if (error.response) {
        // API error response
        errorContent = error.response.data?.message || "Terjadi kesalahan pada server.";
      } else if (error.request) {
        // Network error
        errorContent = "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
      }

      const errorMessage = {
        id: `bot-error-${Date.now()}`,
        type: "bot",
        content: errorContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Sync with context
  useEffect(() => {
    setIsOpen(contextIsOpen);
  }, [contextIsOpen]);

  /**
   * Toggle chat window
   */
  const toggleChat = () => {
    if (isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
    setIsMinimized(false);
  };

  /**
   * Minimize chat window
   */
  const minimizeChat = () => {
    setIsMinimized(true);
  };

  /**
   * Restore chat window
   */
  const restoreChat = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={false}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        onClick={toggleChat}
        className={`
          fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]
          w-14 h-14 rounded-full
          bg-[var(--accent)] text-white
          shadow-lg shadow-[var(--accent)]/30
          hover:shadow-xl hover:shadow-[var(--accent)]/40
          active:scale-95
          flex items-center justify-center
          transition-all duration-200
          hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          touch-manipulation
          ${isOpen ? "pointer-events-none" : ""}
        `}
        aria-label="Open chatbot"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile bottom sheet) */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[55] bg-black/50"
                onClick={() => {
                  closeChatbot();
                  setIsMinimized(false);
                }}
                aria-hidden="true"
              />
            )}
            {/* Minimized Bar */}
            {isMinimized ? (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-[60] w-[calc(100%-2rem)] sm:w-80 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-xl p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[var(--accent)]" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      Chatbot
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={restoreChat}
                      className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                      aria-label="Restore chat"
                    >
                      <MessageCircle className="w-4 h-4 text-[var(--foreground)]" />
                    </button>
                    <button
                      onClick={toggleChat}
                      className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4 text-[var(--foreground)]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Full Chat Window */
              <motion.div
                ref={chatWindowRef}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                drag={isMobile ? "y" : false}
                dragListener={false}
                dragControls={dragControls}
                dragConstraints={isMobile ? { top: 0, bottom: 320 } : undefined}
                dragElastic={isMobile ? { top: 0, bottom: 0.2 } : undefined}
                onDragEnd={(_, info) => {
                  if (!isMobile) return;
                  const shouldClose = info.offset.y > 140 || info.velocity.y > 900;
                  if (shouldClose) {
                    closeChatbot();
                    setIsMinimized(false);
                  }
                }}
                className={`
                  fixed z-[60]
                  ${
                    isMobile
                      ? "inset-x-0 bottom-0 w-full h-[85vh] max-h-[90vh] rounded-t-2xl rounded-b-none"
                      : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100%-2rem)] sm:w-[400px] sm:max-w-md h-[calc(100vh-2rem)] sm:h-[600px] sm:max-h-[85vh] rounded-lg"
                  }
                  bg-[var(--card)] border border-[var(--border)] shadow-xl
                  flex flex-col
                `}
              >
                {/* Header */}
                <div className={`relative flex items-center justify-between p-4 border-b border-[var(--border)] ${isMobile ? "pt-7" : ""}`}>
                  {/* Drag handle (mobile) */}
                  {isMobile && (
                    <div className="absolute left-0 right-0 top-2 flex justify-center">
                      <div
                        className="w-12 h-1.5 rounded-full bg-[var(--foreground)]/20 cursor-grab active:cursor-grabbing"
                        onPointerDown={(e) => dragControls.start(e)}
                        role="button"
                        tabIndex={0}
                        aria-label="Drag handle"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      Chatbot
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {!isMobile && (
                      <button
                        onClick={minimizeChat}
                        className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                        aria-label="Minimize chat"
                      >
                        <Minimize2 className="w-4 h-4 text-[var(--foreground)]" />
                      </button>
                    )}
                    <button
                      onClick={toggleChat}
                      className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-4 h-4 text-[var(--foreground)]" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-3">
                      {/* Message Bubble */}
                      <div
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] ${
                            message.type === "user"
                              ? "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-2xl rounded-tr-sm"
                              : "bg-[var(--muted)] text-[var(--foreground)] rounded-2xl rounded-tl-sm"
                          } px-4 py-3`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                      </div>

                      {/* Project Cards - langsung setelah bot message */}
                      {message.type === "bot" && message.projects && message.projects.length > 0 && (
                        <div className="space-y-3">
                          {message.projects.map((project, index) => (
                            <ChatbotProjectCard
                              key={project.id || `${message.id}-project-${index}`}
                              project={project}
                              index={index}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Streaming Message */}
                  {isStreaming && streamingMessage && (
                    <div className="space-y-3">
                      <div className="flex justify-start">
                        <div className="max-w-[80%] bg-[var(--muted)] text-[var(--foreground)] rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {streamingMessage}
                            <span className="inline-block w-2 h-4 bg-[var(--foreground)]/60 ml-1 animate-pulse" />
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Typing Indicator */}
                  {isLoading && !isStreaming && (
                    <div className="flex justify-start">
                      <TypingIndicator />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-[var(--border)]">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tanyakan tentang project..."
                      disabled={isLoading}
                      className="
                        flex-1 px-4 py-2 text-sm sm:text-base
                        bg-[var(--card)] border border-[var(--border)] rounded-lg
                        text-[var(--foreground)] placeholder:text-[var(--foreground)]/50
                        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        min-h-[44px] sm:min-h-0
                      "
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      variant="accent"
                      size="md"
                      className="px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
