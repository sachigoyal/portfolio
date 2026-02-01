"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { ArrowUpRight, Github, X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { MDXContentRenderer } from "@/components/mdx/mdx-content-renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ProjectCardContext, ChatContext, useProjectCard, useChat } from "./context";
import { useChat as useChatHook, type ProjectContext } from "./use-chat";
import type { Projects } from "#site/content";
import type { ChatMessage } from "./use-chat";

const springTransition = { type: "spring", bounce: 0, duration: 0.3 } as const;

interface ProviderProps {
  project: Projects;
  isActive: boolean;
  isChatMode: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEnterChatMode: () => void;
  onExitChatMode: () => void;
  children: React.ReactNode;
}

function Provider({
  project,
  isActive,
  isChatMode,
  onOpen,
  onClose,
  onEnterChatMode,
  onExitChatMode,
  children,
}: ProviderProps) {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <ProjectCardContext
      value={{
        state: { project, isActive, isChatMode },
        actions: {
          open: onOpen,
          close: onClose,
          enterChatMode: onEnterChatMode,
          exitChatMode: onExitChatMode,
        },
        meta: { formattedDate },
      }}
    >
      {children}
    </ProjectCardContext>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { state, actions } = useProjectCard();
  const { slugAsParams } = state.project;

  return (
    <motion.div
      layoutId={`project-card-${slugAsParams}`}
      className={cn(
        "relative p-2 bg-background rounded-lg cursor-pointer",
        "hover:bg-muted/50 transition-colors group"
      )}
      whileTap={{ scale: 0.98 }}
      onClick={actions.open}
      transition={springTransition}
    >
      {children}
    </motion.div>
  );
}

function TriggerTitle() {
  const { state } = useProjectCard();
  const { slugAsParams, title } = state.project;

  return (
    <motion.span
      layoutId={`project-title-${slugAsParams}`}
      className="font-medium text-sm w-fit"
      transition={springTransition}
    >
      {title}
    </motion.span>
  );
}

function TriggerDescription() {
  const { state } = useProjectCard();
  const { slugAsParams, excerpt } = state.project;

  return (
    <motion.p
      layoutId={`project-description-${slugAsParams}`}
      className="text-xs text-muted-foreground line-clamp-2 leading-relaxed"
      transition={springTransition}
    >
      {excerpt}
    </motion.p>
  );
}

function TriggerLinks() {
  const { state } = useProjectCard();
  const { slugAsParams, github, url } = state.project;

  return (
    <motion.div
      layoutId={`project-links-${slugAsParams}`}
      className="flex items-center gap-1 shrink-0 sm:invisible sm:group-hover:visible"
      transition={springTransition}
    >
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 rounded hover:bg-background transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <Github className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 rounded hover:bg-background transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowUpRight className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
      </a>
    </motion.div>
  );
}

