import { Button, type ButtonProps } from "@ui/components/button";
import React from "react";

export const SearchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        variant={"outline"}
        className="text-muted-foreground text-sm font-normal md:w-64 w-full justify-start whitespace-nowrap"
        {...props}
        ref={ref}
      >
        Search songs...
      </Button>
    );
  }
);

SearchButton.displayName = "Search Button";
