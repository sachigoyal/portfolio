"use client";

import { useState, useEffect, useCallback } from "react";
import type { Projects } from "#site/content";
import { ProjectCard } from "./components";

export { useProjectCard } from "./context";
export { ProjectCard } from "./components";

export function FeaturedProjectCard(project: Projects) {
  const [isActive, setIsActive] = useState(false);

  const handleClose = useCallback(() => setIsActive(false), []);

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
      onOpen={() => setIsActive(true)}
      onClose={handleClose}
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
      </ProjectCard.Content>
    </ProjectCard.Provider>
  );
}
