"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollArea({ className, children, ref, ...props }: ScrollAreaProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-y-auto",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
