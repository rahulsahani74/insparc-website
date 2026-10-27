"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Send,
  CheckCheck,
  Bot,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const scriptedConversation: { sender: "user" | "bot"; text: string; delay: number }[] = [
  {
    sender: "user",
    text: "Hi, I saw your automation services online. Can you automate customer replies on WhatsApp?",
    delay: 600,
  },
  {
    sender: "bot",
    text: "Hello! We help businesses organise customer questions, share agreed information and prepare appointment requests, with clear handoffs to your team.",
    delay: 1400,
  },
  {
    sender: "user",
    text: "Can you help us keep track of enquiries?",
    delay: 1200,
  },
  {
    sender: "bot",
    text: "We can organise enquiries, prepare follow-ups and help your team manage appointment requests. We agree the details and any approval steps with you before starting.",
    delay: 1600,
  },
  {
    sender: "user",
    text: "Can I test it with a sample flow for my clinic / business?",
    delay: 1200,
  },
  {
    sender: "bot",
    text: "Yes. Start with an initial conversation so we can understand your business and walk through a relevant example together.",
    delay: 1500,
  },
];

export function PhoneChat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [userCustomInput, setUserCustomInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Time formatter
  const getTimeString = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Run the conversation script
  useEffect(() => {
    if (stepIndex >= scriptedConversation.length) return;

    const currentItem = scriptedConversation[stepIndex];
    if (!currentItem) return;

    if (currentItem.sender === "bot") {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${stepIndex}-${Date.now()}`,
          sender: currentItem.sender,
          text: currentItem.text,
          time: getTimeString(),
        },
      ]);
      setStepIndex((prev) => prev + 1);
    }, currentItem.delay);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleReset = () => {
    setMessages([]);
    setStepIndex(0);
    setIsTyping(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCustomInput.trim()) return;

    const userText = userCustomInput.trim();
    setUserCustomInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: "user",
        text: userText,
        time: getTimeString(),
      },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-reply-${Date.now()}`,
          sender: "bot",
          text: "Thanks for testing our interactive simulator! To see this running live on your real WhatsApp, click the button below to message our active bot directly.",
          time: getTimeString(),
        },
      ]);
    }, 1200);
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/18] sm:h-[680px] rounded-[38px] p-3.5 bg-[#0D1322] border-4 border-[#2A3150] shadow-2xl flex flex-col mx-auto",
        className
      )}
    >
      {/* Phone Screen Container */}
      <div className="relative w-full h-full rounded-[28px] bg-[#070B14] overflow-hidden flex flex-col border border-[var(--border)]">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#151C36] rounded-full z-30" />

        {/* Chat App Header */}
        <div className="pt-7 pb-3 px-4 bg-[var(--surface-2)] border-b border-[var(--border)] flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
              <Bot className="w-5 h-5" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[var(--ok)] border-2 border-[var(--surface-2)]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-[var(--text)]">
                  Insparc Customer Support
                </span>
                <Sparkles className="w-3 h-3 text-[var(--gold)]" />
              </div>
              <p className="text-xs font-mono text-[var(--ok)]">Example customer conversation</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            title="Restart scripted conversation"
            className="p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--gold)] hover:bg-[var(--surface)] transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Message Scrollable Thread */}
        <div
          ref={scrollRef}
          className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[radial-gradient(#151C36_1px,transparent_1px)] [background-size:16px_16px]"
        >
          {messages.map((m) => {
            const isBot = m.sender === "bot";
            return (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs animate-fade-up leading-relaxed shadow-sm",
                  isBot
                    ? "self-start bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] rounded-tl-sm"
                    : "self-end bg-[var(--gold)] text-[#0B1020] font-medium rounded-tr-sm"
                )}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <div
                  className={cn(
                    "flex items-center justify-end gap-1 text-xs mt-1",
                    isBot ? "text-[var(--muted)] font-mono" : "text-[#0B1020]/70 font-mono"
                  )}
                >
                  <span>{m.time}</span>
                  {!isBot && <CheckCheck className="w-3 h-3" />}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="self-start flex items-center gap-1.5 bg-[var(--surface-2)] border border-[var(--border)] px-3 py-2 rounded-2xl rounded-tl-sm text-[var(--gold)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleCustomSend}
          className="p-2.5 bg-[var(--surface-2)] border-t border-[var(--border)] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type a message to test..."
            value={userCustomInput}
            onChange={(e) => setUserCustomInput(e.target.value)}
            className="flex-1 bg-[var(--surface)] text-[var(--text)] text-xs px-3 py-2 rounded-full border border-[var(--border)] focus:outline-none focus:border-[var(--gold)]"
          />
          <button
            type="submit"
            aria-label="Send test message"
            className="w-8 h-8 rounded-full bg-[var(--gold)] text-[#0B1020] flex items-center justify-center shrink-0 hover:bg-[var(--gold-soft)] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Real WhatsApp Direct CTA */}
        <div className="px-3 py-2 bg-[var(--surface)] border-t border-[var(--border)]/60 text-center">
          <a
            href={getWhatsAppUrl("Hi! I was testing the simulator on your website and want to see a live bot demo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs text-[#25D366] hover:underline font-semibold"
          >
            <span>Chat With Live WhatsApp Bot</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

