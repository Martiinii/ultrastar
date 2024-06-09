"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { commandScore } from "@ui/lib/command-score";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown, type LucideIcon } from "lucide-react";
import * as React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { IconButton } from "./icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type SelectActionsPush = {
  type: "single" | "multi";
  payload: string;
};
type SelectActionsClear = {
  type: "clear";
};

type SelectActions = SelectActionsPush | SelectActionsClear;

export type ComboboxData = {
  value: string;
  label: string;
  render?: React.ReactNode;
  icon?: LucideIcon;
};

type ComboboxOnChangeValue<B extends boolean> = B extends true
  ? string[]
  : string;

type ComboboxProps<M extends boolean = false> = {
  data:
    | ComboboxData[]
    | (() => ComboboxData[])
    | (() => Promise<ComboboxData[]>);
  placeholder: string;
  search: string;
  empty: string;
  isMulti?: M;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: ComboboxOnChangeValue<M>) => void;
  disabled?: boolean;
  name?: string;
};
export const Combobox = <M extends boolean = false>({
  data: rawData,
  empty,
  placeholder,
  search,
  isMulti,
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  ...props
}: ComboboxProps<M>) => {
  const [data, setData] = React.useState<ComboboxData[]>([]);

  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const $dataMap = React.useMemo(() => {
    return new Map<string, ComboboxData>(data.map((i) => [i.value, i]));
  }, [data]);

  const [open, setOpen] = React.useState(false);

  const onChange = (value: Set<string>) => {
    if (!onChangeProp) return;
    if (isMulti === true) {
      return onChangeProp(Array.from(value) as ComboboxOnChangeValue<M>);
    }

    const [firstValue] = value;
    return onChangeProp(firstValue as ComboboxOnChangeValue<M>);
  };

  const [selected = new Set<string>(), setSelected] = useControllableState({
    prop: valueProp && new Set(valueProp),
    defaultProp: defaultValue && new Set(defaultValue),
    onChange,
  });

  const dispatch = (action: SelectActions) => {
    switch (action.type) {
      case "single":
        return setSelected((p) =>
          p?.has(action.payload) ? new Set() : new Set(action.payload)
        );
      case "multi":
        return setSelected((p) => {
          const copy = new Set(p);
          if (copy.has(action.payload)) copy.delete(action.payload);
          else copy.add(action.payload);

          return copy;
        });
      case "clear":
        return setSelected(new Set());
      default:
        return;
    }
  };

  React.useEffect(() => {
    let active = true;
    loadData().finally(() => setIsLoadingData(false));
    return () => {
      active = false;
    };

    async function loadData() {
      if (Array.isArray(rawData)) {
        if (!active) return;
        setData(rawData);
      } else {
        setIsLoadingData(true);
        const res = await rawData();
        if (!active) return;
        setData(res);
      }
    }
  }, [rawData]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <IconButton
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="flex justify-between h-auto min-h-10 w-full"
          iconRight={{
            icon: ChevronsUpDown,
            className: "opacity-50 shrink-0",
          }}
          isLoading={isLoadingData}
          {...props}
        >
          {selected.size && $dataMap.size ? (
            <ItemRender data={$dataMap} values={selected} isMulti={isMulti} />
          ) : (
            placeholder
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="start" className="space-y-2">
        <Command
          filter={(value, search) => {
            const label = $dataMap.get(value)!.label;
            return commandScore(label, search);
          }}
        >
          <CommandInput placeholder={search} />
          <CommandList>
            <CommandEmpty>{empty}</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.value}
                  value={d.value}
                  onSelect={(v) => {
                    dispatch({
                      type: isMulti ? "multi" : "single",
                      payload: v,
                    });
                    !isMulti && setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      selected.has(d.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {d.render ?? d.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {isMulti && (
          <Button
            variant={"outline"}
            onClick={() => {
              dispatch({ type: "clear" });
              setOpen(false);
            }}
          >
            Clear
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

type ItemRenderProps = {
  data: Map<string, ComboboxData>;
  values: Set<string>;
  isMulti?: boolean;
};
const ItemRender = ({ data, values, isMulti }: ItemRenderProps) => {
  const items = Array.from(values).map((v) => data.get(v)!);

  if (isMulti) {
    return (
      <div key={"item-render"} className="flex gap-1 flex-wrap">
        {items.map((i) => (
          <Badge key={i.value} variant={"secondary"} className="capitalize">
            {i.label}
          </Badge>
        ))}
      </div>
    );
  }

  return items.at(0)?.label;
};
