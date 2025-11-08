import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "No response from AI" },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setChat((prev) => [
        ...prev,
        { 
          role: "assistant", 
          text: `Error: ${err instanceof Error ? err.message : "Cannot connect to backend"}` 
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ✅ Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-primary to-accent text-white 
                   p-4 rounded-full shadow-lg hover:scale-110 transition-all z-[9999]"
      >
        <span className="font-bold text-lg">MAI</span>
      </button>

      {/* ✅ Chat Panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-black shadow-xl rounded-xl border 
                     flex flex-col z-[9999]"
        >
          {/* Header */}
          <div className="p-3 font-bold text-lg border-b flex justify-between items-center">
            Mastersolis AI
            <button onClick={() => setOpen(false)} className="text-xl hover:text-red-500">
              ✖
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {chat.length === 0 && (
              <div className="text-gray-500 text-center mt-10">
                Ask me anything about Mastersolis!
              </div>
            )}
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg max-w-[80%]">
                Thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded p-2 text-black dark:text-white dark:bg-gray-800"
              placeholder="Ask MAI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-primary text-white px-3 py-2 rounded disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}