import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

function ListItemCard({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="list-item-card"
      className={cn(
        "flex items-start justify-between gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors group",
        className
      )}
      {...props}
    />
  );
}

export { ListItemCard };
