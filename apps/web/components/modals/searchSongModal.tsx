import { Button } from "@ui/components/button";
import { SearchButton } from "../navbar/searchButton";
import { ResponsiveDialog } from "../responsiveDialog";

export const SearchSongModal = () => {
  return (
    <ResponsiveDialog
      trigger={<SearchButton />}
      header={{
        title: "Responsive dialog test",
        description:
          "This is a very long description to desribe the functionality of this very component",
      }}
    >
      <Button>Hey!</Button>
    </ResponsiveDialog>
  );
};
