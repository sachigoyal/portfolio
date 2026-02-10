"use client";

import { useState, useEffect, useCallback } from "react";
import type { Projects } from "#site/content";
import { ProjectCard } from "./components";

export { useProjectCard } from "./context";
export { ProjectCard } from "./components";

export function FeaturedProjectCard(project: Projects) {
  const [isActive, setIsActive] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);

  const handleClose = useCallback(() => {
    setIsActive(false);
    setIsChatMode(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  return (
    <ProjectCard.Provider
      project={project}
      isActive={isActive}
      isChatMode={isChatMode}
      onOpen={() => setIsActive(true)}
      onClose={handleClose}
      onEnterChatMode={() => setIsChatMode(true)}
      onExitChatMode={() => setIsChatMode(false)}
    >
      <ProjectCard.Trigger>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <ProjectCard.TriggerTitle />
            <ProjectCard.TriggerDescription />
          </div>
          <ProjectCard.TriggerLinks />
        </div>
      </ProjectCard.Trigger>

      <ProjectCard.Overlay />

      <ProjectCard.Content>
        <ProjectCard.ChatProvider
          projectContext={{
            title: project.title,
            excerpt: project.excerpt,
            github: project.github,
          }}
        >
          <ProjectCard.Banner>
            <ProjectCard.CloseButton />
          </ProjectCard.Banner>
          <ProjectCard.Header>
            <div className="flex items-center justify-between gap-4">
              <ProjectCard.Title />
              <ProjectCard.Links />
            </div>
            <ProjectCard.Description />
            <ProjectCard.Body />
          </ProjectCard.Header>
          <ProjectCard.ChatMessages />
          <ProjectCard.ChatInputWrapper>
            <ProjectCard.ChatInput placeholder="Ask Gemini about this project" autoFocus />
          </ProjectCard.ChatInputWrapper>
        </ProjectCard.ChatProvider>
      </ProjectCard.Content>
    </ProjectCard.Provider>
  );
}
