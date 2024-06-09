import * as React from "react";

import { cn } from "@ui/lib/utils";
import { LoaderIcon, type LucideIcon } from "lucide-react";
import { Button, type ButtonProps } from "./button";

export interface IconButtonProps extends ButtonProps {
  icon?: {
    icon?: LucideIcon | null;
    className?: string;
  };
  iconRight?: {
    icon?: LucideIcon | null;
    className?: string;
  };
  isLoading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconRight, isLoading, disabled, children, ...props }, ref) => {
    const containsChildren = !!children;

    if (isLoading) {
      icon ??= {};
      icon.icon = LoaderIcon;
    }

    return (
      <Button {...props} ref={ref} disabled={isLoading || disabled}>
        {icon?.icon && (
          <icon.icon
            className={cn(
              "size-4",
              containsChildren && "mr-2",
              isLoading && "animate-spin",
              icon.className
            )}
          />
        )}
        {children}
        {iconRight?.icon && (
          <iconRight.icon
            className={cn(
              "size-4",
              containsChildren && "ml-2",
              iconRight.className
            )}
          />
        )}
      </Button>
    );
  }
);
IconButton.displayName = "Icon button";

export { IconButton };
