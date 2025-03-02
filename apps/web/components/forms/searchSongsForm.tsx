import { clientApi } from "@/lib/api";
import { Combobox, type ComboboxData } from "@ui/components/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { IconButton } from "@ui/components/icon-button";
import { Input } from "@ui/components/input";
import { cn } from "@ui/lib/utils";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const getAvailableLanguages = async (): Promise<ComboboxData[]> => {
  const { data } = await clientApi.languages.index.get();
  return (
    data?.map((d) => ({
      value: d.id,
      label: d.language || "Empty",
      render: (
        <span className={cn("capitalize", !d.language && "italic")}>
          {d.language || "Empty"}
        </span>
      ),
    })) ?? []
  );
};

export type SearchSongsFormSchema = { languages: string[]; search: string };

type SearchSongsFormProps = {
  onSubmit: (data: SearchSongsFormSchema) => void;
  search: string;
  languages: string[];
};
export const SearchSongsForm = ({
  onSubmit,
  search,
  languages,
}: SearchSongsFormProps) => {
  const form = useForm<SearchSongsFormSchema>({
    defaultValues: { languages, search },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type a song title or artist..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languages"
          render={({ field: { ref, ...field } }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Combobox
                  isMulti
                  data={getAvailableLanguages}
                  empty="No language found."
                  placeholder="Choose languages"
                  search="Search languages..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <IconButton
          type="submit"
          className="flex mx-auto"
          iconRight={{ icon: SearchIcon }}
        >
          Search songs
        </IconButton>
      </form>
    </Form>
  );
};
