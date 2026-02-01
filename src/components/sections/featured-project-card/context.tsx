"use client";

import { createContext, use } from "react";
import type { Projects } from "#site/content";

interface ProjectCardState {
  project: Projects;
  isActive: boolean;
}

interface ProjectCardActions {
  open: () => void;
  close: () => void;
}

interface ProjectCardMeta {
  formattedDate: string;
}

interface ProjectCardContextValue {
  state: ProjectCardState;
  actions: ProjectCardActions;
  meta: ProjectCardMeta;
}

export const ProjectCardContext =
  createContext<ProjectCardContextValue | null>(null);

export function useProjectCard() {
  const context = use(ProjectCardContext);
  if (!context) {
    throw new Error(
      "ProjectCard components must be used within ProjectCard.Provider"
    );
  }
  return context;
}

export type { ProjectCardContextValue, ProjectCardState, ProjectCardActions, ProjectCardMeta };
