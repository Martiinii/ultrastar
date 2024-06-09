"use client";

import { useMergeSearchParams } from "@/hooks/use-merge-search-params";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  SearchSongsForm,
  type SearchSongsFormSchema,
} from "../forms/searchSongsForm";
import { SearchButton } from "../navbar/searchButton";
import { ResponsiveDialog } from "../responsiveDialog";

export const SearchSongModal = () => {
  const { createQueryParams } = useMergeSearchParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = ({ search, languages }: SearchSongsFormSchema) => {
    setIsOpen(false);

    const queryParams = createQueryParams(
      ["search", search],
      ["language", languages]
    );
    queryParams.delete("page");
    router.push("/?" + queryParams.toString());
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={<SearchButton />}
      header={{
        title: "Search for songs",
        description: "Search and filter based on the criteria provided",
      }}
    >
      <SearchSongsForm onSubmit={handleSearch} />
    </ResponsiveDialog>
  );
};
