"use client";

import { useQueryState } from "nuqs";
import { useState, useTransition } from "react";
import {
  SearchSongsForm,
  type SearchSongsFormSchema,
} from "../forms/searchSongsForm";
import { SearchButton } from "../navbar/searchButton";
import { ResponsiveDialog } from "../responsiveDialog";
import { searchParams } from "../searchParams";

export const SearchSongModal = () => {
  const [, startTransition] = useTransition();
  const [, setPage] = useQueryState(
    "page",
    searchParams.page.withOptions({ startTransition, shallow: false })
  );
  const [search, setSearch] = useQueryState(
    "search",
    searchParams.search.withOptions({ startTransition, shallow: false })
  );
  const [languages, setLanguages] = useQueryState(
    "languages",
    searchParams.languages.withOptions({ startTransition, shallow: false })
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = ({
    search: newSearch,
    languages: newLanguages,
  }: SearchSongsFormSchema) => {
    setIsOpen(false);

    setSearch(newSearch);
    setLanguages(newLanguages);
    setPage(1);
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
      <SearchSongsForm
        onSubmit={handleSearch}
        search={search}
        languages={languages}
      />
    </ResponsiveDialog>
  );
};
