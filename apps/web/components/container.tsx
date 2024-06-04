import { cn } from "@ui/lib/utils";
import React from "react";

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn("m-5 container mx-auto", className)}>
      {children}
    </div>
  );
});

Container.displayName = "Container";
