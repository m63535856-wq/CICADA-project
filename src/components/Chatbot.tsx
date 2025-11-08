import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  text: string;
  model?: string;
  timestamp?: Date;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Welcome message on first open
  useEffect(() => {
    if (open && chat.length === 0) {
      setChat([
        {
          role: "assistant",
          text: "👋 Hello! I'm MAI, your AI assistant for Mastersolis Infotech. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [open]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      text: message.trim(),
      timestamp: new Date(),
    };

    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server error: ${res.status}`
        );
      }

      const data = await res.json();

      const assistantMsg: Message = {
        role: "assistant",
        text: data.reply || "I'm sorry, I couldn't generate a response.",
        model: data.model_used,
        timestamp: new Date(),
      };

      setChat((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Cannot connect to backend";

      setError(errorMessage);

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `❌ Error: ${errorMessage}\n\nPlease make sure the backend is running.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setChat([
      {
        role: "assistant",
        text: "Chat cleared! How can I help you?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }

  return (
    <>
      {/* ✅ Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-primary to-accent text-white 
                   p-4 rounded-full shadow-lg hover:scale-110 transition-all z-[9999]
                   hover:shadow-2xl active:scale-95"
        aria-label="Open Mastersolis AI Chat"
      >
        <span className="font-bold text-lg">MAI</span>
      </button>

      {/* ✅ Chat Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 shadow-2xl 
                     rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col z-[9999]
                     animate-in slide-in-from-bottom-4 duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-accent text-white rounded-t-xl 
                          flex justify-between items-center shadow-md">
            <div>
              <h3 className="font-bold text-lg">Mastersolis AI</h3>
              <p className="text-xs opacity-90">Powered by GitHub Models</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors text-xl"
                aria-label="Close chat"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 
                            p-2 text-xs border-b border-red-200 dark:border-red-800">
              ⚠️ {error}
            </div>
          )}

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                  {msg.model && (
                    <div className="text-xs opacity-70 mt-1 italic">
                      via {msg.model}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm max-w-[85%] rounded-bl-none">
                  <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                    <span className="text-sm">MAI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 
                           text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800
                           focus:ring-2 focus:ring-primary focus:border-transparent outline-none
                           placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Ask MAI anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2.5 
                           rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed
                           hover:shadow-lg transition-all active:scale-95"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Press Enter to send • Powered by GitHub AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}