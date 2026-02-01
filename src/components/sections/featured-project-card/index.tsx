"use client";

import { useState, useEffect } from "react";
import type { Projects } from "#site/content";
import {
  Provider,
  Trigger,
  TriggerTitle,
  TriggerDescription,
  TriggerLinks,
  Overlay,
  Content,
  Banner,
  ModalCloseButton,
  Header,
  ModalTitle,
  ModalDescription,
  ModalLinks,
  ModalBody,
} from "./components";

export { useProjectCard } from "./context";

export function FeaturedProjectCard(project: Projects) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsActive(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  return (
    <Provider
      project={project}
      isActive={isActive}
      onOpen={() => setIsActive(true)}
      onClose={() => setIsActive(false)}
    >
      <Trigger>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <TriggerTitle />
            <TriggerDescription />
          </div>
          <TriggerLinks />
        </div>
      </Trigger>

      <Overlay />

      <Content>
        <Banner>
          <ModalCloseButton />
        </Banner>
        <Header>
          <div className="flex items-center justify-between gap-4">
            <ModalTitle />
            <ModalLinks />
          </div>
          <ModalDescription />
          <div className="mt-3">
            <ModalBody />
          </div>
        </Header>
      </Content>
    </Provider>
  );
}