function Overlay() {
  const { state } = useProjectCard();

  return (
    <AnimatePresence>
      {state.isActive && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { state, actions } = useProjectCard();
  const { slugAsParams } = state.project;
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        actions.close();
      }
    },
    [actions]
  );

  useEffect(() => {
    if (!state.isActive) return;
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [state.isActive, handleClickOutside]);

  return (
    <AnimatePresence>
      {state.isActive && (
        <motion.div
          ref={ref}
          layoutId={`project-card-${slugAsParams}`}
          className={cn(
            "fixed z-50 left-1/2 -translate-x-1/2 top-0",
            "w-full max-w-[calc(100%-2rem)] sm:max-w-2xl",
            "bg-background border shadow-lg rounded-lg overflow-hidden",
            "flex flex-col max-h-[calc(100vh - 8rem)]",
            state.isChatMode ? "mt-25" : "mt-50",
            state.isChatMode ? "h-[750px]" : "h-auto",
          )}
          transition={springTransition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Banner({ children }: { children?: React.ReactNode }) {
  const { state } = useProjectCard();
  const { bannerLight, bannerDark } = state.project;

  return (
    <div
      className="aspect-3/1 bg-muted w-full relative shrink-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(#000 0%, rgba(0,0,0,.99) 18.5%, rgba(0,0,0,.953) 34.3%, rgba(0,0,0,.894) 47.6%, rgba(0,0,0,.824) 58.5%, rgba(0,0,0,.74) 67.5%, rgba(0,0,0,.647) 74.7%, rgba(0,0,0,.55) 80.3%, rgba(0,0,0,.45) 84.7%, rgba(0,0,0,.353) 88%, rgba(0,0,0,.26) 90.5%, rgba(0,0,0,.176) 92.5%, rgba(0,0,0,.106) 94.2%, rgba(0,0,0,.047) 95.9%, rgba(0,0,0,.01) 97.7%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(#000 0%, rgba(0,0,0,.99) 18.5%, rgba(0,0,0,.953) 34.3%, rgba(0,0,0,.894) 47.6%, rgba(0,0,0,.824) 58.5%, rgba(0,0,0,.74) 67.5%, rgba(0,0,0,.647) 74.7%, rgba(0,0,0,.55) 80.3%, rgba(0,0,0,.45) 84.7%, rgba(0,0,0,.353) 88%, rgba(0,0,0,.26) 90.5%, rgba(0,0,0,.176) 92.5%, rgba(0,0,0,.106) 94.2%, rgba(0,0,0,.047) 95.9%, rgba(0,0,0,.01) 97.7%, transparent 100%)",
      }}
    >
      <Image
        src={bannerLight}
        alt=""
        width={1500}
        height={500}
        className="object-cover object-top w-full h-full dark:hidden"
      />
      <Image
        src={bannerDark}
        alt=""
        width={1500}
        height={500}
        className="object-cover object-top w-full h-full hidden dark:block"
      />
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 lg:p-6 shrink-0">
      {children}
    </div>
  );
}

function Title() {
  const { state } = useProjectCard();
  const { slugAsParams, title } = state.project;

  return (
    <motion.span
      layoutId={`project-title-${slugAsParams}`}
      className="font-semibold text-lg w-fit"
      transition={springTransition}
    >
      {title}
    </motion.span>
  );
}

function Description() {
  const { state } = useProjectCard();
  const { slugAsParams, excerpt } = state.project;

  return (
    <motion.p
      layoutId={`project-description-${slugAsParams}`}
      className="text-sm text-muted-foreground mt-1 leading-relaxed origin-top"
      animate={{
        opacity: state.isChatMode ? 0 : 1,
        height: state.isChatMode ? 0 : "auto",
        marginTop: state.isChatMode ? 0 : 4,
      }}
      transition={springTransition}
    >
      {excerpt}
    </motion.p>
  );
}

function Links() {
  const { state } = useProjectCard();
  const { slugAsParams, github, url } = state.project;

  return (
    <motion.div
      layoutId={`project-links-${slugAsParams}`}
      className="flex items-center gap-2"
      transition={springTransition}
    >
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <Github className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        <span>GitHub</span>
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowUpRight className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
        <span>Live</span>
      </a>
    </motion.div>
  );
}

function CloseButton() {
  const { actions } = useProjectCard();

  return (
    <button
      className={cn(
        "absolute top-3 right-3 p-1 rounded-sm",
        "bg-background/80 backdrop-blur-sm border border-border/50",
        "hover:bg-background transition-colors"
      )}
      onClick={actions.close}
      aria-label="Close"
    >
      <X className="size-4" />
    </button>
  );
}

function Body() {
  const { state } = useProjectCard();

  return (
    <motion.div
      className="overflow-hidden origin-top"
      animate={{
        opacity: state.isChatMode ? 0 : 1,
        height: state.isChatMode ? 0 : "auto",
        marginTop: state.isChatMode ? 0 : 12,
        marginBottom: state.isChatMode ? 0 : 24,
      }}
      transition={springTransition}
    >
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <MDXContentRenderer
          code={state.project.body}
          components={{
            p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
              <p className={cn("leading-snug not-first:mt-2", className)} {...props} />
            ),
          }}
        />
      </div>
    </motion.div>
  );
}

interface ChatProviderProps {
  projectContext: ProjectContext;
  children: React.ReactNode;
}

function ChatProvider({ projectContext, children }: ChatProviderProps) {
  const { actions: cardActions, state: cardState } = useProjectCard();

  const chat = useChatHook({
    onFirstMessage: cardActions.enterChatMode,
    projectContext,
  });

  const resetRef = useRef(chat.reset);
  resetRef.current = chat.reset;

  useEffect(() => {
    if (!cardState.isActive) {
      resetRef.current();
    }
  }, [cardState.isActive]);

  return (
    <ChatContext
      value={{
        state: { messages: chat.messages, isLoading: chat.isLoading },
        actions: {
          sendMessage: chat.sendMessage,
          stopGeneration: chat.stopGeneration,
          reset: chat.reset,
        },
      }}
    >
      {children}
    </ChatContext>
  );
}

function GeminiLogo({ className }: { className?: string }) {
  const id = React.useId();

  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`gemini-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4">
            <animate
              attributeName="stop-color"
              values="#4285F4;#EA4335;#FBBC05;#34A853;#4285F4"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="#9B72CB">
            <animate
              attributeName="stop-color"
              values="#9B72CB;#D96570;#F9AB00;#0F9D58;#9B72CB"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#D96570">
            <animate
              attributeName="stop-color"
              values="#D96570;#FBBC05;#34A853;#4285F4;#D96570"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
        fill={`url(#gemini-grad-${id})`}
      />
    </svg>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className="flex justify-start"
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-muted/30">
        <GeminiLogo className="size-4" />
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 rounded-full bg-muted-foreground/60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springTransition}
        className="flex justify-end"
      >
        <div className="max-w-[85%] px-3.5 py-2 rounded-xl text-sm bg-muted/50">
          {message.content}
        </div>
      </motion.div>
    );
  }

  if (message.isStreaming && !message.content) {
    return <ThinkingIndicator />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springTransition}
      className="flex justify-start"
    >
      <div className="px-3.5 py-2.5 rounded-lg bg-muted/30 text-sm max-w-full">
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="leading-relaxed not-first:mt-2">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mt-2 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mt-2 space-y-1">{children}</ol>
            ),
            code: ({ children }) => (
              <code className="bg-background/50 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
            ),
            pre: ({ children }) => (
              <pre className="bg-background/50 p-3 rounded-md mt-2 overflow-x-auto text-xs">{children}</pre>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
        {message.isStreaming && message.content && (
          <motion.span
            className="inline-block w-1.5 h-4 ml-0.5 bg-foreground/70 rounded-sm align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </div>
    </motion.div>
  );
}

function ChatMessages() {
  const { state: cardState } = useProjectCard();
  const { state } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages]);

  return (
    <motion.div
      className="flex-1 min-h-0 overflow-hidden"
      layout
      transition={springTransition}
    >
      {cardState.isChatMode && (
        <ScrollArea ref={scrollRef} className="h-full p-4 lg:p-6">
          <div className="flex flex-col gap-3 py-2">
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
}

interface ChatInputProps {
  placeholder?: string;
  autoFocus?: boolean;
}

function ChatInput({ placeholder = "Ask Gemini", autoFocus }: ChatInputProps) {
  const { state, actions } = useChat();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const canSubmit = input.trim() && !state.isLoading;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() && !state.isLoading) {
        actions.sendMessage(input.trim());
        setInput("");
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    },
    [input, state.isLoading, actions]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          "relative flex items-center",
          "bg-muted/30 rounded-md",
          "ring-1 ring-border/50",
          "focus-within:ring-border focus-within:bg-muted/40",
          "transition-all duration-200"
        )}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <GeminiLogo className="size-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent",
            "pl-10 pr-12 py-2.5 text-sm",
            "placeholder:text-muted-foreground/50",
            "focus:outline-none"
          )}
        />
        <motion.button
          type="submit"
          disabled={!canSubmit}
          initial={false}
          animate={{
            opacity: canSubmit ? 1 : 0.3,
          }}
          whileHover={canSubmit ? { scale: 1.05 } : undefined}
          whileTap={canSubmit ? { scale: 0.95 } : undefined}
          transition={springTransition}
          className={cn(
            "absolute right-1.5 top-1/2 -translate-y-1/2",
            "size-8 flex items-center justify-center",
            "rounded-md",
            "bg-foreground text-background",
            "disabled:cursor-not-allowed",
            "shadow-sm"
          )}
        >
          <ArrowUp className="size-4" strokeWidth={2.5} />
        </motion.button>
      </div>
    </form>
  );
}

function ChatInputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 lg:p-6 shrink-0">
      {children}
    </div>
  );
}

export const ProjectCard = {
  Provider,
  Trigger,
  TriggerTitle,
  TriggerDescription,
  TriggerLinks,
  Overlay,
  Content,
  Banner,
  Header,
  Title,
  Description,
  Links,
  CloseButton,
  Body,
  ChatProvider,
  ChatMessages,
  ChatInput,
  ChatInputWrapper,
};
