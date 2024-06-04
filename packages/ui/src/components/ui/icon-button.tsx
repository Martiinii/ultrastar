import * as React from "react";

import { cn } from "@ui/lib/utils";
import { LoaderIcon, type LucideIcon } from "lucide-react";
import { Button, type ButtonProps } from "./button";

export interface IconButtonProps extends ButtonProps {
  icon?: LucideIcon | null;
  iconRight?: LucideIcon | null;
  isLoading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      iconRight: IconRight,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const containsChildren = !!children;

    if (isLoading) Icon = LoaderIcon;

    return (
      <Button {...props} ref={ref} disabled={isLoading || disabled}>
        {Icon && (
          <Icon
            className={cn(
              "size-4",
              containsChildren && "mr-2",
              isLoading && "animate-spin"
            )}
          />
        )}
        {children}
        {IconRight && (
          <IconRight className={cn("size-4", containsChildren && "ml-2")} />
        )}
      </Button>
    );
  }
);
IconButton.displayName = "Icon button";

export { IconButton };
