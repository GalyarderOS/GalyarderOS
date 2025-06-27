import { useState, useRef } from "react";
// import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/global/ui/button";
import { Loader2 } from "lucide-react";
interface Message {
  role: 'user' | 'ai';
  content: string;
}
const getAIAssistantReply = async (message: string) => {
  // TODO: Implement actual Bolt API
  console.warn('AI Chatbot reply: Not implemented. Using placeholder.', message);
  return "This is a placeholder AI response. The real AI is currently offline.";
};
const InteractiveAIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "ai",
    content: "👋 Hello! I am Galyarder, your AI Assistant. Ready to help with anything on your OS—just type your question or request!"
  }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSend = async () => {
    if (!input.trim()) return;
    setSending(true);
    const userMessage: Message = {
      role: "user",
      content: input
    };
    setMessages(msgs => [...msgs, userMessage]);
    setInput("");

    // Scroll to bottom next tick after user message
    setTimeout(() => {
      inputRef.current?.blur();
      inputRef.current?.focus();
      const el = document.getElementById("ai-chatbot-scroll");
      if (el) el.scrollTop = el.scrollHeight;
    }, 100);
    try {
      const aiReply = await getAIAssistantReply(input);
      setMessages(msgs => [...msgs, {
        role: "ai",
        content: aiReply as string
      }]);
    } catch (err) {
      const error = err as Error;
      setMessages(msgs => [...msgs, {
        role: "ai",
        content: error?.message || "Sorry, something went wrong."
      }]);
    } finally {
      setSending(false);
      setTimeout(() => {
        const el = document.getElementById("ai-chatbot-scroll");
        if (el) el.scrollTop = el.scrollHeight;
      }, 100);
    }
  };
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sending) {
      handleSend();
    }
  };
  return <section className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-primary/60 bg-card/70 px-4 py-6 shadow-lg flex flex-col gap-4 animate-fade-in min-h-[380px]">
        <div className="flex items-center gap-2 mb-1">
          <img src="/logo.png" alt="Galyarder Logo" className="w-9 h-9 object-contain" />
          <span className="font-semibold text-base">Galyarder Architect Intellegent</span>
        </div>
        <div id="ai-chatbot-scroll" className="flex-1 min-h-[180px] max-h-56 overflow-y-auto pb-2 space-y-3" style={{
        scrollBehavior: "smooth"
      }}>
          {messages.map((msg, idx) => <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} `}>
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-muted text-slate-800 dark:text-slate-100"}`}>
                {msg.content}
              </div>
            </div>)}
          {sending && <div className="flex items-center mt-1 text-slate-500 gap-2 text-xs pl-1">
              <Loader2 className="h-4 w-4 animate-spin" /> Awaiting AI response...
            </div>}
        </div>
        <div className="flex gap-2 pt-2">
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onInputKeyDown} disabled={sending} placeholder="Type your question or ask for help..." className="flex-1 px-3 py-2 bg-muted/40 text-base rounded-xl border outline-none focus:ring-2 ring-primary/40 transition disabled:opacity-80" />
          <Button onClick={handleSend} disabled={sending || !input.trim()} className="px-4 rounded-xl font-medium" aria-label="Send" type="button">
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Galyarder can answer questions, provide tips, or control OS modules!
        </div>
      </div>
    </section>;
};
export default InteractiveAIChatbot;
