import { Button } from "@ui/components/button";

export const SearchButton = () => {
  return (
    <Button
      variant={"outline"}
      className="text-muted-foreground text-sm font-normal md:w-64 w-full justify-start whitespace-nowrap"
    >
      Search songs...
    </Button>
  );
};
