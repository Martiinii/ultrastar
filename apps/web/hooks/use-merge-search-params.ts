import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useMergeSearchParams = () => {
  const searchParams = useSearchParams();

  const createQueryParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params;
    },
    [searchParams]
  );

  return { createQueryParams };
};
