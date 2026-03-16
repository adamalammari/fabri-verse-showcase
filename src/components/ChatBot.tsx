import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botReplies: Record<string, string> = {
  "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته! كيف يمكنني مساعدتك؟",
  "مرحبا": "أهلاً وسهلاً بك! كيف أقدر أساعدك اليوم؟",
  "الاسعار": "أسعارنا تبدأ من 500 ريال للثوب الكلاسيكي وحتى 3000 ريال للتفصيل الفاخر. تقدر تتواصل معنا للتفاصيل.",
  "الفروع": "لدينا فروع في الرياض، جدة، الدمام، مكة المكرمة، والمدينة المنورة. زور قسم الفروع لمعرفة المواقع.",
  "التوصيل": "نوفر خدمة التوصيل لجميع مناطق المملكة خلال 3-5 أيام عمل.",
  "الاقمشة": "نستخدم أجود أنواع الأقمشة المستوردة من إيطاليا واليابان وإنجلترا.",
};

function getBotReply(msg: string): string {
  const lower = msg.trim();
  for (const key of Object.keys(botReplies)) {
    if (lower.includes(key)) return botReplies[key];
  }
  return "شكراً لتواصلك! فريقنا سيرد عليك قريباً. يمكنك أيضاً الاتصال بنا على 920000000";
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "أهلاً بك في الكسوة! كيف أقدر أساعدك؟", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), text, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: getBotReply(text), isBot: true },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="المحادثة"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: "hsl(var(--gold))",
          color: "hsl(var(--obsidian))",
          boxShadow: "0 6px 30px hsl(var(--gold) / 0.35)",
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-xl overflow-hidden shadow-2xl transition-all duration-400 origin-bottom-right ${
          open
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0 pointer-events-none"
        }`}
        style={{
          border: "1px solid hsl(var(--border))",
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3"
          dir="rtl"
          style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--obsidian))" }}
        >
          <div className="w-9 h-9 rounded-full bg-card/20 flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold">الكسوة</h4>
            <p className="text-xs opacity-80">نرد عليك خلال دقائق</p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="h-72 overflow-y-auto p-4 space-y-3 bg-card"
          dir="rtl"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm font-body rounded-xl ${
                  m.isBot
                    ? "bg-muted text-foreground rounded-tr-none"
                    : "text-card rounded-tl-none"
                }`}
                style={
                  !m.isBot
                    ? { backgroundColor: "hsl(var(--gold))", color: "hsl(var(--obsidian))" }
                    : undefined
                }
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-card border-t border-border flex items-center gap-2" dir="rtl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
          />
          <button
            onClick={send}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
            style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--obsidian))" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;