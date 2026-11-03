"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import { preload } from "react-dom";
import { cn } from "@/lib/utils";

interface LinkPreviewProps {
  href: string;
  /** Screenshot of the linked page (16:10), shown on hover. */
  image: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkPreview({
  href,
  image,
  children,
  className,
}: LinkPreviewProps) {
  // Fetch the screenshot with the page so the card is instant on first hover.
  preload(image, { as: "image" });

  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        delay={50}
        closeDelay={150}
        className={cn(
          "text-foreground border-b border-dashed border-foreground/50 hover:border-foreground transition-colors",
          className,
        )}
      >
        {children}
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner side="bottom" align="start" sideOffset={8} className="z-50">
          <PreviewCard.Popup
            className={cn(
              "origin-(--transform-origin) transition-[opacity,scale] duration-150 ease-out",
              "data-starting-style:opacity-0 data-starting-style:scale-95",
              "data-ending-style:opacity-0 data-ending-style:scale-95",
            )}
          >
            <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
              <img
                src={image}
                alt=""
                width={320}
                height={200}
                className="block w-80 aspect-16/10 rounded-lg border bg-muted object-cover object-top shadow-lg"
              />
            </a>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
