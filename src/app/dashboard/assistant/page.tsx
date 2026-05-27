"use client";

import React, { useState } from "react";
import { 
  Sparkles, Send, Bot, User, Trash2, ArrowRight,
  Code, HardDrive, ShieldCheck, Activity, Terminal
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I am your AutoBRD Generative Co-pilot. I can assist you in writing user stories, configuring technical architectures, predicting delivery timelines, or suggesting API protocols. Select an action below or describe your requirements!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const prompts = [
    { title: "Configure tech stack", detail: "Recommend frontend, API backend, database, and scaling protocols.", action: "Suggest a modern tech stack for a hyper-local delivery service." },
    { title: "Generate User Stories", detail: "Draft visual checkout and cart story structures.", action: "Draft detailed high-priority User Stories for an e-commerce checkout flow." },
    { title: "Predict Integration Risks", detail: "List standard API payment bottlenecks.", action: "What are the core technical risks in integrating multi-gateway payment APIs?" },
    { title: "Design database schemas", detail: "Compile SQL tables for customer checkouts.", action: "Draft a clean PostgreSQL prisma schema mapping out products, carts, and order checkouts." }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate smart, tailored AI response
    setTimeout(() => {
      let botResponse = "";

      if (text.toLowerCase().includes("tech stack")) {
        botResponse = `### Technical Architecture Recommendations
Here is a recommended high-performance tech stack for a localized delivery service:

1. **Frontend UI Storefront:** Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion. Enables static optimization while delivering buttery-smooth client states.
2. **Database Engine:** PostgreSQL hosted on Supabase. Provides highly flexible schemas, real-time trigger webhooks, and solid connection poolers.
3. **Caching Layer:** Redis (Upstash). Stores active rider locations and high-velocity food menus to bypass heavy Postgres querying.
4. **Hosting Systems:** Vercel for frontend static assets, AWS ECS for heavy node websocket background workers.`;
      } else if (text.toLowerCase().includes("stories")) {
        botResponse = `### E-Commerce Checkout User Stories
Here are high-priority user stories structured for developer implementation:

* **US-101: Dynamic Payment QR Scan**
  * *As a* Mobile Shopper,
  * *I want to* automatically view a Razopy UPI QR code on the payment page,
  * *So that* I can scan and complete payments within 5 seconds without credit card entry.
  * **Acceptance Criteria:** Must monitor Razorpay webhook status updates in under 2 seconds.

* **US-102: Persistent Local Store Cart**
  * *As a* Frequent customer,
  * *I want* my cart items to remain saved in my browser locally during network drops,
  * *So that* I do not have to search and re-add rare organic products.`;
      } else if (text.toLowerCase().includes("risks")) {
        botResponse = `### API Payment Integration Risks
AI predictions identify 3 primary technical bottlenecks:

1. **Gateway Network Dropouts (Impact: High):** Payment callbacks (webhooks) could fail due to server latency or network losses.
   * *Mitigation:* Establish client long-polling status checking routes alongside webhook redundant worker listeners.
2. **Double Checkout Charges (Impact: Critical):** Impatient customers double-clicking buttons could spawn concurrent billing queries.
   * *Mitigation:* Integrate unique transaction UUID idempotency headers on API checkouts.`;
      } else {
        botResponse = `### DB Prisma Schema Mapping
Here is a PostgreSQL Prisma model mapping out organic orders:

\`\`\`prisma
model Order {
  id         String    @id @default(uuid())
  createdAt  DateTime  @default(now())
  amount     Float
  status     String    // "pending" | "paid" | "failed"
  customerId String
  items      OrderItem[]
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  productId String
  quantity  Int
  price     Float
  order     Order    @relation(fields: [orderId], references: [id])
}
\`\`\``;
      }

      const botMsg: Message = { role: "assistant", content: botResponse };
      setMessages(prev => [...prev, botMsg]);
      setLoading(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hello! I am your AutoBRD Generative Co-pilot. I can assist you in writing user stories, configuring technical architectures, predicting delivery timelines, or suggesting API protocols. Select an action below or describe your requirements!" 
      }
    ]);
  };

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full h-[calc(100vh-64px-16px)] flex flex-col justify-between gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white shadow-lg shadow-primary/20">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-white">Generative Copilot Chat</h1>
            <p className="text-zinc-500 text-xs">Conversational assistant for technical scoping, API layouts, and story generation.</p>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          title="Clear Conversation History"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Main chat stream / recommendations */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-2">
        {messages.length === 1 && (
          /* Recommended Prompts cards grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {prompts.map((p, idx) => (
              <div 
                key={idx}
                onClick={() => handleSendMessage(p.action)}
                className="glass-card rounded-2xl p-5 border border-white/[0.04] text-left cursor-pointer hover:border-primary/20 group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors">{p.title}</h4>
                  <p className="text-zinc-500 text-[11px] mt-2 leading-relaxed">{p.detail}</p>
                </div>
                <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform mt-4">
                  Run Suggestion
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col gap-4">
          {messages.map((msg, idx) => {
            const isBot = msg.role === "assistant";
            return (
              <div key={idx} className={`flex gap-3.5 ${isBot ? "justify-start" : "justify-end"}`}>
                {isBot && (
                  <div className="bg-primary/10 border border-primary/20 text-primary p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl text-xs text-left leading-relaxed max-w-[85%] border whitespace-pre-wrap ${
                  isBot 
                    ? "bg-zinc-950/60 border-white/5 text-zinc-200" 
                    : "bg-primary/10 border-primary/20 text-white"
                }`}>
                  <span className={`text-[9px] font-bold uppercase tracking-wider block mb-1.5 ${
                    isBot ? "text-primary" : "text-indigo-300"
                  }`}>
                    {isBot ? "Generative Copilot" : "You"}
                  </span>
                  {msg.content}
                </div>

                {!isBot && (
                  <div className="bg-zinc-800 p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <User className="h-4.5 w-4.5 text-zinc-300" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3.5 justify-start">
              <div className="bg-primary/10 border border-primary/20 text-primary p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0">
                <Bot className="h-4.5 w-4.5 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950/60 border-white/5 text-xs text-zinc-500 max-w-[85%] text-left animate-pulse">
                Copilot is compiling code responses, estimating timeline metrics...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input container */}
      <div className="flex gap-2.5">
        <input 
          type="text" 
          placeholder="Ask about dynamic integrations, database tables, user story details..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(input);
          }}
          disabled={loading}
          className="flex-1 px-4 py-3.5 text-xs rounded-xl glass-input"
        />
        <button 
          onClick={() => handleSendMessage(input)}
          disabled={loading}
          className="px-5 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}
