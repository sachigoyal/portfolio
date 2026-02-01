"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { MDXContentRenderer } from "@/components/mdx/mdx-content-renderer";
import { cn } from "@/lib/utils";
import { useProjectCard, ProjectCardContext } from "./context";
import type { Projects } from "#site/content";

const springTransition = { type: "spring", bounce: 0, duration: 0.3 } as const;

interface ProviderProps {
  project: Projects;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export function Provider({ project, isActive, onOpen, onClose, children }: ProviderProps) {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <ProjectCardContext
      value={{
        state: { project, isActive },
        actions: { open: onOpen, close: onClose },
        meta: { formattedDate },
      }}
    >
      {children}
    </ProjectCardContext>
  );
}

export function Trigger({ children }: { children: React.ReactNode }) {
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

export function Overlay() {
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

export function Content({ children }: { children: React.ReactNode }) {
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
            "fixed z-50 left-1/2 -translate-x-1/2 top-0 mt-50",
            "w-full max-w-[calc(100%-2rem)] sm:max-w-2xl",
            "bg-background border shadow-lg rounded-lg overflow-hidden"
          )}
          transition={springTransition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Banner({ children }: { children?: React.ReactNode }) {
  const { state } = useProjectCard();
  const { bannerLight, bannerDark } = state.project;

  return (
    <div
      className="aspect-3/1 bg-muted w-full relative"
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
        className="object-cover w-full h-full dark:hidden"
      />
      <Image
        src={bannerDark}
        alt=""
        width={1500}
        height={500}
        className="object-cover w-full h-full hidden dark:block"
      />
      {children}
    </div>
  );
}

export function Header({ children }: { children: React.ReactNode }) {
  return <div className="px-4 lg:px-6 py-4">{children}</div>;
}

export function TriggerTitle() {
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

export function TriggerDescription() {
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

export function TriggerLinks() {
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

export function ModalTitle() {
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

export function ModalDescription() {
  const { state } = useProjectCard();
  const { slugAsParams, excerpt } = state.project;

  return (
    <motion.p
      layoutId={`project-description-${slugAsParams}`}
      className="text-sm text-muted-foreground mt-1 leading-relaxed"
      transition={springTransition}
    >
      {excerpt}
    </motion.p>
  );
}

export function ModalLinks() {
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

export function ModalCloseButton() {
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

export function ModalMeta() {
  const { state, meta } = useProjectCard();
  const { github, url } = state.project;

  return (
    <div className="px-6 py-3 flex items-center gap-3 text-sm text-muted-foreground border-t mt-4">
      <span>{meta.formattedDate}</span>
      <span className="text-muted-foreground/50">•</span>
      <div className="flex items-center gap-2">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Github className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
          <span>GitHub</span>
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ArrowUpRight className="size-3.5 text-muted-foreground hover:text-foreground transition-colors" />
          <span>Live</span>
        </a>
      </div>
    </div>
  );
}

export function ModalBody() {
  const { state } = useProjectCard();

  return (
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
  );
}

